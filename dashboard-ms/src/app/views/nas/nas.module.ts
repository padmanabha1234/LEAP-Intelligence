import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import {NasRoutingModule} from './nas-routing.module';
import {NasComponent} from './nas.component';

import {DistrictWisePerformanceTabComponent} from './pages/district-wise-performance-tab/district-wise-performance-tab.component';
import {DistrictWisePerformanceComponent} from './pages/district-wise-performance-tab/reports/district-wise-performance/district-wise-performance.component';
import { GradeAndSubjectPerformanceComponent } from './pages/grade-and-subject-performance-tab/reports/grade-and-subject-performance/grade-and-subject-performance.component';
import { GradeAndSubjectPerformanceTabComponent } from './pages/grade-and-subject-performance-tab/grade-and-subject-performance-tab.component';
import { NasBignumberMetricsComponent } from './pages/district-wise-performance-tab/reports/nas-bignumber-metrics/nas-bignumber-metrics.component';
import { NasImplementationStatusTabComponent } from './pages/nas-implementation-status-tab/nas-implementation-status-tab.component';
import { NasImplementationStatusComponent } from './pages/nas-implementation-status-tab/reports/nas-implementation-status/nas-implementation-status.component';
import { NasStateWisePerformanceTabComponent } from './pages/nas-state-wise-performance-tab/nas-state-wise-performance-tab.component';
import { NasStateWisePerformanceComponent } from './pages/nas-state-wise-performance-tab/reports/nas-state-wise-performance/nas-state-wise-performance.component';

@NgModule({
declarations: [
    NasComponent,
    DistrictWisePerformanceTabComponent,GradeAndSubjectPerformanceTabComponent,
    DistrictWisePerformanceComponent,GradeAndSubjectPerformanceComponent, NasBignumberMetricsComponent, NasImplementationStatusTabComponent, NasImplementationStatusComponent, NasStateWisePerformanceTabComponent, NasStateWisePerformanceComponent
],
imports: [
    DashletModule.forRoot({
        dataService: DataService
    }),
    MatTabsModule,
    SharedModule,
    CommonModule,
    NasRoutingModule
]
})
export class NasModule { }
