import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DikshaComponent } from './diksha.component';           
const routes: Routes = [
    {
        path:'',
        component: DikshaComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DikshaRoutingModule { }