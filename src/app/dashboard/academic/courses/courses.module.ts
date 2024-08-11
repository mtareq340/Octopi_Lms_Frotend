import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { AddCoursesComponent } from './components/add-courses/add-courses.component';
import { DeleteCoursesComponent } from './components/delete-courses/delete-courses.component';
import { SearchCoursesComponent } from './components/search-courses/search-courses.component';
import { ShowCoursesComponent } from './components/show-courses/show-courses.component';
import { UpdateCoursesComponent } from './components/update-courses/update-courses.component';
import { UploadCoursesComponent } from './components/upload-courses/upload-courses.component';


@NgModule({
  declarations: [
    AddCoursesComponent,
    DeleteCoursesComponent,
    SearchCoursesComponent,
    ShowCoursesComponent,
    UpdateCoursesComponent,
    UploadCoursesComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
