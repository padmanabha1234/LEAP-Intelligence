import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicroImprovementsComponent } from './micro-improvements.component';

const routes: Routes = [
  {
      path:'',
      component:MicroImprovementsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MicroImprovementsRoutingModule { }
