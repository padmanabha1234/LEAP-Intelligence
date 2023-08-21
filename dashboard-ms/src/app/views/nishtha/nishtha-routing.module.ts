import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NishthaComponent } from './nishtha.component';           
const routes: Routes = [
    {
        path:'',
        component: NishthaComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NishthaRoutingModule { }