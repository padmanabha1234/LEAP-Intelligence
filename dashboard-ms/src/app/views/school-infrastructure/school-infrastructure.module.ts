import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolInfrastructureRoutingModule } from './school-infrastructure-routing.module';
import { SchoolInfrastructureComponent } from './school-infrastructure.component';
import {MatTabsModule} from "@angular/material/tabs";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    SchoolInfrastructureComponent
  ],
  imports: [
    CommonModule,
    SchoolInfrastructureRoutingModule,
    MatTabsModule,
    SharedModule
  ]
})
export class SchoolInfrastructureModule { }
