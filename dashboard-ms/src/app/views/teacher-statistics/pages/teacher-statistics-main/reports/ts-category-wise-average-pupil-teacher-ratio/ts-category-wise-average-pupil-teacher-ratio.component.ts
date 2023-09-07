import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getBarDatasetConfig, getChartJSConfig } from 'src/app/core/config/ChartjsConfig';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { formatNumberForReport } from 'src/app/utilities/NumberFomatter';
import { buildQuery, multibarGroupBy, parseFilterToQuery, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from 'src/app/views/teacher-statistics/config/teacher_statistics_config';

@Component({
  selector: 'app-ts-category-wise-average-pupil-teacher-ratio',
  templateUrl: './ts-category-wise-average-pupil-teacher-ratio.component.html',
  styleUrls: ['./ts-category-wise-average-pupil-teacher-ratio.component.scss']
})
export class TsCategoryWiseAveragePupilTeacherRatioComponent implements OnInit  {

  title: any;
  chartHeight: any;
  marginTop: any;
  config;
  data;
  fileName: string = "Category Wise Average Pupil Teacher Ratio";
  reportName: string = 'ts_stat_category_wise_average_pupil_total_teachers_ratio';
  filters: any = [];
  levels: any;
  tableReportData: any;
  startDate: any;
  endDate: any;
  minYear: any;
  maxYear: any;
  selectedYear: any;
  filterIndex: any;
  currentHierarchyLevel: any = 1;
  rbacDetails: any;

  @Output() exportMinmaxYear = new EventEmitter<any>();

  constructor(private readonly _commonService: CommonService, private readonly _wrapperService: WrapperService, private _rbacService: RbacService) { 
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }

  ngOnInit(): void {
    this.getReportData();
  }

  async getReportData(value?: string): Promise<void> {
    this.selectedYear = value
    let reportConfig = config

    let {  queries, levels, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;

    if (this.rbacDetails?.role) {
      filters.every((filter: any) => {
        if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
          queries = filter?.actions?.queries
          
          Object.keys(queries).forEach((key) => {
            queries[key] = this.parseRbacFilter(queries[key])
          });
          return false
        }
        return true
      })
    }
    else {
      this._wrapperService.constructFilters(this.filters, filters);
    }

    Object.keys(queries).forEach((key: any) => {
      onLoadQuery = queries[key]
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key);

      if (this.selectedYear !== undefined) {
        let params = { columnName: "academic_year", value: this.selectedYear };
        query = parseFilterToQuery(query, params)
      }

      if (query && key === 'barChart') {
        this.getBarChartReportData(query, options, filters, defaultLevel);
      }


    })
  }

  getBarChartReportData(query, options, filters, defaultLevel): void {
    this._commonService.getReportDataNew(query).subscribe((res: any) => {
      let rows = res;
      rows.forEach(row => {
        if (this.minYear !== undefined && this.maxYear !== undefined) {
          if (row['min_year'] < this.minYear) {
            this.minYear = row['min_year']
          }
          if (row['max_year'] > this.maxYear) {
            this.maxYear = row['max_year']
          }
        }
        else {
          this.minYear = row['min_year']
          this.maxYear = row['max_year']
        }
      }); 
      let { barChart: { yAxis, xAxis, isMultibar, metricLabelProp, metricValueProp } } = options;
      
      if(isMultibar){
        console.log('');
        rows = multibarGroupBy(rows, xAxis.label, metricLabelProp, metricValueProp);
      }
      console.log('the is multibar',rows);
      this.tableReportData = {
        values: rows
      }
      this.config = getChartJSConfig({
        labelExpr: xAxis.value,
        datasets: getBarDatasetConfig(xAxis?.metrics?.map((metric: any) => {
          return {
            dataExpr: metric.value, label: metric.label
          }
        })),
        options: {
          height: (rows.length * 15 + 150).toString(),
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                let multistringText = [];
                if (tooltipItem.datasetIndex === 0) {
                  xAxis.metrics.forEach((metric: any) => {
                    multistringText.push(`${metric.label}: ${formatNumberForReport(rows[tooltipItem.index][metric.value])}`);
                  });
                }

                return multistringText;
              }
            }
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: yAxis.title !== 'level' ? yAxis.title : this.getYaxisTitle(filters) ? this.getYaxisTitle(filters) : defaultLevel
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: xAxis.title
              },
              ticks: {
                callback: function(value, index, values) {
                  if (values.length > 4 && value.length > 8) {
                    return value.substr(0, 8) + '...';
                  } else {
                    return value;
                  }
                }
              }
            }]
          }
        }
      });
      this.exportMinmaxYear.emit({
        minYear: this.minYear,
        maxYear: this.maxYear
      })
    });
  }

  async filtersUpdated(filters: any): Promise<void> {
    await new Promise(r => setTimeout(r, 100));
    this.filters = [...filters]
    let tempLevel = 1;
    filters.forEach((filter: any) => {
      tempLevel = Number(filter.hierarchyLevel) + 1 > Number(tempLevel) ? Number(filter.hierarchyLevel) + 1 : Number(tempLevel);
    })
    this.currentHierarchyLevel = tempLevel;
    this.getReportData();
  }

  parseRbacFilter(query: string) {
    let newQuery = query;
    let startIndex = newQuery?.indexOf('{');
    let endIndex = newQuery?.indexOf('}');

    if (newQuery && startIndex > -1) {
      let propertyName = query.substring(startIndex + 1, endIndex);
      let re = new RegExp(`{${propertyName}}`, "g");
      Object.keys(this.rbacDetails).forEach((key: any) => {
        if (propertyName === key + '_id') {
          newQuery = newQuery.replace(re, '\'' + this.rbacDetails[key] + '\'');
        }
      });
    }
    return newQuery
  }

  getYaxisTitle(filters: any): string {
    let title: string;
    filters.forEach((filter: any) => {
      if (Number(filter.hierarchyLevel) === this.currentHierarchyLevel - 1) {
        title = filter?.actions?.level;
      }
    });
    return title;
  }
}

