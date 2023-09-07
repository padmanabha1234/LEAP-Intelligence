import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import {PgiRoutingModule} from './pgi-routing.module';
import {PgiComponent} from './pgi.component';

import {DistrictWisePerformanceTabComponent} from './pages/district-wise-performance-tab/district-wise-performance-tab.component';
import {DistrictWisePerformanceComponent} from './pages/district-wise-performance-tab/reports/district-wise-performance/district-wise-performance.component';
import { PgiBignumberMetricsComponent } from './pages/district-wise-performance-tab/reports/pgi-bignumber-metrics/pgi-bignumber-metrics.component';
import { StateWisePerformanceTabComponent } from './pages/state-wise-performance-tab/state-wise-performance-tab.component';
import { ImplementationStatusTabComponent } from './pages/implementation-status-tab/implementation-status-tab.component';
import { ImplementationStatusComponent } from './pages/implementation-status-tab/reports/implementation-status/implementation-status.component';
import { StateWisePerformanceComponent } from './pages/state-wise-performance-tab/reports/state-wise-performance/state-wise-performance.component';

@NgModule({
declarations: [
    PgiComponent,
    DistrictWisePerformanceTabComponent,
    DistrictWisePerformanceComponent,
    PgiBignumberMetricsComponent,
    StateWisePerformanceTabComponent,
    ImplementationStatusTabComponent,
    ImplementationStatusComponent,
    StateWisePerformanceComponent,
],
imports: [
    DashletModule.forRoot({
        dataService: DataService
    }),
    MatTabsModule,
    SharedModule,
    CommonModule,
    PgiRoutingModule
]
})
export class PgiModule { }
