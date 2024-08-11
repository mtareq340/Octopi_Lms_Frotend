import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsRoutingModule } from './students-routing.module';
import { AddStudentsComponent } from './components/add-students/add-students.component';
import { SearchStudentsComponent } from './components/search-students/search-students.component';
import { ShowStudentsComponent } from './components/show-students/show-students.component';
import { UpdateStudentsComponent } from './components/update-students/update-students.component';
import { UploadStudentsComponent } from './components/upload-students/upload-students.component';
import { DeleteStudentComponent } from './components/delete-student/delete-student.component';
import { ExportStudentsComponent } from './components/export-students/export-students.component';
import { ActiveStudentsComponent } from './components/active-students/active-students.component';

@NgModule({
  declarations: [
    AddStudentsComponent,
    SearchStudentsComponent,
    ShowStudentsComponent,
    UpdateStudentsComponent,
    UploadStudentsComponent,
    DeleteStudentComponent,
    ExportStudentsComponent,
    ActiveStudentsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule
  ]
})
export class StudentsModule { }
