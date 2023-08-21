import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MicroImprovementsRoutingModule } from './micro-improvements-routing.module';
import { MicroImprovementsComponent } from './micro-improvements.component';
import { ImplementationStatusTabComponent } from './pages/implementation-status-tab/implementation-status-tab.component';
import { ImprovementsStatusTabComponent } from './pages/improvements-status-tab/improvements-status-tab.component';
import { ImplementationStatusComponent } from './pages/implementation-status-tab/reports/implementation-status/implementation-status.component';
import { ImprovementsStatusComponent } from './pages/improvements-status-tab/reports/improvements-status/improvements-status.component';

import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { MicroImprovementsMetricsComponent } from './pages/implementation-status-tab/reports/micro-improvements-metrics/micro-improvements-metrics.component';

@NgModule({
  declarations: [
    MicroImprovementsComponent,
    ImplementationStatusTabComponent,
    ImprovementsStatusTabComponent,
    ImplementationStatusComponent,
    ImprovementsStatusComponent,
    MicroImprovementsMetricsComponent,

  ],
  imports: [
    CommonModule,
    MicroImprovementsRoutingModule,
    DashletModule.forRoot({
      dataService: DataService
  }),
  MatTabsModule,
  SharedModule,
  ]
})
export class MicroImprovementsModule { }
