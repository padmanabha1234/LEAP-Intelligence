import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseRbacFilter, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from 'src/app/views/teacher-attendance/config/teacher_attendance_config';
import { TeacherAttendanceSummaryComponent } from '../../teacher-attendance-summary.component';
import { ReportDrilldownService } from 'src/app/core/services/report-drilldown/report-drilldown.service';
import { CriteriaService } from 'src/app/core/services/criteria.service';
import { DataService } from 'src/app/core/services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-average-attendance-school-table',
  templateUrl: './average-attendance-school-table.component.html',
  styleUrls: ['./average-attendance-school-table.component.scss']
})
export class AverageAttendanceSchoolTableComponent implements OnInit, OnDestroy {
  reportName: string = 'average_attendance_school';
  filters: any = [];
  levels: any;
  tableReportData: any;
  bigNumberReportData: any = {
    reportName: "School Wise Average Teachers Present"
  };
  minDate: any;
  maxDate: any;
  compareDateRange: any = 30;
  // level = environment.config === 'NVSK' ? 'VSK' : 'district';
  filterIndex: any;
  rbacDetails: any;
  title = ' School Wise % Teachers Present';
  backUpData: any = [];
  criteriaApplied: boolean = false;
  searchText: any;
  searchFilterConfig: any;
  previousText: any;
  drillDownLevel: any;
  drillDownDetails: any;
  drillDownSubscription: any;
  hierarchy: any;
  @Output() bigNumberReport = new EventEmitter<any>();
  @Output() exportDates = new EventEmitter<any>();
  @Input() startDate: any;
  @Input() endDate: any;

  constructor(private spinner: NgxSpinnerService, private readonly _commonService: CommonService, private csv: TeacherAttendanceSummaryComponent, private readonly _wrapperService: WrapperService, private _rbacService: RbacService, private readonly _reportDrilldownService: ReportDrilldownService, private readonly _criteriaService: CriteriaService, private readonly _dataService: DataService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
      this.drillDownLevel = rbacDetails.role
    });

  }

  ngOnInit(): void {
    let { options: { searchBar_config } } = config[this.reportName];
    this.searchFilterConfig = {
      ...searchBar_config
    }
    this.drillDownSubscription = this._reportDrilldownService.drilldownData.subscribe(async (data) => {
      if (data && data.linkedReports?.includes(this.reportName) && data.hierarchyLevel) {
        this.drillDownLevel = data.hierarchyLevel
        this._criteriaService.emit('reset')
        this.criteriaApplied = false;
        // this.drilldownData(data);
        let result: any = await this._reportDrilldownService.drilldown(data, this.rbacDetails, config[this.reportName], this.startDate, this.endDate, this.drillDownDetails)
        this.drillDownDetails = result?.drillDownDetails
        this.tableReportData = result?.reportData
        if (this.tableReportData?.data?.length > 0) {
          let reportsData = { reportData: this.tableReportData.data, reportType: 'table', reportName: this.title }
          this.csv.schoolCsvDownload(reportsData, this.drillDownLevel)
        }
      }
    })
    this._criteriaService.criteriaObject.subscribe(async (data) => {
      if (data && data?.linkedReports?.includes(this.reportName)) {
        //  await this.applyCriteria(data)
        if (!this.criteriaApplied) {
          this.backUpData = this.tableReportData?.data
        }
        this.criteriaApplied = true
        this.tableReportData = this._criteriaService.applyCriteria(data, this.backUpData, this.tableReportData)
        let reportsData = { reportData: this.tableReportData.data, reportType: 'table', reportName: this.title }
        this.csv.schoolCsvDownload(reportsData, this.hierarchy)
      }
    })
    // this.getReportData();
  }

  searchTextUpdate(text: any) {
    this.searchFilterConfig = {
      ...this.searchFilterConfig,
      searchText: text
    }
    // this.searchText = text
  }

  async getReportData(startDate = undefined, endDate = undefined): Promise<void> {
    this.startDate = startDate;
    this.endDate = endDate;
    this._criteriaService.emit('reset')
    this.criteriaApplied = false;
    if (this.drillDownDetails !== undefined) {
      let result: any = await this._reportDrilldownService.drilldown({ hierarchyLevel: this.drillDownLevel }, this.rbacDetails, config[this.reportName], this.startDate, this.endDate, this.drillDownDetails)
      this.drillDownDetails = result?.drillDownDetails
      this.tableReportData = result?.reportData
      if (this.tableReportData?.data?.length > 0) {
        let reportsData = { reportData: this.tableReportData.data, reportType: 'table', reportName: this.title }
        this.csv.schoolCsvDownload(reportsData, this.drillDownLevel)
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

      Object.keys(queries).forEach(async (key: any) => {
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
          await this.getTableReportData(query, options, this.drillDownLevel);
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

  async getTableReportData(query, options, hierarchyLevel?) {
    this.hierarchy = hierarchyLevel;
    this.spinner.show();

    try {
      await this._commonService.getReportDataNew(query).subscribe((res: any) => {
        // this.spinner.show();
        if (this.drillDownLevel === hierarchyLevel) {
          let rows = res;
          let { table: { columns } } = options;
          this.tableReportData = {
            data: rows.map(row => {
              if (this.minDate !== undefined && this.maxDate !== undefined) {
                if (row['min_date'] < this.minDate) {
                  this.minDate = row['min_date']
                }
                if (row['max_date'] > this.maxDate) {
                  this.maxDate = row['max_date']
                }
              }
              else {
                this.minDate = row['min_date']
                this.maxDate = row['max_date']
              }
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
            this.csv.schoolCsvDownload(reportsData, hierarchyLevel)
          }

        }
      });
    }
    catch (error) {
      console.log(error)
    }
    finally {
      this.spinner.hide();
    }

  }

  ngOnDestroy(): void {
    this.drillDownSubscription.unsubscribe();
  }
}