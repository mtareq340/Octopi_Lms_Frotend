import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { ShowCoursesComponent } from './components/show-courses/show-courses.component';
import { SearchCoursesComponent } from './components/search-courses/search-courses.component';
import { CourseFilterPipe } from './pipes/course-filter.pipe';


@NgModule({
  declarations: [
    ShowCoursesComponent,
    SearchCoursesComponent,
    CourseFilterPipe
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
