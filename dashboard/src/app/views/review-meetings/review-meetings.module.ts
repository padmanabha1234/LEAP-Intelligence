import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewMeetingsRoutingModule } from './review-meetings-routing.module';
import { ReviewMeetingsComponent } from './review-meetings.component';
import { ReviewMeetingsTabComponent } from './pages/review-meetings-tab/review-meetings-tab.component';
import { ReviewMeetingsConductedComponent } from './pages/review-meetings-tab/reports/review-meetings-conducted/review-meetings-conducted.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ReviewMeetingsStatusComponent } from './pages/review-meetings-tab/reports/review-meetings-status/review-meetings-status.component';
import { ReviewMeetingsConductedBignumberComponent } from './pages/review-meetings-tab/reports/review-meetings-conducted-bignumber/review-meetings-conducted-bignumber.component';


@NgModule({
  declarations: [
    ReviewMeetingsComponent,
    ReviewMeetingsTabComponent,
    ReviewMeetingsConductedComponent,
    ReviewMeetingsStatusComponent,
    ReviewMeetingsConductedBignumberComponent
  ],
  imports: [
    SharedModule,
    MatTabsModule,
    CommonModule,
    ReviewMeetingsRoutingModule
  ]
})
export class ReviewMeetingsModule { }
