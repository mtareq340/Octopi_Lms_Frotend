import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsDirective } from './directives/permissions.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderModuleDashboardComponent } from './components/header-module-dashboard/header-module-dashboard.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
@NgModule({
  declarations: [
    PermissionsDirective,
    HeaderModuleDashboardComponent,
    SafeHtmlPipe
  ],
  exports: [
    PermissionsDirective,
    ReactiveFormsModule,
    HeaderModuleDashboardComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
