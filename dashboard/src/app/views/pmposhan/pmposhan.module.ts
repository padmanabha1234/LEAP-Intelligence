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

@NgModule({
declarations: [
    PmPoshanComponent,
    ProgressStatusTabComponent,
    ProgressStatusComponent,
    PmposhanBignumberMetricsComponent
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
