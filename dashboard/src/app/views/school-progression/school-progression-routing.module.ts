import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SchoolProgressionComponent} from "./school-progression.component";

const routes: Routes = [
  {path: '', component: SchoolProgressionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolProgressionRoutingModule { }
