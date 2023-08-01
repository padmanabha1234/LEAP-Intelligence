import { Component, OnInit, ViewChild } from '@angular/core';
import { TacAttendanceComplianceBignumberComponent } from './reports/tac-attendance-compliance-bignumber/tac-attendance-compliance-bignumber.component';
import { TacAttendanceComplianceRankComponent } from './reports/tac-attendance-compliance-rank/tac-attendance-compliance-rank.component';
import { TacAverageAttendanceComplianceComponent } from './reports/tac-average-attendance-compliance/tac-average-attendance-compliance.component';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { config } from '../../config/teacher_attendance_config'

@Component({
  selector: 'app-teacher-attendance-compliance',
  templateUrl: './teacher-attendance-compliance.component.html',
  styleUrls: ['./teacher-attendance-compliance.component.scss']
})
export class TeacherAttendanceComplianceComponent implements OnInit {

  bigNumberReports: any = {};
  maxDate: any;
  minDate: any;
  startDate: any;
  endDate: any;
  reportsData : any[]=[]
  rbacDetails: any;
  defaultSelectedDays: any = 7;
  

  @ViewChild('averageAttendanceComplianceBigNumber') averageAttendanceComplianceBigNumber:TacAttendanceComplianceBignumberComponent;
  @ViewChild('averageAttendanceCompliance') averageAttendanceCompliance:TacAverageAttendanceComplianceComponent;
  @ViewChild('attenadanceComplianceRank') attenadanceComplianceRank: TacAttendanceComplianceRankComponent;
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
      this.averageAttendanceComplianceBigNumber?.getReportData(startDate?.toISOString().split('T')[0], endDate?.toISOString().split('T')[0]);
      this.averageAttendanceCompliance?.getReportData(startDate?.toISOString().split('T')[0], endDate?.toISOString().split('T')[0]);
      this.attenadanceComplianceRank?.getReportData(startDate?.toISOString().split('T')[0], endDate?.toISOString().split('T')[0]);
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
      this.averageAttendanceComplianceBigNumber?.getReportData(this.startDate, this.endDate);
      this.averageAttendanceCompliance?.getReportData(this.startDate, this.endDate);
      this.attenadanceComplianceRank?.getReportData(this.startDate, this.endDate);
    }
  }

}
