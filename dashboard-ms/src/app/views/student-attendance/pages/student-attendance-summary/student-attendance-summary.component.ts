import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { config } from '../../config/student_attendance_config';
import { GenderWiseAverageAttendanceComponent } from './reports/gender-wise-average-attendance/gender-wise-average-attendance.component';
import { GradeWiseAverageAttendanceComponent } from './reports/grade-wise-average-attendance/grade-wise-average-attendance.component';
import { SasAverageAttendanceBignumberComponent } from './reports/sas-average-attendance-bignumber/sas-average-attendance-bignumber.component';
import { SasAverageAttendanceRankComponent } from './reports/sas-average-attendance-rank/sas-average-attendance-rank.component';
import { SasAverageAttendanceComponent } from './reports/sas-average-attendance/sas-average-attendance.component';

@Component({
  selector: 'app-student-attendance-summary',
  templateUrl: './student-attendance-summary.component.html',
  styleUrls: ['./student-attendance-summary.component.scss']
})
export class StudentAttendanceSummaryComponent implements OnInit, AfterViewInit {

  bigNumberReports: any = {};
  maxDate: any;
  minDate: any;
  startDate: any;
  endDate: any;
  defaultSelectedDays: any = 7;
  reportsData: any[] = [];
  rbacDetails: any;

  @ViewChild('averageAttendance') averageAttendance: SasAverageAttendanceComponent;
  @ViewChild('averageAttendanceBignumber') averageAttendanceBignumber: SasAverageAttendanceBignumberComponent;
  @ViewChild('genderWiseAverageAttendance') genderWiseAverageAttendance: GenderWiseAverageAttendanceComponent;
  @ViewChild('gradeWiseAverageAttendance') gradeWiseAverageAttendance: GradeWiseAverageAttendanceComponent;
  @ViewChild('averageAttendanceRank') averageAttendanceRank: SasAverageAttendanceRankComponent;

  constructor(private _rbacService: RbacService) { 
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.startDate === undefined && this.endDate === undefined) {
      let endDate = new Date();
      let days = endDate.getDate() - this.defaultSelectedDays;
      let startDate = new Date();
      startDate.setDate(days)
      this.averageAttendanceBignumber?.getReportData(startDate?.toISOString().split('T')[0], endDate?.toISOString().split('T')[0]);
      this.averageAttendance?.getReportData(startDate?.toISOString().split('T')[0], endDate?.toISOString().split('T')[0]);
      this.genderWiseAverageAttendance?.getReportData(startDate?.toISOString().split('T')[0], endDate?.toISOString().split('T')[0]);
      this.gradeWiseAverageAttendance?.getReportData(startDate?.toISOString().split('T')[0], endDate?.toISOString().split('T')[0]);
      this.averageAttendanceRank?.getReportData(startDate?.toISOString().split('T')[0], endDate?.toISOString().split('T')[0]);
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

  settimeSeriesDates(dates: any) {
    // this.minDate = (this.minDate === undefined || (dates?.minDate && this.minDate < dates.minDate)) ? dates?.minDate : this.minDate
    // this.maxDate = (this.maxDate === undefined || (dates?.maxDate && this.maxDate > dates.maxDate)) ? dates.maxDate : this.maxDate
  }

  timeSeriesUpdated(event: any): void {
    this.startDate = event?.startDate?.toDate().toISOString().split('T')[0]
    this.endDate = event?.endDate?.toDate().toISOString().split('T')[0]
    if (event?.startDate !== null && event?.endDate !== null) {
      this.reportsData = []
      this.averageAttendanceBignumber?.getReportData(this.startDate, this.endDate);
      this.averageAttendance?.getReportData(this.startDate, this.endDate);
      this.genderWiseAverageAttendance?.getReportData(this.startDate, this.endDate);
      this.gradeWiseAverageAttendance?.getReportData(this.startDate, this.endDate);
      this.averageAttendanceRank?.getReportData(this.startDate, this.endDate);
    }
  }

}
