import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowStudentsRegisterCoursesComponent } from './components/show-students-register-courses/show-students-register-courses.component';

const routes: Routes = [
  {
    path:"",
    component:ShowStudentsRegisterCoursesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRegisterCoursesRoutingModule { }
