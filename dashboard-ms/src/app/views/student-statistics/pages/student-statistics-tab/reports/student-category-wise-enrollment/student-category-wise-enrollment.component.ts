import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getBarDatasetConfig, getChartJSConfig } from 'src/app/core/config/ChartjsConfig';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { formatNumberForReport } from 'src/app/utilities/NumberFomatter';
import { buildQuery, multibarGroupBy, parseFilterToQuery, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from 'src/app/views/student-statistics/config/student_statistics_config';

@Component({
  selector: 'app-student-category-wise-enrollment',
  templateUrl: './student-category-wise-enrollment.component.html',
  styleUrls: ['./student-category-wise-enrollment.component.scss']
})
export class StudentCategoryWiseEnrollmentComponent implements OnInit {

  title: any;
  chartHeight: any;
  marginTop: any;
  config;
  data;
  fileName: string = "Student Category Wise Enrollment";
  reportName: string = 'student_category_wise_enrollment';
  filters: any = [];
  levels: any;
  tableReportData: any;
  startDate: any;
  endDate: any;
  selectedYear: any;
  filterIndex: any;
  currentHierarchyLevel: any = 1;
  rbacDetails: any;
  pageSize: any;

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

    let { timeSeriesQueries, queries, levels, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;

    if (this.rbacDetails?.role) {
      filters.every((filter: any) => {
        if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
          queries = {...filter?.actions?.queries}
          Object.keys(queries).forEach((key) => {
            queries[key] = this.parseRbacFilter(queries[key])
          });
          return false
        }
        return true
      })
    }

    Object.keys(queries).forEach((key: any) => {
      if (this.startDate !== undefined && this.endDate !== undefined && Object.keys(timeSeriesQueries).length > 0) {
        onLoadQuery = parseTimeSeriesQuery(timeSeriesQueries[key], this.startDate, this.endDate)
      }
      else {
        onLoadQuery = queries[key]
      }
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
    let { barChart: { yAxis, xAxis, isMultibar, metricLabelProp, metricValueProp } } = options;
    this._commonService.getReportDataNew(query).subscribe((res: any) => {
      let rows = res;
      let minYear, maxYear;
      rows.forEach(row => {
        if (minYear !== undefined && maxYear !== undefined) {
          if (row['min_year'] < minYear) {
            minYear = row['min_year']
          }
          if (row['max_year'] > maxYear) {
            maxYear = row['max_year']
          }
        }
        else {
          minYear = row['min_year']
          maxYear = row['max_year']
        }
      });
      if (isMultibar) {
        rows = multibarGroupBy(rows, xAxis.label, metricLabelProp, metricValueProp);
      }
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
        minYear: minYear,
        maxYear: maxYear
      })
    });
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
