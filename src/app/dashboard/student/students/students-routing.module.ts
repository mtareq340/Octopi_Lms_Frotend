import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowStudentsComponent } from './components/show-students/show-students.component';
import { AddStudentsComponent } from './components/add-students/add-students.component';
import { UpdateStudentsComponent } from './components/update-students/update-students.component';

const routes: Routes = [
  {
    path:"",
    component:ShowStudentsComponent
  },
  {
    path:"add",
    component:AddStudentsComponent
  },
  {
    path:"update",
    component:UpdateStudentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
