import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsResultsRoutingModule } from './students-results-routing.module';
import { ShowStudentsResultsComponent } from './components/show-students-results/show-students-results.component';
import { SearchStudentsResultsComponent } from './components/search-students-results/search-students-results.component';
import { UploadStudentsResultsComponent } from './components/upload-students-results/upload-students-results.component';
import { ExportStudentsResultsComponent } from './components/export-students-results/export-students-results.component';
import { UpdateStudentsResultsComponent } from './components/update-students-results/update-students-results.component';

@NgModule({
  declarations: [
    ShowStudentsResultsComponent,
    SearchStudentsResultsComponent,
    UploadStudentsResultsComponent,
    ExportStudentsResultsComponent,
    UpdateStudentsResultsComponent
  ],
  imports: [
    CommonModule,
    StudentsResultsRoutingModule,
    SharedModule
  ]
})
export class StudentsResultsModule { }
