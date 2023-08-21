import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseRbacFilter, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from 'src/app/views/teacher-attendance/config/teacher_attendance_config';
import { TeacherAttendanceSummaryComponent } from '../../teacher-attendance-summary.component';
import { ReportDrilldownService } from 'src/app/core/services/report-drilldown/report-drilldown.service';
import { CriteriaService } from 'src/app/core/services/criteria.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tas-average-attendance',
  templateUrl: './tas-average-attendance.component.html',
  styleUrls: ['./tas-average-attendance.component.scss']
})
export class TasAverageAttendanceComponent implements OnInit, OnDestroy {
  reportName: string = 'tas_average_attendance';
  filters: any = [];
  levels: any;
  tableReportData: any;
  backUpData: any = [];
  criteriaApplied: boolean = false;
  bigNumberReportData: any = {
    reportName: "Average Teachers Present"
  };
  minDate: any;
  maxDate: any;
  compareDateRange: any = 30;
  // level = environment.config === 'NVSK' ? 'VSK' : 'district';
  filterIndex: any;
  rbacDetails: any;
  title = '% Teachers Present';
  drillDownDetails: any;
  drillDownLevel: any;
  drillDownSubscription: any;

  @Output() bigNumberReport = new EventEmitter<any>();
  @Output() exportDates = new EventEmitter<any>();
  @Input() startDate: any;
  @Input() endDate: any;

  constructor(
    private readonly _commonService: CommonService,
    private csv: TeacherAttendanceSummaryComponent,
    private readonly _wrapperService: WrapperService,
    private _rbacService: RbacService,
    private readonly _reportDrilldownService: ReportDrilldownService,
    private readonly _criteriaService: CriteriaService,
    private spinner: NgxSpinnerService
  ) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    });


  }

  ngOnInit(): void {
    this.drillDownSubscription = this._reportDrilldownService.drilldownData.subscribe(async (data) => {
      if (data && data.hierarchyLevel) {
        this.drillDownLevel = data.hierarchyLevel
        // this.drilldownData(data);
        this._criteriaService.emit('reset')
        this.criteriaApplied = false;
        let result: any = await this._reportDrilldownService.drilldown(data, this.rbacDetails, config[this.reportName], this.startDate, this.endDate, this.drillDownDetails)
        this.drillDownDetails = result?.drillDownDetails
        this.tableReportData = result?.reportData
        if (this.tableReportData?.data?.length > 0) {
          let reportsData = { reportData: this.tableReportData.data, reportType: 'table', reportName: this.title }
          this.csv.csvDownload(reportsData)
        }
      }
    })

    this._criteriaService.criteriaObject.subscribe(async (data) => {
      if (data && data?.linkedReports?.includes(this.reportName)) {
        if (!this.criteriaApplied) {
          this.backUpData = this.tableReportData?.data
        }
        this.criteriaApplied = true
        this.tableReportData = this._criteriaService.applyCriteria(data, this.backUpData, this.tableReportData)
        // await this.applyCriteria(data);
        // let reportsData = { reportData: this.tableReportData.data, reportType: 'table', reportName: this.title }
        // this.csv.csvDownload(reportsData)
      }
    })
    // this.getReportData();
  }

  async getReportData(startDate = undefined, endDate = undefined): Promise<void> {
    this.startDate = startDate;
    this.endDate = endDate;
    this._criteriaService.emit('reset')
    this.criteriaApplied = false
    if (this.drillDownDetails !== undefined) {
      let result: any = await this._reportDrilldownService.drilldown({ hierarchyLevel: this.drillDownLevel }, this.rbacDetails, config[this.reportName], this.startDate, this.endDate, this.drillDownDetails)
      this.drillDownDetails = result?.drillDownDetails
      this.tableReportData = result?.reportData
      if (this.tableReportData?.data?.length > 0) {
        let reportsData = { reportData: this.tableReportData.data, reportType: 'table', reportName: this.title }
        this.csv.csvDownload(reportsData)
      }
    }
    else {
      let reportConfig = config;

      let { timeSeriesQueries, queries, levels, label, defaultLevel, filters, options } = reportConfig[this.reportName];
      let onLoadQuery;
      if (this.rbacDetails?.role) {
        filters.every((filter: any) => {
          if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
            queries = { ...filter?.actions?.queries }
            timeSeriesQueries = { ...filter?.timeSeriesQueries }
            Object.keys(queries).forEach((key) => {
              queries[key] = this.parseRbacFilter(queries[key])
              timeSeriesQueries[key] = this.parseRbacFilter(timeSeriesQueries[key])
            });
            return false
          }
          return true
        })
      } else {
        this._wrapperService.constructFilters(this.filters, filters);
      }

      Object.keys(queries).forEach((key: any) => {
        if (key.toLowerCase().includes('comparison')) {
          let endDate = new Date();
          let days = endDate.getDate() - this.compareDateRange;
          let startDate = new Date();
          startDate.setDate(days)
          onLoadQuery = parseTimeSeriesQuery(queries[key], startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
        }
        else if (this.startDate !== undefined && this.endDate !== undefined && Object.keys(timeSeriesQueries).length > 0) {
          onLoadQuery = parseTimeSeriesQuery(timeSeriesQueries[key], this.startDate, this.endDate)
        }
        else {
          onLoadQuery = queries[key]
        }
        let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key, this.compareDateRange);

        if (query && key === 'table') {
          this.getTableReportData(query, options);
        }
      })
    }
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

  getTableReportData(query, options): void {
    this._commonService.getReportDataNew(query).subscribe((res: any) => {
      let rows = res;
      let { table: { columns } } = options;
      this.tableReportData = {
        data: rows.map(row => {
          columns.forEach((col: any) => {
            if (row[col.property]) {
              row = {
                ...row,
                [col.property]: { value: col.type === 'number' ? Number(row[col.property]) : row[col.property] }
              }
            }
          });
          return row
        }),
        columns: columns.filter(col => {
          if (rows[0] && col.property in rows[0]) {
            return col;
          }
        })
      };
      if (this.tableReportData?.data?.length > 0) {
        let reportsData = { reportData: this.tableReportData.data, reportType: 'table', reportName: this.title }
        this.csv.csvDownload(reportsData)
      }
    });
  }

  ngOnDestroy(): void {
    this.drillDownSubscription.unsubscribe()
  }
}
