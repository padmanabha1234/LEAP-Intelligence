import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeapRoutingModule } from './leap-routing.module';
import { LeapComponent } from './leap.component';
import { LeapTabComponent } from './pages/leap-tab/leap-tab.component';
import { LeapAvailibilityComponent } from './pages/leap-tab/reports/leap-availibility/leap-availibility.component';
import { LeapPerformanceComponent } from './pages/leap-tab/reports/leap-performance/leap-performance.component';
import { QualityComponent } from './pages/leap-tab/reports/quality/quality.component';

import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeapOeeComponent } from './pages/leap-tab/reports/leap-oee/leap-oee.component';
import { LeapAlertsTabComponent } from './pages/leap-alerts-tab/leap-alerts-tab.component';
import { LeapAlertsIframeComponent } from './pages/leap-alerts-tab/reports/leap-alerts-iframe/leap-alerts-iframe.component';


@NgModule({
  declarations: [
    LeapComponent,
    LeapTabComponent,
    LeapAvailibilityComponent,
    LeapPerformanceComponent,
    QualityComponent,
    LeapOeeComponent,
    LeapAlertsTabComponent,
    LeapAlertsIframeComponent
  ],
  imports: [
    CommonModule,
    DashletModule.forRoot({
      dataService: DataService
  }),
  MatTabsModule,
  SharedModule,
    LeapRoutingModule
  ]
})
export class LeapModule { }
