import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsRegisterCoursesRoutingModule } from './students-register-courses-routing.module';
import { AddStudentsRegisterCoursesComponent } from './components/add-students-register-courses/add-students-register-courses.component';
import { DeleteStudentsRegisterCoursesComponent } from './components/delete-students-register-courses/delete-students-register-courses.component';
import { SearchStudentsRegisterCoursesComponent } from './components/search-students-register-courses/search-students-register-courses.component';
import { ShowStudentsRegisterCoursesComponent } from './components/show-students-register-courses/show-students-register-courses.component';
import { UpdateStudentsRegisterCoursesComponent } from './components/update-students-register-courses/update-students-register-courses.component';
import { UploadStudentsRegisterCoursesComponent } from './components/upload-students-register-courses/upload-students-register-courses.component';


@NgModule({
  declarations: [
    AddStudentsRegisterCoursesComponent,
    DeleteStudentsRegisterCoursesComponent,
    SearchStudentsRegisterCoursesComponent,
    ShowStudentsRegisterCoursesComponent,
    UpdateStudentsRegisterCoursesComponent,
    UploadStudentsRegisterCoursesComponent
  ],
  imports: [
    CommonModule,
    StudentsRegisterCoursesRoutingModule,
    SharedModule
  ]
})
export class StudentsRegisterCoursesModule { }
