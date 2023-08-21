import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NcertQuizRoutingModule } from './ncert-quiz-routing.module';
import { NcertQuizComponent } from './ncert-quiz.component';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import { ImplementationStatusTabComponent } from './pages/implementation-status-tab/implementation-status-tab.component';
import { ParticipationStatusTabComponent } from './pages/participation-status-tab/participation-status-tab.component';
import { QuizWiseStatusTabComponent } from './pages/quiz-wise-status-tab/quiz-wise-status-tab.component';
import { ImplementationStatusComponent } from './pages/implementation-status-tab/reports/implementation-status/implementation-status.component';
import { ParticipationStatusComponent } from './pages/participation-status-tab/reports/participation-status/participation-status.component';
import { QuizWiseStatusComponent } from './pages/quiz-wise-status-tab/reports/quiz-wise-status/quiz-wise-status.component';
import { QuizBignumberMetricsComponent } from './pages/implementation-status-tab/reports/quiz-bignumber-metrics/quiz-bignumber-metrics.component';

@NgModule({
  declarations: [
    NcertQuizComponent,
    ImplementationStatusTabComponent,
    ParticipationStatusTabComponent,
    QuizWiseStatusTabComponent,
    ImplementationStatusComponent,
    ParticipationStatusComponent,
    QuizWiseStatusComponent,
    QuizBignumberMetricsComponent
  ],
  imports: [
    CommonModule,
    NcertQuizRoutingModule,
    DashletModule.forRoot({
      dataService: DataService
  }),
  MatTabsModule,
  SharedModule,
  CommonModule,
  ]
})
export class NcertQuizModule { }
