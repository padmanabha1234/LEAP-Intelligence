import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAssessmentsComponent } from './student-assessments.component';

const routes: Routes = [
  {
      path:'',
      component: StudentAssessmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentAssessmentsRoutingModule { }
