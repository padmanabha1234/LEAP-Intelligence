import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentStatisticsRoutingModule } from './student-statistics-routing.module';
import { DashletModule } from '@project-sunbird/sb-dashlet';
import { DataService } from 'src/app/core/services/data.service';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsAndCwsnEnrollmentComponent } from './pages/student-statistics-tab/reports/students-and-cwsn-enrollment/students-and-cwsn-enrollment.component';
import { StudentStatisticsComponent } from './student-statistics.component';
import { StudentStatisticsTabComponent } from './pages/student-statistics-tab/student-statistics-tab.component';
import { TotalStudentsEnrolledComponent } from './pages/student-statistics-tab/reports/total-students-enrolled/total-students-enrolled.component';
import { GenderWiseStudentEnrollmentComponent } from './pages/student-statistics-tab/reports/gender-wise-student-enrollment/gender-wise-student-enrollment.component';
import { GradeCategoryWiseEnrollmentComponent } from './pages/student-statistics-tab/reports/grade-category-wise-enrollment/grade-category-wise-enrollment.component';
import { StudentCategoryWiseEnrollmentComponent } from './pages/student-statistics-tab/reports/student-category-wise-enrollment/student-category-wise-enrollment.component';
import { RankStudentsAndCwsnEnrollmentComponent } from './pages/student-statistics-tab/reports/rank-students-and-cwsn-enrollment/rank-students-and-cwsn-enrollment.component';

@NgModule({
  declarations: [
    StudentStatisticsTabComponent,
    StudentStatisticsComponent,
    StudentsAndCwsnEnrollmentComponent,
    TotalStudentsEnrolledComponent,
    GenderWiseStudentEnrollmentComponent,
    GradeCategoryWiseEnrollmentComponent,
    StudentCategoryWiseEnrollmentComponent,
    RankStudentsAndCwsnEnrollmentComponent
  ],
  imports: [
    SharedModule,
    DashletModule.forRoot({
      dataService: DataService
    }),
    MatTabsModule,
    CommonModule,
    StudentStatisticsRoutingModule
  ]
})
export class StudentStatisticsModule { }
