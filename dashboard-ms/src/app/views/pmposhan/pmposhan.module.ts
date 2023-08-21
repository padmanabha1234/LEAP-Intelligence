import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import {PmPoshanRoutingModule} from './pmposhan-routing.module';
import {PmPoshanComponent} from './pmposhan.component';

import {ProgressStatusTabComponent} from './pages/progress-status-tab/progress-status-tab.component';
import {ProgressStatusComponent} from './pages/progress-status-tab/reports/progress-status/progress-status.component';
import { PmposhanBignumberMetricsComponent } from './pages/progress-status-tab/reports/pmposhan-bignumber-metrics/pmposhan-bignumber-metrics.component';
import { ImplementationStatusTabComponent } from './pages/implementation-status-tab/implementation-status-tab.component';
import { ImplementationStatusComponent } from './pages/implementation-status-tab/reports/implementation-status/implementation-status.component';
import { StateWiseProgressStatusTabComponent } from './pages/state-wise-progress-status-tab/state-wise-progress-status-tab.component';
import { StateWiseProgressStatusComponent } from './pages/state-wise-progress-status-tab/reports/state-wise-progress-status/state-wise-progress-status.component';

@NgModule({
declarations: [
    PmPoshanComponent,
    ProgressStatusTabComponent,
    ProgressStatusComponent,
    PmposhanBignumberMetricsComponent,
    ImplementationStatusTabComponent,
    ImplementationStatusComponent,
    StateWiseProgressStatusTabComponent,
    StateWiseProgressStatusComponent
],
imports: [
    DashletModule.forRoot({
        dataService: DataService
    }),
    MatTabsModule,
    SharedModule,
    CommonModule,
    PmPoshanRoutingModule
]
})
export class PmPoshanModule { }
