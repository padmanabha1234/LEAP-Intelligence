import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentStatisticsComponent } from './student-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: StudentStatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentStatisticsRoutingModule { }
