import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SchoolInfrastructureComponent} from "./school-infrastructure.component";

const routes: Routes = [
  {path: '', component: SchoolInfrastructureComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolInfrastructureRoutingModule { }
