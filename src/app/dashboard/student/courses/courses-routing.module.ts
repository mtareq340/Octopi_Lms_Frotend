import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowCoursesComponent } from './components/show-courses/show-courses.component';

const routes: Routes = [
  {
    path:"",
    component:ShowCoursesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
