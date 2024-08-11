import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemSettingComponent } from './system-setting.component';
import { SystemSettingRoutingModule } from './system-setting-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    SystemSettingComponent
  ],
  imports: [
    CommonModule,
    SystemSettingRoutingModule,
    SharedModule
  ]
})
export class SystemSettingModule { }
