import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherStatisticsRoutingModule } from './teacher-statistics-routing.module';
import { TeacherStatisticsComponent } from './teacher-statistics.component';
import { TeacherStatisticsMainComponent } from './pages/teacher-statistics-main/teacher-statistics-main.component';
import { TsTotalTeachersComponent } from './pages/teacher-statistics-main/reports/ts-total-teachers/ts-total-teachers.component';
import { TsCategoryWiseTotalTeachersComponent } from './pages/teacher-statistics-main/reports/ts-category-wise-total-teachers/ts-category-wise-total-teachers.component';
import { TsAveragePupilTeacherRatioComponent } from './pages/teacher-statistics-main/reports/ts-average-pupil-teacher-ratio/ts-average-pupil-teacher-ratio.component';
import { TsCategoryWiseAveragePupilTeacherRatioComponent } from './pages/teacher-statistics-main/reports/ts-category-wise-average-pupil-teacher-ratio/ts-category-wise-average-pupil-teacher-ratio.component';
import { TsRankInAveragePupilTeacherRatioComponent } from './pages/teacher-statistics-main/reports/ts-rank-in-average-pupil-teacher-ratio/ts-rank-in-average-pupil-teacher-ratio.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';


@NgModule({
  declarations: [
    TeacherStatisticsComponent,
    TeacherStatisticsMainComponent,
    TsTotalTeachersComponent,
    TsCategoryWiseTotalTeachersComponent,
    TsAveragePupilTeacherRatioComponent,
    TsCategoryWiseAveragePupilTeacherRatioComponent,
    TsRankInAveragePupilTeacherRatioComponent
  ],
  imports: [
    DashletModule.forRoot({
      dataService: DataService
    }),
    MatTabsModule,
    SharedModule,
    CommonModule,
    TeacherStatisticsRoutingModule
  ]
})
export class TeacherStatisticsModule { }
