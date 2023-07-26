import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
// for apex radialbar chart
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit, OnChanges {
  @ViewChild('apexChart') apexChart: ChartComponent;
  public chartOptions: Partial<ChartOptions>; // for apex
  @Input() gaugeData!: any;
  @Input() Height : number;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.gaugeData){
      this.apexCreateChart();
    }
  }

  apexCreateChart() {
    const percentage = this.gaugeData.percentage;
  
    let color;
    if (percentage >= 0 && percentage <= 50) {
      color = '#FE0000';
    } else if (percentage > 50 && percentage <= 80) {
      color = '#F7C100';
    } else if (percentage > 80) {
      color = '#79B455';
    } 
  
    this.chartOptions = {
      series: [percentage],
      chart: {
        type: "radialBar",
        height: this.Height
      },
      fill: {
        type: "solid",
        colors: [color],
      //   type: "gradient",
      //  colors:color,
      },
      plotOptions: {
        radialBar: {
          startAngle: -100,
          endAngle: 100,
          hollow: {
            size: "70%", // Adjust the size to increase or decrease the circular boundary
            margin: 5
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              color: "#111",
              fontSize: "1.2rem",
              show: true
            }
          }
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Progress"]
    };
  }
  
  

  
  

}
