import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeapComponent } from './leap.component';

const routes: Routes = [
  {
      path:'',
      component: LeapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeapRoutingModule { }
