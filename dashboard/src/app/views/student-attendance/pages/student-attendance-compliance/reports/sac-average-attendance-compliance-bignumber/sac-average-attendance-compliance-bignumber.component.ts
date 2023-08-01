import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from 'src/app/views/student-attendance/config/student_attendance_config';

@Component({
  selector: 'app-sac-average-attendance-compliance-bignumber',
  templateUrl: './sac-average-attendance-compliance-bignumber.component.html',
  styleUrls: ['./sac-average-attendance-compliance-bignumber.component.scss']
})
export class SacAverageAttendanceComplianceBignumberComponent implements OnInit {

  reportName: string = 'sac_average_attendance_compliance_bignumber';
  filters: any = [];
  levels: any;
  tableReportData: any;
  
  bigNumberReportData: any =  {
    reportName: "Average % Schools Reporting Student Attendance"
  };

  minDate: any;
  maxDate: any;
  compareDateRange: any = 30;
  filterIndex: any;
  rbacDetails: any;
  title = 'Attendance Summary %';
  @Input() startDate: any;
  @Input() endDate: any;

  constructor(private readonly _commonService: CommonService,
     private readonly _wrapperService: WrapperService, private _rbacService: RbacService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }

  ngOnInit(): void {
    // this.getReportData();
    if(Number(this.rbacDetails?.role > 4)){
      this.title = 'Average % Students Reported'
    }
  }

  getReportData(startDate = undefined, endDate = undefined): void {
    this.startDate = startDate;
    this.endDate = endDate;
    let reportConfig = config

    let { timeSeriesQueries, queries, levels, label, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;
    if (this.rbacDetails?.role) {
      filters.every((filter: any) => {
        if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
          timeSeriesQueries = { ...filter?.timeSeriesQueries }
          Object.keys(timeSeriesQueries).forEach((key) => {
            timeSeriesQueries[key] = this.parseRbacFilter(timeSeriesQueries[key])
          });
          return false
        }
        return true
      })
    }

    Object.keys(timeSeriesQueries).forEach((key: any) => {
      if (key.toLowerCase().includes('comparison')) {
        let endDate = new Date();
        let days = endDate.getDate() - this.compareDateRange;
        let startDate = new Date();
        startDate.setDate(days)
        onLoadQuery = parseTimeSeriesQuery(timeSeriesQueries[key], startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
      }
      else if (this.startDate !== undefined && this.endDate !== undefined && Object.keys(timeSeriesQueries).length > 0) {
        onLoadQuery = parseTimeSeriesQuery(timeSeriesQueries[key], this.startDate, this.endDate)
      }
      else {
        onLoadQuery = queries[key]
      }
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key, this.compareDateRange);

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

    while (startIndex > -1 && endIndex > -1) {
      if (newQuery && startIndex > -1) {
        let propertyName = newQuery.substring(startIndex + 1, endIndex);
        let re = new RegExp(`{${propertyName}}`, "g");
        console.log(this.rbacDetails)
        Object.keys(this.rbacDetails).forEach((key: any) => {
          if (propertyName === key + '_id') {
            newQuery = newQuery.replace(re, '\'' + this.rbacDetails[key] + '\'');
          }
        });
      }
      startIndex = newQuery?.indexOf('{');
      endIndex = newQuery?.indexOf('}');
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
          this.bigNumberReportData = {
            ...this.bigNumberReportData,
            averagePercentage: rows[0]?.[property]
          }
        }
      })
    }
    else if (indicator === 'differencePercentage') {
      await this._commonService.getReportDataNew(query).subscribe((res: any) => {
        if (res) {
          let rows = res;
          this.bigNumberReportData = {
            ...this.bigNumberReportData,
            differencePercentage: rows[0]?.[property]
          }
        }
      })
    }
  }

}
