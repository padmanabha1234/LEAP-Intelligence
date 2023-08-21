import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherStatisticsComponent } from './teacher-statistics.component';

const routes: Routes = [
  {
    path:'',
    component: TeacherStatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherStatisticsRoutingModule { }
