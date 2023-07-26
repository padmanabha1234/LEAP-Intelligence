import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TacAverageAttendanceRankComponent } from './reports/tac-average-attendance-rank/tac-average-attendance-rank.component';
import { TasAverageAttendanceComponent } from './reports/tas-average-attendance/tas-average-attendance.component';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { TasAverageAttendanceBignumberComponent } from './reports/tas-average-attendance-bignumber/tas-average-attendance-bignumber.component';
import { config } from '../../config/teacher_attendance_config'
import { TeacherAttendanceMapComponent } from './reports/teacher-attendance-map/teacher-attendance-map.component';
import { CommonService } from 'src/app/core/services/common/common.service';
import { TasAverageAttendanceBarchartComponent } from './reports/tas-average-attendance-barchart/tas-average-attendance-barchart.component';
import { ReportDrilldownService } from 'src/app/core/services/report-drilldown/report-drilldown.service';
import moment from 'moment';
import { AverageAttendanceSchoolTableComponent } from './reports/average-attendance-school-table/average-attendance-school-table.component';
import { TasTrendlineChartComponent } from './reports/tas-trendline-chart/tas-trendline-chart.component';

@Component({
  selector: 'app-teacher-attendance-summary',
  templateUrl: './teacher-attendance-summary.component.html',
  styleUrls: ['./teacher-attendance-summary.component.scss']
})
export class TeacherAttendanceSummaryComponent implements OnInit, OnDestroy {

  bigNumberReports: any = {};
  maxDate: any;
  minDate: any;
  startDate: any;
  endDate: any
  reportsData: any[] = []
  rbacDetails: any;
  defaultSelectedDays: any = 7;
  drillDownLevel: any =1;
  criteriaConfig: any = config.criteria_config;
  trendLineConfig = {
    options: {
      tooltips: { displayColors: false},
      legend: {display: false}
    }
  };
  drillDownSubscription: any;

  //added for full school report download
  // title = "Download School Report"
  schoolReportsData: any[] = [];
  pagereportName = "teachers_present"
  //
  @ViewChild('averageAttendanceBigNumber') averageAttendanceBigNumber: TasAverageAttendanceBignumberComponent;
  @ViewChild('averageAttendance') averageAttendance: TasAverageAttendanceComponent;
  @ViewChild('averageAttendanceSchool') averageAttendanceSchool: AverageAttendanceSchoolTableComponent;
  @ViewChild('averageAttendanceRank') averageAttendanceRank: TacAverageAttendanceRankComponent;
  @ViewChild('averageAttendanceBarchart') averageAttendanceBarchart: TasAverageAttendanceBarchartComponent
  @ViewChild('tasMap') tasMap: TeacherAttendanceMapComponent
  @ViewChild('TasTrendlineChartComponent') TasTrendlineChartComponent: TasTrendlineChartComponent

  constructor(private readonly _commonService: CommonService, private _rbacService: RbacService, private readonly _reportDrilldownService: ReportDrilldownService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
     
      this.rbacDetails = rbacDetails;
      this.drillDownLevel =rbacDetails.role
    })
    this.drillDownSubscription = this._reportDrilldownService.drilldownData.subscribe(data => {
      if (data) {
        this.drillDownLevel = data.hierarchyLevel || this.rbacDetails?.role
        this.reportsData = []
        this.schoolReportsData = []
      }
    })
  }

  ngOnInit(): void {
    // this._reportDrilldownService.emit()
  }

  ngOnDestroy(): void {
    this._reportDrilldownService.emit('reset')
    this.drillDownSubscription.unsubscribe()
  }

  ngAfterViewInit(): void {
    if (this.startDate === undefined && this.endDate === undefined) {
      let endDate = new Date();
      let days = endDate.getDate() - this.defaultSelectedDays;
      let startDate = new Date();
      startDate.setDate(days)
      this.averageAttendanceBigNumber?.getReportData(startDate?.toISOString().split('T')[0], endDate?.toISOString().split('T')[0]);
      this.averageAttendance?.getReportData(startDate?.toISOString().split('T')[0], endDate?.toISOString().split('T')[0]);
      this.averageAttendanceSchool?.getReportData(startDate?.toISOString().split('T')[0], endDate?.toISOString().split('T')[0]);
      this.averageAttendanceRank?.getReportData(startDate?.toISOString().split('T')[0], endDate?.toISOString().split('T')[0]);
      this.tasMap?.getReportData({ timeSeriesValues: { startDate: startDate?.toISOString().split('T')[0], endDate: endDate?.toISOString().split('T')[0] } });
      this.averageAttendanceBarchart?.getReportData(startDate?.toISOString().split('T')[0], endDate?.toISOString().split('T')[0]);
      this.TasTrendlineChartComponent?.getReportData(startDate?.toISOString().split('T')[0], endDate?.toISOString().split('T')[0]);


      // this.getSchoolReportData()
    }
  }


  checkReport(key: string, reportType: string): Boolean {
    let reportConfig = config;
    let flag = false;
    reportConfig[key]?.filters?.forEach((filter: any) => {
      if (Number(filter.hierarchyLevel) === Number(this.rbacDetails?.role) && Object.keys(filter?.actions?.queries).includes(reportType)) {
        flag = true
      }
    })
    return flag
  }

  csvDownload(csvData: any) {
    if (csvData) {
      this.reportsData.push(csvData)
    }
  }

  schoolCsvDownload(csvData: any, hierarchyLevel: any) {
    if (csvData && this.drillDownLevel == hierarchyLevel) {
      this.schoolReportsData.push(csvData)
    }
  }

  getSchoolReportData(startDate?: string, endDate?: string) {
    let query;
    if (startDate && endDate) {
      this.startDate = startDate;
      this.endDate = endDate;
    }
    else {
      let endDate = new Date();
      let days = endDate.getDate() - this.defaultSelectedDays;
      let startDate = new Date();
      startDate.setDate(days)
      this.startDate = startDate?.toISOString().split('T')[0];
      this.endDate = endDate?.toISOString().split('T')[0];
    }
    if (this.rbacDetails?.role == 1) {
      query = `select  school.school_id,  school.school_name,        district_name,        block_name,        cluster_name ,       sum(total_teachers.sum) as total_teachers,  sum(teachers_marked_present.sum) as teachers_marked_present,   ceil(round(cast((sum(teachers_marked_present.sum)/sum(total_teachers.sum) )*100 as numeric),2)) as average_percent_attendance from datasets.sch_att_teachers_marked_present_daily_school as teachers_marked_present  inner join  datasets.sch_att_total_teachers_daily_school as total_teachers on teachers_marked_present.school_id = total_teachers.school_id inner join dimensions.school on school.school_id = total_teachers.school_id where total_teachers.date between '${this.startDate}' and '${this.endDate}' group by  school.school_id,   school_name,    district_name,    block_name,    cluster_name;  `
    } else if (this.rbacDetails?.role == 2) {
      query = `select  school.school_id,  school.school_name,        district_name,        block_name,        cluster_name ,       sum(total_teachers.sum) as total_teachers,  sum(teachers_marked_present.sum) as teachers_marked_present,   ceil(round(cast((sum(teachers_marked_present.sum)/sum(total_teachers.sum) )*100 as numeric),2)) as average_percent_attendance from datasets.sch_att_teachers_marked_present_daily_school as teachers_marked_present  inner join  datasets.sch_att_total_teachers_daily_school as total_teachers on teachers_marked_present.school_id = total_teachers.school_id inner join dimensions.school on school.school_id = total_teachers.school_id where total_teachers.date between '${this.startDate}' and '${this.endDate}' and district_id = '${this.rbacDetails?.district}' group by  school.school_id,   school_name,    district_name,    block_name,    cluster_name;  `;
    } else if (this.rbacDetails?.role == 3) {
      query = `select  school.school_id,  school.school_name,        district_name,        block_name,        cluster_name ,       sum(total_teachers.sum) as total_teachers,  sum(teachers_marked_present.sum) as teachers_marked_present,   ceil(round(cast((sum(teachers_marked_present.sum)/sum(total_teachers.sum) )*100 as numeric),2)) as average_percent_attendance from datasets.sch_att_teachers_marked_present_daily_school as teachers_marked_present  inner join  datasets.sch_att_total_teachers_daily_school as total_teachers on teachers_marked_present.school_id = total_teachers.school_id inner join dimensions.school on school.school_id = total_teachers.school_id where total_teachers.date between '${this.startDate}' and '${this.endDate}' and district_id = '${this.rbacDetails?.district}' and block_id = '${this.rbacDetails?.block}' group by  school.school_id,   school_name,    district_name,    block_name,    cluster_name;  `;
    } else if (this.rbacDetails?.role == 4) {
      query = `select  school.school_id,  school.school_name,        district_name,        block_name,        cluster_name ,       sum(total_teachers.sum) as total_teachers,  sum(teachers_marked_present.sum) as teachers_marked_present,   ceil(round(cast((sum(teachers_marked_present.sum)/sum(total_teachers.sum) )*100 as numeric),2)) as average_percent_attendance from datasets.sch_att_teachers_marked_present_daily_school as teachers_marked_present  inner join  datasets.sch_att_total_teachers_daily_school as total_teachers on teachers_marked_present.school_id = total_teachers.school_id inner join dimensions.school on school.school_id = total_teachers.school_id where total_teachers.date between '${this.startDate}' and '${this.endDate}' and district_id = '${this.rbacDetails?.district}' and block_id = '${this.rbacDetails?.block}' and cluster_id = '${this.rbacDetails?.cluster}' group by  school.school_id,   school_name,    district_name,    block_name,    cluster_name;  `;
    }

    this._commonService.getReportDataNew(query).subscribe((res: any) => {
      let d = { reportData: res, reportType: 'map', reportName: "teacher_present_school_wise" };
      if (d.reportData.length > 0) {
        this.schoolReportsData.push(d);
      }
    })
  }

  settimeSeriesDates(dates: any) {
    // this.minDate = (this.minDate === undefined || (dates?.minDate && this.minDate < dates.minDate)) ? dates?.minDate : this.minDate
    // this.maxDate = (this.maxDate === undefined || (dates?.maxDate && this.maxDate > dates.maxDate)) ? dates.maxDate : this.maxDate
  }

  timeSeriesUpdated(event: any): void {
    this.startDate = moment(event.startDate).format('YYYY-MM-DD');
    this.endDate = moment(event.endDate).format('YYYY-MM-DD');
    if (event?.startDate !== null && event?.endDate !== null) {
      this.reportsData = []
      this.schoolReportsData = []
      this.averageAttendanceBigNumber?.getReportData(this.startDate, this.endDate);
      this.averageAttendance?.getReportData(this.startDate, this.endDate);
      this.averageAttendanceSchool?.getReportData(this.startDate, this.endDate);
      this.averageAttendanceBarchart?.getReportData(this.startDate, this.endDate);
      this.averageAttendanceRank?.getReportData(this.startDate, this.endDate);
      this.tasMap?.getReportData({ timeSeriesValues: { startDate: this.startDate, endDate: this.endDate } });
      this.TasTrendlineChartComponent?.getReportData(this.startDate, this.endDate);

      // this.getSchoolReportData(this.startDate, this.endDate)
    }
  }

}


