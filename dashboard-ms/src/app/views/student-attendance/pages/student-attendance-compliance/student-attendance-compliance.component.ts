import { Component, OnInit, ViewChild } from '@angular/core';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { config } from '../../config/student_attendance_config';
import { SacAttendanceComplianceRankComponent } from './reports/sac-attendance-compliance-rank/sac-attendance-compliance-rank.component';
import { SacAverageAttendanceComplianceBignumberComponent } from './reports/sac-average-attendance-compliance-bignumber/sac-average-attendance-compliance-bignumber.component';
import { SacAverageAttendanceComplianceComponent } from './reports/sac-average-attendance-compliance/sac-average-attendance-compliance.component';

@Component({
  selector: 'app-student-attendance-compliance',
  templateUrl: './student-attendance-compliance.component.html',
  styleUrls: ['./student-attendance-compliance.component.scss']
})
export class StudentAttendanceComplianceComponent implements OnInit {

  bigNumberReports: any = {};
  maxDate: any;
  minDate: any;
  startDate: any;
  endDate: any
  reportsData : any[]=[]
  defaultSelectedDays: any = 7;
  rbacDetails: any;


  @ViewChild('averageAttendanceComplianceBigNumber') averageAttendanceComplianceBigNumber: SacAverageAttendanceComplianceBignumberComponent;
  @ViewChild('averageAttendanceCompliance') averageAttendanceCompliance: SacAverageAttendanceComplianceComponent;
  @ViewChild('attendanceComplianceRank') attendanceComplianceRank: SacAttendanceComplianceRankComponent;
  
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
      this.attendanceComplianceRank?.getReportData(startDate?.toISOString().split('T')[0], endDate?.toISOString().split('T')[0]);
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
      this.attendanceComplianceRank?.getReportData(this.startDate, this.endDate);
    }
  }

}
