import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardDashboardService } from '../services/auth-guard-dashboard.service';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {
    path:"",
    component:StudentComponent,
    canActivate:[AuthGuardDashboardService],
    data:{name:"student_affairs"}
  },
  {
    path:"students",
    canActivate:[AuthGuardDashboardService],
    data:{name:"show_students"},
    loadChildren:()=>import("./students/students.module").then(b=>b.StudentsModule)
  },
  {
    path:"studentsRegisterCourses",
    canActivate:[AuthGuardDashboardService],
    data:{name:"show_studentsRegisterCourses"},
    loadChildren:()=>import("./students-register-courses/students-register-courses.module").then(b=>b.StudentsRegisterCoursesModule)
  },
  {
    path:"studentCourses",
    canActivate:[AuthGuardDashboardService],
    data:{name:"show_studentCourses"},
    loadChildren:()=>import("./courses/courses.module").then(b=>b.CoursesModule)
  },
  {
    path:"studentResults",
    canActivate:[AuthGuardDashboardService],
    data:{name:"show_studentResults"},
    loadChildren:()=>import("./results/results.module").then(b=>b.ResultsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
