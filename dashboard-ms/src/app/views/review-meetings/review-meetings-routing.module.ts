import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewMeetingsComponent } from './review-meetings.component';

const routes: Routes = [
  {
    path:'',
    component: ReviewMeetingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewMeetingsRoutingModule { }
