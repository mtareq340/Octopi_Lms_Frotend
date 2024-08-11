import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardDashboardService } from '../services/auth-guard-dashboard.service';
import { ResultComponent } from './result.component';

const routes: Routes = [
  {
    path:"",
    component:ResultComponent,
    canActivate:[AuthGuardDashboardService],
    data:{name:"Result"}
  },
  {
    path:"studentsResults",
    canActivate:[AuthGuardDashboardService],
    data:{name:"show_studentsResults"},
    loadChildren:()=>import("./students-results/students-results.module").then(b=>b.StudentsResultsModule)
  }
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
