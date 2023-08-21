import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmPoshanComponent } from './pmposhan.component';           
const routes: Routes = [
    {
        path:'',
        component: PmPoshanComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PmPoshanRoutingModule { }