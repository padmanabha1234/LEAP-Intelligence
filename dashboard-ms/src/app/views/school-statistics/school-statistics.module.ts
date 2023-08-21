import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolStatisticsRoutingModule } from './school-statistics-routing.module';
import { SchoolStatisticsComponent } from './school-statistics.component';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { TotalSchoolStatisticsComponent } from './pages/total-school-statistics/total-school-statistics.component';
import { EnrolmentWiseSchoolsComponent } from './pages/total-school-statistics/reports/enrolment-wise-schools/enrolment-wise-schools.component';
import { CategoryWiseTotalSchoolsComponent } from './pages/total-school-statistics/reports/category-wise-total-schools/category-wise-total-schools.component';
import { TotalSchoolsComponent } from './pages/total-school-statistics/reports/total-schools/total-schools.component';


@NgModule({
  declarations: [
    SchoolStatisticsComponent,
    TotalSchoolStatisticsComponent,
    EnrolmentWiseSchoolsComponent,
    CategoryWiseTotalSchoolsComponent,
    TotalSchoolsComponent
    
  ],
  imports: [
    DashletModule.forRoot({
      dataService: DataService
    }),
    MatTabsModule,
    SharedModule,
    CommonModule,
    SchoolStatisticsRoutingModule
  ]
})
export class SchoolStatisticsModule { }
