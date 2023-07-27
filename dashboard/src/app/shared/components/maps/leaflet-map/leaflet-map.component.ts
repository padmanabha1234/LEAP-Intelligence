import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import * as L from "leaflet";
import * as R from "leaflet-responsive-popup";
import { StateCodes } from 'src/app/core/config/StateCodes';
import { environment } from 'src/environments/environment';
import invert from 'invert-color';
import * as latLongConfig from './../../../../../assets/data/config.json'
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { ReportDrilldownService } from 'src/app/core/services/report-drilldown/report-drilldown.service';
import { MapService } from 'src/app/core/services/map/map.service';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit, AfterViewInit, OnChanges {
  map: any;
  error = false;
  mapCenterLatlng: any;
  markers = new L.FeatureGroup();
  layerGroup = new L.LayerGroup();
  legend: any;
  countryGeoJSON: any;
  stateGeoJSON: any;
  noData = false;
  config = environment.config
  rbacDetails: any;
  hierarchyLevel: any;
  districtGeoJSON: any;

  @Input() mapData!: any;
  @Input() level: any;
  @Input() perCapitaReport: any = false;
  @Input() drillDown: boolean = false;
  @Input() drillDownLevel: any;
  // @Input() hierarchyLevel: any = this.config === 'NVSK' ? 0 : 1;

  @Output() drillDownFilter: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;

  constructor(private _rbacService: RbacService, private readonly _drillDownService: ReportDrilldownService, private readonly _mapService: MapService) {
    this.mapCenterLatlng = latLongConfig.default['IN'];
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails
      this.hierarchyLevel = rbacDetails.role
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(): void {
    this.markers.clearLayers();
    this.legend?.remove();
    // if (this.level === 'district') {
    //   // this.updateMap();
    //   this.initMap();
    // }
    // else {
    //   this.initMap();
    // }
    this.initMap();
  }

  async initMap(): Promise<any> {
    if (!this.mapContainer || !this.mapData) {
      return;
    }
    if (this.map) {
      this.map.remove();
    }
    let reportTypeBoolean = false;
    if (typeof this.mapData?.data[0]?.indicator === 'string') {
      reportTypeBoolean = true;
    }
    this.map = L.map(this.mapContainer.nativeElement, { zoomSnap: 0.05, minZoom: 4, zoomControl: true, scrollWheelZoom: false, touchZoom: false }).setView([this.mapCenterLatlng.lat, this.mapCenterLatlng.lng], this.mapCenterLatlng.zoomLevel);
    this.layerGroup.addTo(this.map);
    try {
      let lev = this.drillDownLevel ? this.drillDownLevel : this.rbacDetails.role
      if (Number(lev)<=1) {
        await this.applyCountryBorder(this.mapData);
        if (this.config !== 'NVSK') {
          this.createMarkers(this.mapData);
        }
      }

      const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd'
      });

      tiles.addTo(this.map);
      this.map.attributionControl.setPrefix(false);
      // var imageUrl ='https://i.stack.imgur.com/khgzZ.png',
      // imageBounds = [[80.0, -350.0], [-40.0, 400.0]];
      // L.imageOverlay(imageUrl, imageBounds, {opacity: 0.3}).addTo(this.map);
      if ((this.config === 'NVSK' && this.hierarchyLevel === 0 && this.level === 'district') || Number(lev) > 1 || this.hierarchyLevel > 1) {
        this.map?.removeLayer(this.layerGroup);
        await this.applyStateBorder();
        this.applyDistrictBorder();
        this.createMarkers(this.mapData);
      }
      if (this.hierarchyLevel < 2) {
        this.map.on('resize', () => {
          this.fitBoundsToCountryBorder();
        });
      }
    } catch (e) {
      console.error(e);
      this.error = true;
    }
  }

  invalidateSize(): void {
    this.map.invalidateSize();
  }

  updateMap(): void {
    if (!this.map) {
      this.initMap();
      return;
    }

    this.markers.clearLayers();
    this.legend?.remove();
    if (this.hierarchyLevel < 3) {
      this.fitBoundsToCountryBorder();
    }
    this.createMarkers(this.mapData);
  }

  getLayerColor(e: any, legend?: boolean, values?: number[]) {
    if (((this.config === 'NVSK' && this.hierarchyLevel === 0) && this.level === 'district' && !legend) || (this.hierarchyLevel > 1 || this.drillDownLevel > 1) && !legend) {
      return '#fff'
    } else {
      let value = e;
      let colors = ["#d8ead3", "#fff2cc", "#f4cccc"];
      let color = "#fff";
      value = Number(value);
      for (let i = 0; i < values.length - 1; i++) {
        if (value <= values[i] && value >= values[i + 1]) {
          color = colors[i];
        }
      }

      return color;
    }
  }

  async applyCountryBorder(mapData: any, singleColor?: any): Promise<any> {
    let reportTypeIndicator = this.mapData?.options && this.mapData.options.reportIndicatorType ? this.mapData.options.reportIndicatorType : (typeof this.mapData.data[0].indicator === 'string') ? 'boolean' : 'value';
    let parent = this;
    return new Promise(async (resolve, reject) => {
      try {
        let data;
        if (this.config === 'NVSK' && this.rbacDetails.role === 0) {
          data = await this._mapService.getCountryGeoJSON();
        }
        else {
          data = await this._mapService.getStateGeoJSON();
        }

        let min!: number, max!: number, values: any[] = [];
        
        if (reportTypeIndicator === 'value') {
          mapData.data.forEach((data: any, index: number) => {
            if (index === 0) {
              min = data.indicator;
              max = data.indicator;
              return;
            }
  
            min = min <= data.indicator ? min : data.indicator;
            max = max >= data.indicator ? max : data.indicator;
          });
  
          let parts = 3;
          max = max > 0 ? max : parts;
          let range = max - min;
  
          let partSize = (range / parts % 1 === 0) ? range / parts : Number((range / parts).toFixed(2));
          for (let i = 0; i < parts; i++) {
            if (i === 0) {
              values.push(max);
            } else {
              let value = Number((max - partSize * i).toFixed(2));
              values.push(value);
            }
          }

          values.push(0);
        } else if (reportTypeIndicator === 'percent') {
          values = [100, 70, 40, 0];
        }

        function styleStates(feature: any) {
          let color = '#fff';
          let reportTypeBoolean = false;
          if (typeof mapData?.data[0]?.indicator === 'string') {
            reportTypeBoolean = true;
          }
          // console.log("TEST", state)
          let lev = parent.drillDownLevel ? parent.drillDownLevel : parent.rbacDetails.role
          if (Number(lev) <= 1) {
            mapData?.data.forEach((state: any) => {
              if (state.state_id && state.state_id == feature.properties.state_code) {
                color = parent.getLayerColor(state.indicator, null, values);
              }
              else if (state.district_id && state.district_id == feature.properties.ID_2) {
                color = parent.getLayerColor(state.indicator, null, values);
              }
            });
          }
          
          if (parent.level === 'state' || parent.config === 'VSK' || parent.config === 'NVSK') {
            return {
              fillColor: singleColor ? (color === '#fff' ? color : singleColor) : color,
              weight: 1,
              opacity: 1,
              color: 'grey',
              dashArray: '0',
              fillOpacity: 1
            };
          }
          else {
            return
          }

        }

        function getPopUp(feature: any) {
          if(parent.hierarchyLevel > 1 || parent.drillDownLevel > 1) {
            return undefined
          }
          let popup: any;
          mapData.data.forEach((state: any) => {
            if (state.state_id == feature.properties.state_code && !state.district_id) {
              popup = state.tooltip
            }
            else if (state.district_id && state.district_id == feature.properties.ID_2) {
              popup = state.tooltip
            }
          });
          return popup;
        }

        this.countryGeoJSON = L.geoJSON(data['features'], {
          onEachFeature: function (feature: any, layer: any) {
            if (getPopUp(feature)) {
              layer.bindTooltip(getPopUp(feature), { classname: "app-leaflet-tooltip", sticky: true });
            }
            layer.on({
              click: this.config !== 'NVSK' ? () => { } : () => {
                let lev = parent.drillDownLevel ? parent.drillDownLevel : parent.rbacDetails.role
                if (Number(lev) <= 1) {
                  // parent.drillDownFilter.emit({ id: feature?.properties?.['ID_2'], level: parent.rbacDetails.role });
                  let district_name = parent.getDrillDownDetails(feature?.properties?.['ID_2'], mapData.data)
                  parent.applyDrillDown({ id: feature?.properties?.['ID_2'], hierarchyLevel: parent.rbacDetails.role + 1 , name: district_name})
                }
              }
            });
          },
          style: this.config !== 'NVSK' ? () => {} : styleStates,
          color: this.config !== 'NVSK' ? "#6e6d6d" : "#a0a1a3",
          weight: 1,
          fillOpacity: 0,
          fontWeight: "bold"
        }).addTo(this.map);
        this.layerGroup.addLayer(this.countryGeoJSON);
        if (this.hierarchyLevel < 3) {
          this.fitBoundsToCountryBorder();
        }
        // this.countryGeoJSON.eachLayer((layer: any) => {
        //   layer._path.id = StateCodes[Number(layer.feature.properties.state_code)];
        // });

        if (this.hierarchyLevel < 3 && !singleColor) {
          this.createLegend(reportTypeIndicator, this.mapData.options, values);
        }
        resolve('India map borders plotted successfully');
      } catch (e) {
        reject(e);
      }
    });
  }

  getDrillDownDetails(id: any, data: any) {
    let selectedRow = data.filter((row) => {
      return row?.['district_id'] == id
    })
    return selectedRow?.[0]?.['district_name']
  }

  applyDrillDown(details: any) {
    let drillDownDetails;
    let { hierarchyLevel, id } = details ?? {}

    switch (Number(hierarchyLevel)) {
      case 2:
        drillDownDetails = {
          ...this.rbacDetails,
          role: Number(this.rbacDetails.role) + 1,
          hierarchyLevel: hierarchyLevel,
          district: id,
          id: id,
          district_name: details?.name
        }
        break;
      case 3:
        drillDownDetails = {
          ...this.rbacDetails,
          role: Number(this.rbacDetails.role) + 1,
          hierarchyLevel: hierarchyLevel,
          block: id,
          id: id,
          block_name: details?.name
        }
        break;
      case 4:
        drillDownDetails = {
          ...this.rbacDetails,
          role: Number(this.rbacDetails.role) + 1,
          hierarchyLevel: hierarchyLevel,
          cluster: id,
          id: id,
          cluster_name: details?.name
        }
        break;
    }
    console.log(drillDownDetails)
    this._drillDownService.emit(drillDownDetails)
  }

  async applyStateBorder(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this._mapService.getCountryGeoJSON();
        const geoJSON = data.features.find(feature => {
          let state_code = feature.properties.state_code_2 || feature.properties.state_code;
          return state_code === this.rbacDetails.state;
        });
        
        this.stateGeoJSON = L.geoJSON(geoJSON, {
          // style: {
          //   fillColor: '#fff',
          //   weight: 1,
          //   opacity: 1,
          //   color: 'grey',
          //   dashArray: '0',
          //   fillOpacity: 1
          // },
          color: "#6e6d6d",
          weight: 2,
          fillOpacity: 0,
          fontWeight: "bold"
        });
        this.stateGeoJSON.addTo(this.map);
        resolve('State borders are applied successfully!');
      } catch (e) {
        reject(e);
      }
    });
  }

  applyDistrictBorder(): any {
    L.geoJSON(this.districtGeoJSON, {
      // style: {
      //   fillColor: '#fff',
      //   weight: 1,
      //   opacity: 1,
      //   color: 'grey',
      //   dashArray: '0',
      //   fillOpacity: 1
      // },
      color: "#6e6d6d",
      weight: 2,
      fillOpacity: 0,
      fontWeight: "bold"
    }).addTo(this.map);
  }

  fitBoundsToCountryBorder(): void {
    if (this.countryGeoJSON) {
      this.map.fitBounds(this.countryGeoJSON.getBounds(), {
        padding: [100, 100]
      });
    }
  }

  createMarkers(mapData: any, singleColor?: any): void {
    let reportTypeIndicator = this.mapData?.options && this.mapData.options.reportIndicatorType ? this.mapData.options.reportIndicatorType : (typeof this.mapData.data[0].indicator === 'string') ? 'boolean' : 'value'
    if (mapData && this.level !== 'state') {
      let min!: number, max!: number, values: any[] = [];
      if (reportTypeIndicator === 'value') {
        mapData.data.forEach((data: any, index: number) => {
          if (index === 0) {
            min = data.indicator;
            max = data.indicator;
            return;
          }

          min = min <= data.indicator ? min : data.indicator;
          max = max >= data.indicator ? max : data.indicator;
        });

        let parts = 3;
        max = max > 0 ? max : parts;
        let range = max - min;

        let partSize = (range / parts % 1 === 0) ? range / parts : Number((range / parts).toFixed(2));
        for (let i = 0; i < parts; i++) {
          if (i === 0) {
            values.push(max);
          } else {
            let value = Number((max - partSize * i).toFixed(2));
            values.push(value);
          }
        }

        values.push(0);
      } else if (reportTypeIndicator === 'percent') {
        values = [100, 70, 40, 0];
      }
      let level = this.drillDownLevel ? this.drillDownLevel : this.hierarchyLevel
      var idProp;
      var nameProp;
      switch (Number(level)) {
        case 1:
          nameProp = 'district_name'
          idProp = 'district_id'
          break;
        case 2:
          nameProp = 'block_name'
          idProp = 'block_id'
          break;
        case 3:
          nameProp = 'cluster_name'
          idProp = 'cluster_id'
          break;
      }
      mapData.data.forEach((data: any) => {
        let re = new RegExp("_id$");
        // let filterIds = {};
        var id;
        

        Object.keys(data).forEach((prop: any) => {
          // if(re.test(prop)){
          //   idProp = prop;
          //   return false;
          // }
          // return true;
          // if (prop.match(re)) {
          //   id = data[prop.match(re)?.input]
            // filterIds = {
            //   ...filterIds,
            //   [prop.match(re).input]: data[prop.match(re)?.input]
            // }
          // }
          id = data[idProp]
        })
        let markerIcon = L.circleMarker([data.Latitude, data.Longitude], {
          id: id,
          name: data[nameProp],
          hierarchyLevel: data.hierarchyLevel,
          color: "gray",
          // fillColor: this.getZoneColor(reportTypeIndicator, data.indicator >= 1 ? (max - min ? (data.indicator - min) / (max - min) * 100 : data.indicator) : -1),
          fillColor: singleColor ? singleColor : this.getZoneColor(reportTypeIndicator, data.indicator, values),
          fillOpacity: 1,
          strokeWeight: 0.01,
          weight: 1
        }).addTo(this.map);

        markerIcon._path.id = StateCodes[Number(data.state_code)];

        markerIcon.setRadius(5);

        const popup = R.responsivePopup({
          hasTip: false,
          autoPan: true,
          offset: [15, 20],
        }).setContent(
          data.tooltip
        );

        markerIcon.on("mouseover", (e: any) => {
          e.target.openPopup();
        });

        markerIcon.on("mouseout", (e: any) => {
          e.target.closePopup();
        });

        markerIcon.on("click", async (e: any) => {
          let lev = this.drillDownLevel ? this.drillDownLevel : this.rbacDetails.role
          if (Number(lev) <= 1) {
            let stateGeoJSON = await this._mapService.getStateGeoJSON();

            this.districtGeoJSON = stateGeoJSON.features.find(feature => {
              return feature.properties['ID_2'] == e.target.options.id;
            });
            this.applyDrillDown({ id: e.target.options.id, hierarchyLevel: this.rbacDetails.role + 1, name: e.target.options.name})
          }
          if(level < 4) {
            this.applyDrillDown({ name: e.target.options.name, id: e.target.options.id, hierarchyLevel: this.drillDownLevel ? this.drillDownLevel + 1 : this.rbacDetails.role + 1 })
          }
        })

        markerIcon.addTo(this.map).bindPopup(popup, { closeButton: false });

        this.markers.addLayer(markerIcon);
      });

      this.map.addLayer(this.markers);
      
      this.map.fitBounds(this.markers.getBounds(), {
        padding: [150, 150]
      });
      if (!singleColor) {
        this.createLegend(reportTypeIndicator, this.mapData.options, values);
      }
    }
  }

  createLegend(reportTypeIndicator: string, mapOptions: any, values: any): void {
    let legend = L.control({ position: 'topright' });
    let ref = this;
    let labels: any[] = [];

    legend.onAdd = function (map: any) {
      let div = L.DomUtil.create('div', 'info legend text-center');
      let clickable = false;
      if (mapOptions.legend && mapOptions.legend.title) {
        labels.push(`<strong>${mapOptions.selectedMetric ? mapOptions.selectedMetric : mapOptions.legend.title}:</strong>`)
      }

      if (reportTypeIndicator === 'boolean') {
        values = ["Yes", "No"];
        for (let i = 0; i < values.length; i++) {
          labels.push(`<i class="fa fa-square" style="color:${ref.getLayerColor(values[i])}"></i> ${values[i]}`);
        }
        // } else {
        //   values = values && values.length > 0 ? values : [100, 75, 50, 25, 0];
        //   for (let i = values.length; i > 1; i--) {
        //     labels.push(
        //       `<i class="fa  fa-square" style="color: ${ref.getLayerColor(25 * (i - 1), true)}"></i>
        //         <span>${values[values.length - i + 1] ? values[values.length - i + 1] : 0} &dash; ${values[values.length - i]}${reportTypeIndicator === 'percent' ? '%' : ''}</span>`
        //     );
        //   }
        // }
      } else {
        values = values && values.length > 0 && reportTypeIndicator !== 'percent' ? values : [100, 70, 40, 0];
        // div.innerHTML = labels[0] + '</br>';
        div.innerHTML = labels[0];
  
        // Create the reset button element
        const resetButton = L.DomUtil.create('button', 'legend-range-reset pull-right');
        resetButton.innerHTML = '<i class="fa fa-refresh"></i>';
        L.DomEvent.addListener(resetButton, 'click', () => {
          ref.resetRange();
        });
        div.insertBefore(resetButton, div.previousSibling);
  
        for (let i = 0; i < values.length - 1; i++) {
          let span = L.DomUtil.create('span', 'clickable-range');
          span.innerHTML = `<button class="legend-range" style="background-color: ${ref.getLayerColor(values[i], true, values)}; color: ${invert(ref.getLayerColor(values[i], true, values), true)}">${values[i + 1]} &dash; ${values[i] ? values[i] : 0}${reportTypeIndicator === 'percent' ? '%' : ''}</button><br>`;
          L.DomEvent.addListener(span, 'click', () => {
            ref.applyRange(Number(values[i] ? values[i] : 0), Number(values[i + 1]), Number(values[values.length - 1]), ref.getLayerColor(values[i], true, values));
          });
          div.appendChild(span);
          clickable = true;
        }
      }
      if (!clickable) {
        div.innerHTML = labels.join('<br>');
      }
      return div;
    };
    legend.addTo(this.map);
    this.legend?.remove();
    this.legend = legend;
  }

  getZoneColor(reportTypeIndicator: string, value: string | number, values?: number[]) {
    if (reportTypeIndicator === 'boolean') {
      if (value == "Yes") {
        return "#00FF00";
      } else {
        return "#FF0000";
      }
    } else {
      let colors = ["#d8ead3", "#fff2cc", "#f4cccc"];
      let color = "#fff";
      value = Number(value);
      for (let i = 0; i < values.length - 1; i++) {
        if (value <= values[i] && value >= values[i + 1]) {
          color = colors[i];
        }
      }

      return color;
    }
  }

  resetRange() {
    this.applyCountryBorder(this.mapData)
  }

  applyRange(max: any, min: any, baseValue: any, rangeColour: any): void {
    let temp = this.mapData.data.filter((obj: any) => {
      return obj.indicator <= max && (min === baseValue ? obj.indicator >= min : obj.indicator > min)
    });
    let filteredData = {
      ...this.mapData,
      data: temp
    };

    let lev = this.drillDownLevel ? this.drillDownLevel : this.rbacDetails.role;
    if (Number(lev) === 1) {
      this.applyCountryBorder(filteredData, rangeColour);
    }

    if (this.config !== 'NVSK') {
      this.markers.clearLayers();
      this.createMarkers(filteredData, rangeColour);
    }
  }
}
