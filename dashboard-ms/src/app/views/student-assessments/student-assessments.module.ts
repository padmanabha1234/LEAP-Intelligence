import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentAssessmentsRoutingModule } from './student-assessments-routing.module';
import { StudentAssessmentsComponent } from './student-assessments.component';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import { AssessmentSummaryTabComponent } from './pages/assessment-summary-tab/assessment-summary-tab.component';
import { MapViewTabComponent } from './pages/map-view-tab/map-view-tab.component';
import { LoSummaryTabComponent } from './pages/lo-summary-tab/lo-summary-tab.component';
import { LoWiseSummaryComponent } from './pages/lo-summary-tab/reports/lo-wise-summary/lo-wise-summary.component';
import { MapViewStudentAssessmentComponent } from './pages/map-view-tab/reports/map-view-student-assessment/map-view-student-assessment.component';
import { AvgStuAsseesScoreBignoComponent } from './pages/assessment-summary-tab/reports/avg-stu-assees-score-bigno/avg-stu-assees-score-bigno.component';
import { AvgStuAsseesScoreTableComponent } from './pages/assessment-summary-tab/reports/avg-stu-assees-score-table/avg-stu-assees-score-table.component';
import { GradeWiseAvgStuAsessScoreComponent } from './pages/assessment-summary-tab/reports/grade-wise-avg-stu-asess-score/grade-wise-avg-stu-asess-score.component';
import { SubjectWiseAvgStuAsessScoreComponent } from './pages/assessment-summary-tab/reports/subject-wise-avg-stu-asess-score/subject-wise-avg-stu-asess-score.component';
@NgModule({
  declarations: [
    StudentAssessmentsComponent,
    AssessmentSummaryTabComponent,
    MapViewTabComponent,
    LoSummaryTabComponent,
    LoWiseSummaryComponent,
    MapViewStudentAssessmentComponent,
    AvgStuAsseesScoreBignoComponent,
    AvgStuAsseesScoreTableComponent,
    GradeWiseAvgStuAsessScoreComponent,
    SubjectWiseAvgStuAsessScoreComponent,
  ],
  imports: [
    DashletModule.forRoot({
      dataService: DataService
  }),
  MatTabsModule,
  SharedModule,
  CommonModule,
    StudentAssessmentsRoutingModule
  ]
})
export class StudentAssessmentsModule { }
