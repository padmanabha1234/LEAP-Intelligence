import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseFilterToQuery, parseQueryParam, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from 'src/app/views/student-statistics/config/student_statistics_config';

@Component({
  selector: 'app-total-students-enrolled',
  templateUrl: './total-students-enrolled.component.html',
  styleUrls: ['./total-students-enrolled.component.scss']
})
export class TotalStudentsEnrolledComponent implements OnInit {
  reportName: string = 'total_students_enrolled';
  filters: any = [];
  levels: any;
  tableReportData: any;
  bigNumberReportData: any = {
    reportName: "Total Students Enrolled"
  };
  minDate: any;
  maxDate: any;
  selectedYear: any
  startDate: any;
  endDate: any
  compareDateRange: any = 30;
  // level = environment.config === 'NVSK' ? 'VSK' : 'district';
  filterIndex: any;
  rbacDetails: any;

  @Output() bigNumberReport = new EventEmitter<any>();
  @Output() exportMinmaxYear = new EventEmitter<any>();

  constructor(private readonly _commonService: CommonService, private readonly _wrapperService: WrapperService, private _rbacService: RbacService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }

  ngOnInit(): void {
    this.getReportData();
  }

  getReportData(value?: string): void {
    this.selectedYear = value;
    let reportConfig = config

    let { queries, defaultLevel, filters, options } = reportConfig[this.reportName];
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
      if (key.toLowerCase().includes('comparison')) {
        let currentYear = new Date().getFullYear()
        let lastYear = currentYear -1;
        onLoadQuery = parseQueryParam(queries[key], {'lastYear': lastYear})
      }
      else {
        onLoadQuery = queries[key]
      }
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key, this.compareDateRange);

      if (this.selectedYear !== undefined) {
        let params = { columnName: "academic_year", value: this.selectedYear };
        query = parseFilterToQuery(query, params)
      }

      if (query && key === 'bigNumber') {
        this.getBigNumberReportData(query, options, 'averagePercentage');
      }
      else if (query && key === 'bigNumberComparison') {
        this.getBigNumberReportData(query, options, 'differencePercentage')
      }
    })
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

  async getBigNumberReportData(query: string, options: any, indicator: string): Promise<void> {
    let { bigNumber } = options ?? {};
    let { valueSuffix, property } = bigNumber ?? {};
    if (indicator === 'averagePercentage') {
      this.bigNumberReportData = {
        ...this.bigNumberReportData,
        valueSuffix: valueSuffix
      }
      await this._commonService.getReportDataNew(query).subscribe((res: any) => {
        if (res) {
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
          this.bigNumberReportData = {
            ...this.bigNumberReportData,
            averagePercentage: rows[0]?.[property]
          }
          this.bigNumberReport.emit({
            data: this.bigNumberReportData,
            reportName:this.reportName
          })
          this.exportMinmaxYear.emit({
            minYear: minYear,
            maxYear: maxYear
          })
        }
      })
    }
    else if (indicator === 'differencePercentage') {
      await this._commonService.getReportDataNew(query).subscribe((res: any) => {
        if (res) {
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
          this.bigNumberReportData = {
            ...this.bigNumberReportData,
            differencePercentage: rows[0]?.[property]
          }
          this.bigNumberReport.emit({
            data: this.bigNumberReportData,
            reportName:this.reportName
          })
          this.exportMinmaxYear.emit({
            minYear: minYear,
            maxYear: maxYear
          })
        }
      })
    }
  }
}
