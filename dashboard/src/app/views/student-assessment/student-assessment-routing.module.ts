import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentAssessmentComponent} from "./student-assessment.component";

const routes: Routes = [
  {path: '', component: StudentAssessmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentAssessmentRoutingModule { }
