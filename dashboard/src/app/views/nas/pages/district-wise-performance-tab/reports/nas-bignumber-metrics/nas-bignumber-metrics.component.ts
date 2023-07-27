import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseFilterToQuery, parseRbacFilter, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from 'src/app/views/nas/config/nas_config';
@Component({
  selector: 'app-nas-bignumber-metrics',
  templateUrl: './nas-bignumber-metrics.component.html',
  styleUrls: ['./nas-bignumber-metrics.component.scss']
})
export class NasBignumberMetricsComponent implements OnInit {
  reportName: string = 'nas_metrics';
  filters: any = [];
  levels: any;
  reportData: any = [];
  title: string = '-------to be filled-------'
  selectedYear: any;
  selectedMonth: any;
  startDate: any;
  endDate: any;
  config: any;
  compareDateRange: any = 30;
  filterIndex: any;
  rbacDetails: any;

  @Output() exportReportData = new EventEmitter<any>();

  constructor(private readonly _dataService: DataService, private readonly _wrapperService: WrapperService, private _rbacService: RbacService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }

  ngOnInit(): void {
    // this.getReportData({ filterValues: [] });
  }

  getReportData(values?: any): void {
    let { filterValues, timeSeriesValues } = values ?? {};


    console.log(filterValues);

    this.startDate = timeSeriesValues?.startDate;
    this.endDate = timeSeriesValues?.endDate;
    let reportConfig = config

    let { timeSeriesQueries, queries, levels, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;
    let currentLevel;

    if (this.rbacDetails?.role) {
      filters.every((filter: any) => {
        if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
          queries = { ...filter?.actions?.queries }
          currentLevel = filter?.actions?.level;
          Object.keys(queries).forEach((key) => {
            queries[key] = parseRbacFilter(queries[key], this.rbacDetails)
          });
          return false
        }
        return true
      })
    }
    Object.keys(queries).forEach(async (key: any, index: any) => {
      if (key.toLowerCase().includes('comparison')) {
        let endDate = new Date();
        let days = endDate.getDate() - this.compareDateRange;
        let startDate = new Date();
        startDate.setDate(days)
        onLoadQuery = parseTimeSeriesQuery(queries[key], startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
      }
      else {
        onLoadQuery = queries[key]
      }
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key, this.compareDateRange);

      // filterValues.map((a) => {
      //   console.log(a);

      //   let allObj = {
      //     "value": "all",
      //     "label": "All"
      //   }
      //   var index = a.options.findIndex(x => x.value == "all");
      //   if (index === -1) {
      //     a.options.push(allObj)
      //     a.options.map((item, i) => {
      //       if (item.value === "all") {
      //         a.options.splice(i, 1);
      //         a.options.unshift(item);
      //       }
      //     })
      //     a.value = "all"
      //   }
      // })



      // let metricFilter = [...filterValues].filter((filter: any) => {
      //   return filter?.filterType === 'metric'
      // })

      // filterValues = [...filterValues].filter((filter: any) => {
      //   return filter?.filterType !== 'metric'
      // })

      // filterValues.forEach((filterParams: any) => {
      //   if (filterParams.value !== 'all') {
      //     // Check if the subquery is already present in the query
      //     if (key == 'bigNumber1') {
      //       query = `select sum(a.count) as total_schools from datasets.nas_performance_umy3wxzhjm8aqh4udaka as a join datasets.nas_no_of_schools_state as t on a.state_id = t.state_id `;
      //     } else if (key == 'bigNumber2') {
      //       query = `select sum(a.count) as students_surveyed from datasets.nas_performance_umy3wxzhjm8aqh4udaka as a join datasets.nas_students_surveyed_state as t on a.state_id = t.state_id `;
      //     } else if (key == 'bigNumber3') {
      //       query = `select sum(a.count) as total_teachers from datasets.nas_performance_umy3wxzhjm8aqh4udaka as a join datasets.nas_no_of_teachers_state as t on a.state_id = t.state_id `;
      //     }
      //       query = parseFilterToQuery(query, filterParams);
      //   }
      // });


      if (query && key.indexOf('bigNumber') > -1) {
        let metricOptions = {
          bigNumber: {
            title: Array.isArray(options?.bigNumber?.title) ? options?.bigNumber?.title?.[index] : options?.bigNumber?.title,
            property: Array.isArray(options?.bigNumber?.property) ? options?.bigNumber?.property?.[index] : options?.bigNumber?.property,
            valueSuffix: Array.isArray(options?.bigNumber?.valueSuffix) ? options?.bigNumber?.valueSuffix?.[index] : options?.bigNumber?.valueSuffix
          }
        }
        let metricData = await this._dataService.getBigNumberReportData(query, metricOptions, 'averagePercentage', this.reportData);
        metricData = {
          ...metricData,
        }
        this.exportReportData.emit({ data: metricData, ind: index })
        // this.reportData[index] = metricData
      }
    })
  }
}