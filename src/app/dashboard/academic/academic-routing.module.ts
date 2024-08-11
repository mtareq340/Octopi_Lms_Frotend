import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardDashboardService } from '../services/auth-guard-dashboard.service';
import { AcademicComponent } from './academic.component';

const routes: Routes = [
  {
    path:"",
    component:AcademicComponent,
    canActivate:[AuthGuardDashboardService],
    data:{name:"Academic"}
  },
  {
    path:"courses",
    canActivate:[AuthGuardDashboardService],
    data:{name:"show_courses"},
    loadChildren:()=>import("./courses/courses.module").then(b=>b.CoursesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicRoutingModule { }
