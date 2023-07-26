import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolProgressionRoutingModule } from './school-progression-routing.module';
import { SchoolProgressionComponent } from './school-progression.component';
import {MatTabsModule} from "@angular/material/tabs";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    SchoolProgressionComponent
  ],
  imports: [
    CommonModule,
    SchoolProgressionRoutingModule,
    MatTabsModule,
    SharedModule
  ]
})
export class SchoolProgressionModule { }
