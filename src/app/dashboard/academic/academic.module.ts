import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AcademicRoutingModule } from './academic-routing.module';
import { AcademicComponent } from './academic.component';

@NgModule({
  declarations: [
    AcademicComponent
  ],
  imports: [
    CommonModule,
    AcademicRoutingModule,
    SharedModule
  ]
})
export class AcademicModule { }
