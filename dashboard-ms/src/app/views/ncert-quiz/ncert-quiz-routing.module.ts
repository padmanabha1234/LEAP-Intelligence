import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NcertQuizComponent } from './ncert-quiz.component';

const routes: Routes = [
  {
      path:'',
      component: NcertQuizComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NcertQuizRoutingModule { }
