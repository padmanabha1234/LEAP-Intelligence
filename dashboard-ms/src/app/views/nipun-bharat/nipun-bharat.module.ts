import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NipunBharatRoutingModule } from './nipun-bharat-routing.module';
import { NipunBharatComponent } from './nipun-bharat.component';
import { TextbookStatusTabComponent } from './pages/textbook-status-tab/textbook-status-tab.component';
import { LearningSessionsTabComponent } from './pages/learning-sessions-tab/learning-sessions-tab.component';
import { TextbookStatusComponent } from './pages/textbook-status-tab/reports/textbook-status/textbook-status.component';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { LearningSessionsComponent } from './pages/learning-sessions-tab/reports/learning-sessions/learning-sessions.component';
import { NipunBharatMetricsComponent } from './pages/textbook-status-tab/reports/nipun-bharat-metrics/nipun-bharat-metrics.component';


@NgModule({
  declarations: [
    NipunBharatComponent,
    TextbookStatusTabComponent,
    LearningSessionsTabComponent,
    TextbookStatusComponent,
    LearningSessionsComponent,
    NipunBharatMetricsComponent
  ],
  imports: [
    CommonModule,
    NipunBharatRoutingModule,
    DashletModule.forRoot({
      dataService: DataService
  }),
  MatTabsModule,
  SharedModule,
  ]
})
export class NipunBharatModule { }
