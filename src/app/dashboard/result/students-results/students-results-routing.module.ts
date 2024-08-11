import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowStudentsResultsComponent } from './components/show-students-results/show-students-results.component';

const routes: Routes = [
  {
    path:"",
    component:ShowStudentsResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsResultsRoutingModule { }
