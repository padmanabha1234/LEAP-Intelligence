import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentAttendanceRoutingModule } from './student-attendance-routing.module';
import { StudentAttendanceComponent } from './student-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { StudentAttendanceComplianceComponent } from './pages/student-attendance-compliance/student-attendance-compliance.component';
import { StudentAttendanceSummaryComponent } from './pages/student-attendance-summary/student-attendance-summary.component';
import { SacAverageAttendanceComplianceComponent } from './pages/student-attendance-compliance/reports/sac-average-attendance-compliance/sac-average-attendance-compliance.component';
import { SasAverageAttendanceComponent } from './pages/student-attendance-summary/reports/sas-average-attendance/sas-average-attendance.component';
import { GenderWiseAverageAttendanceComponent } from './pages/student-attendance-summary/reports/gender-wise-average-attendance/gender-wise-average-attendance.component';
import { GradeWiseAverageAttendanceComponent } from './pages/student-attendance-summary/reports/grade-wise-average-attendance/grade-wise-average-attendance.component';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import { SacAttendanceComplianceRankComponent } from './pages/student-attendance-compliance/reports/sac-attendance-compliance-rank/sac-attendance-compliance-rank.component';
import { SasAverageAttendanceRankComponent } from './pages/student-attendance-summary/reports/sas-average-attendance-rank/sas-average-attendance-rank.component';
import { SasAverageAttendanceBignumberComponent } from './pages/student-attendance-summary/reports/sas-average-attendance-bignumber/sas-average-attendance-bignumber.component';
import { SacAverageAttendanceComplianceBignumberComponent } from './pages/student-attendance-compliance/reports/sac-average-attendance-compliance-bignumber/sac-average-attendance-compliance-bignumber.component';


@NgModule({
  declarations: [
    StudentAttendanceComponent,
    StudentAttendanceComplianceComponent,
    StudentAttendanceSummaryComponent,
    SacAverageAttendanceComplianceComponent,
    SasAverageAttendanceComponent,
    GenderWiseAverageAttendanceComponent,
    GradeWiseAverageAttendanceComponent,
    SacAttendanceComplianceRankComponent,
    SasAverageAttendanceRankComponent,
    SasAverageAttendanceBignumberComponent,
    SacAverageAttendanceComplianceBignumberComponent
  ],
  imports: [
    DashletModule.forRoot({
      dataService: DataService
    }),
    MatTabsModule,
    SharedModule,
    CommonModule,
    StudentAttendanceRoutingModule
  ]
})
export class StudentAttendanceModule { }
