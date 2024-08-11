import { Component } from '@angular/core';
import { ApiCoursesService } from '../../services/api-courses.service';
import { ShowCoursesComponent } from '../show-courses/show-courses.component';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/helper/user';
import { FormGroup } from '@angular/forms';
import { CoursesStudent } from '../../../helper/courses-student';
@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.scss']
})
export class SearchCoursesComponent {
  courseForm = new FormGroup({});
  constructor(private _ApiCoursesService:ApiCoursesService , private _ShowCoursesComponent:ShowCoursesComponent , private toastr: ToastrService){
    if(CoursesStudent.Courses != 0){
      this._ShowCoursesComponent.courses = CoursesStudent.Courses;
    }else{
      this._ShowCoursesComponent.paramsLoadData = true;
      this._ApiCoursesService.getCoursesStudent(User.GetUser().id).subscribe((res)=>{
        if(res.status == 1){
          this._ShowCoursesComponent.paramsLoadData = false;
          this._ShowCoursesComponent.courses = res.data;
          CoursesStudent.Courses = res.data;
        } else{
          this._ShowCoursesComponent.paramsLoadData = false;
          this.toastr.error(res.message);
        }
      })
    }
  }
  search(value: any){
    this._ShowCoursesComponent.searchKey = value;
  }
}
