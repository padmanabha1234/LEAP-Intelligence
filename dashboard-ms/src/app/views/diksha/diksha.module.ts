import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashletModule, DataService } from '@project-sunbird/sb-dashlet';
import {DikshaRoutingModule} from './diksha-routing.module';
import {DikshaComponent} from './diksha.component';

import {EtbCoverageStatusTabComponent} from './pages/etb-coverage-status-tab/etb-coverage-status-tab.component';
import {EtbCoverageStatusComponentBignumber} from './pages/etb-coverage-status-tab/reports/etb-coverage-status-bignumber/etb-coverage-status-bignumber.component';
import {EtbCoverageStatusComponent} from './pages/etb-coverage-status-tab/reports/etb-coverage-status/etb-coverage-status.component';
import { ContentCoverageTabComponent } from './pages/content-coverage-tab/content-coverage-tab.component';
import { LearningSessionsTabComponent } from './pages/learning-sessions-tab/learning-sessions-tab.component';
import { LearningSessionsOnPotentialUsersTabComponent } from './pages/learning-sessions-on-potential-users-tab/learning-sessions-on-potential-users-tab.component';
import { ContentCoverageComponent } from './pages/content-coverage-tab/reports/content-coverage/content-coverage.component';
import { ContentCoverageComponentBignumber } from './pages/content-coverage-tab/reports/content-coverage-bignumber/content-coverage-bignumber.component';
import { LearningSessionsComponent } from './pages/learning-sessions-tab/reports/learning-sessions/learning-sessions.component';
import { LearningSessionsOnPotentialUsersComponent } from './pages/learning-sessions-on-potential-users-tab/reports/learning-sessions-on-potential-users/learning-sessions-on-potential-users.component';
import { EtbBignumbersComponent } from './pages/etb-coverage-status-tab/reports/etb-bignumbers/etb-bignumbers.component';
import { ImplementationStatusTabComponent } from './pages/implementation-status-tab/implementation-status-tab.component';
import { ImplementationStatusComponent } from './pages/implementation-status-tab/reports/implementation-status/implementation-status.component';
import { EtbCoverageStatusNvskComponent } from './pages/etb-coverage-status-tab/reports/etb-coverage-status-nvsk/etb-coverage-status-nvsk.component';
import { ContentCoverageBarComponent } from './pages/content-coverage-tab/reports/content-coverage-bar/content-coverage-bar.component';
import { ContentCoverageMapComponent } from './pages/content-coverage-tab/reports/content-coverage-map/content-coverage-map.component';

@NgModule({
declarations: [
    DikshaComponent,
    EtbCoverageStatusTabComponent,ContentCoverageTabComponent,LearningSessionsTabComponent,LearningSessionsOnPotentialUsersTabComponent,
    EtbCoverageStatusComponentBignumber,EtbCoverageStatusComponent,ContentCoverageComponent,ContentCoverageComponentBignumber,LearningSessionsComponent,LearningSessionsOnPotentialUsersComponent, EtbBignumbersComponent, ImplementationStatusTabComponent, ImplementationStatusComponent, EtbCoverageStatusNvskComponent, ContentCoverageBarComponent, ContentCoverageMapComponent
],
imports: [
    DashletModule.forRoot({
        dataService: DataService
    }),
    MatTabsModule,
    SharedModule,
    CommonModule,
    DikshaRoutingModule
]
})
export class DikshaModule { }
