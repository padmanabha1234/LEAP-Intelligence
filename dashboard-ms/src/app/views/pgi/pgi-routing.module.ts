import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PgiComponent } from './pgi.component';           
const routes: Routes = [
    {
        path:'',
        component: PgiComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PgiRoutingModule { }