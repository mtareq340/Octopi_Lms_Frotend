import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './dashboard.component';
import { AuthGuardDashboardService } from './services/auth-guard-dashboard.service';

const routes: Routes = [
  {
    path:"",
    component:DashboardComponent,
    children:[
      {
        path:"",
        component:MainComponent,
      },
      {
        path:"Academic",
        canActivate: [AuthGuardDashboardService],
        data:{name:"Academic"},
        loadChildren:()=>import("./academic/academic.module").then(b=>b.AcademicModule)
      },
      {
        path:"Student",
        canActivate: [AuthGuardDashboardService],
        data:{name:"Student"},
        loadChildren:()=>import("./student/student.module").then(b=>b.StudentModule)
      },
      {
        path:"MainSetting",
        canActivate: [AuthGuardDashboardService],
        data:{name:"MainSetting"},
        loadChildren:()=>import("./system-setting/system-setting.module").then(b=>b.SystemSettingModule)
      },
      {
        path:"ProfileSetting",
        canActivate: [AuthGuardDashboardService],
        data:{name:"ProfileSetting"},
        loadChildren:()=>import("./profile-setting/profile-setting.module").then(b=>b.ProfileSettingModule)
      },
      {
        path:"Result",
        canActivate: [AuthGuardDashboardService],
        data:{name:"Result"},
        loadChildren:()=>import("./result/result.module").then(b=>b.ResultModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
