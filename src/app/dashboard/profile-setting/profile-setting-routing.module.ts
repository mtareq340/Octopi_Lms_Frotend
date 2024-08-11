import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowProfileSettingComponent } from './components/show-profile-setting/show-profile-setting.component';

const routes: Routes = [
  {
    path:'',
    component:ShowProfileSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileSettingRoutingModule { }
