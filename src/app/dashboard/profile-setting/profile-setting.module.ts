import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileSettingRoutingModule } from './profile-setting-routing.module';
import { ShowProfileSettingComponent } from './components/show-profile-setting/show-profile-setting.component';


@NgModule({
  declarations: [
    ShowProfileSettingComponent
  ],
  imports: [
    CommonModule,
    ProfileSettingRoutingModule,
    SharedModule
  ]
})
export class ProfileSettingModule { }
