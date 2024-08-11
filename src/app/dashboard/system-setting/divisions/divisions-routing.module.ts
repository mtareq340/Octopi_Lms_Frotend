import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowDivisionsComponent } from './components/show-divisions/show-divisions.component';

const routes: Routes = [
  {
    path:"",
    component:ShowDivisionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DivisionsRoutingModule { }
