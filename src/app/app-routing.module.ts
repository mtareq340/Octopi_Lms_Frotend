import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardLoginService } from './services/auth-guard-login.service';
import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [
  {
    path:"",
    loadChildren:()=>import("./auth/auth.module").then(b=>b.AuthModule)
  },
  {
    path:"dashboard",
    canActivate: [AuthGuardService],
    children: [
      {
        path:"",
        loadChildren:()=>import("./dashboard/dashboard.module").then(b=>b.DashboardModule)
      }
    ]
  },
  {
    path:"login",
    canActivate: [AuthGuardLoginService],
    loadChildren:()=>import("./auth/auth.module").then(b=>b.AuthModule)
  },
  {
    path:"**",
    loadChildren:()=>import("./notfound/notfound.module").then(b=>b.NotfoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
