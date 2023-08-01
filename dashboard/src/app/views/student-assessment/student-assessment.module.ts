import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentAssessmentRoutingModule } from './student-assessment-routing.module';
import { StudentAssessmentComponent } from './student-assessment.component';
import {SharedModule} from "../../shared/shared.module";
import {MatTabsModule} from "@angular/material/tabs";


@NgModule({
  declarations: [
    StudentAssessmentComponent
  ],
  imports: [
    CommonModule,
    StudentAssessmentRoutingModule,
    MatTabsModule,
    SharedModule
  ]
})
export class StudentAssessmentModule { }
