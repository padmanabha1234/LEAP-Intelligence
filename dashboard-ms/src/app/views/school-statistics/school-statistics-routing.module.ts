import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolStatisticsComponent } from './school-statistics.component';

const routes: Routes = [
  {
    path:'',
    component: SchoolStatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolStatisticsRoutingModule { }
