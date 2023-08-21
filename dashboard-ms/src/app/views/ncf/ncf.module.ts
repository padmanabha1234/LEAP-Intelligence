import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NcfRoutingModule } from './ncf-routing.module';
import { NcfComponent } from './ncf.component';
import { ProgressStatusTabComponent } from './pages/progress-status-tab/progress-status-tab.component';
import { DisancSurveyTabComponent } from './pages/disanc-survey-tab/disanc-survey-tab.component';
import { ProgressStatusComponent } from './pages/progress-status-tab/reports/progress-status/progress-status.component';
import { DisancSurveyMapComponent } from './pages/disanc-survey-tab/reports/disanc-survey-map/disanc-survey-map.component';
import { DisancSurveyBarComponent } from './pages/disanc-survey-tab/reports/disanc-survey-bar/disanc-survey-bar.component';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { NcfBignumberComponent } from './pages/progress-status-tab/reports/ncf-bignumber/ncf-bignumber.component';

@NgModule({
  declarations: [
    NcfComponent,
    ProgressStatusTabComponent,
    DisancSurveyTabComponent,
    ProgressStatusComponent,
    DisancSurveyMapComponent,
    DisancSurveyBarComponent,
    NcfBignumberComponent,
    
  ],
  imports: [
    CommonModule,
    NcfRoutingModule,
    DashletModule.forRoot({
      dataService: DataService
  }),
  MatTabsModule,
  SharedModule,
  ]
})
export class NcfModule { }
