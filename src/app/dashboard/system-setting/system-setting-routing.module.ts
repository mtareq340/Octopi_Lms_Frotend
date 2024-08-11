import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardDashboardService } from '../services/auth-guard-dashboard.service';
import { SystemSettingComponent } from './system-setting.component';
const routes: Routes = [
  {
    path:"",
    component:SystemSettingComponent,
    canActivate:[AuthGuardDashboardService],
    data:{name:"MainSetting"}
  },
  {
    path:"division",
    canActivate:[AuthGuardDashboardService],
    data:{name:"show_divisions"},
    loadChildren:()=>import("./divisions/divisions.module").then(b=>b.DivisionsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingRoutingModule { }
