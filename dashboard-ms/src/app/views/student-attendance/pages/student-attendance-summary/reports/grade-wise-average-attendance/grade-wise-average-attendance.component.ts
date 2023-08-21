import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { WrapperService } from 'src/app/core/services/wrapper.service';
import { buildQuery, parseRbacFilter, parseTimeSeriesQuery } from 'src/app/utilities/QueryBuilder';
import { config } from 'src/app/views/student-attendance/config/student_attendance_config';
import { StudentAttendanceSummaryComponent } from '../../student-attendance-summary.component';

@Component({
  selector: 'app-grade-wise-average-attendance',
  templateUrl: './grade-wise-average-attendance.component.html',
  styleUrls: ['./grade-wise-average-attendance.component.scss']
})
export class GradeWiseAverageAttendanceComponent implements OnInit {

  title: any;
  chartHeight: any;
  marginTop: any;
  config;
  data;
  fileName: string = "Grade-wise % Students Present";
  reportName: string = 'sas_grade_wise_average_attendance';
  filters: any = [];
  levels: any;
  reportData: any;
  minDate: any;
  maxDate: any;
  filterIndex: any;
  currentHierarchyLevel: any = 1;
  rbacDetails: any;

  @Output() exportDates = new EventEmitter<any>();
  @Input() startDate: any;
  @Input() endDate: any;

  constructor(private readonly _dataService: DataService, private readonly _wrapperService: WrapperService,
    private csv: StudentAttendanceSummaryComponent,
    private _rbacService: RbacService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }

  ngOnInit(): void {
    // this.getReportData();
  }

  async getReportData(startDate = undefined, endDate = undefined): Promise<void> {
    this.startDate = startDate;
    this.endDate = endDate;
    let reportConfig = config

    let { queries, defaultLevel, filters, options } = reportConfig[this.reportName];
    let onLoadQuery;

    if (this.rbacDetails?.role) {
      filters.every((filter: any) => {
        if (Number(this.rbacDetails?.role) === Number(filter.hierarchyLevel)) {
          queries = { ...filter?.actions?.queries }
          Object.keys(queries).forEach((key) => {
            queries[key] = parseRbacFilter(queries[key], this.rbacDetails)
          });
          return false
        }
        return true
      })
    }

    Object.keys(queries).forEach(async (key: any) => {
      if (Object.keys(queries).length > 0) {
        onLoadQuery = parseTimeSeriesQuery(queries[key], this.startDate, this.endDate)
      }
      let query = buildQuery(onLoadQuery, defaultLevel, this.levels, this.filters, this.startDate, this.endDate, key);

      if (query && key === 'barChart') {
        let {reportData, config} = await this._dataService.getBarChartReportData(query, options, filters, defaultLevel);
        this.reportData = reportData
        this.config = config;
        if (this.reportData?.values?.length > 0) {
          let reportsData = { reportData: this.reportData.values, reportType: 'dashletBar', reportName: this.fileName }
          this.csv.csvDownload(reportsData)
        }
      }


    })
  }
}
