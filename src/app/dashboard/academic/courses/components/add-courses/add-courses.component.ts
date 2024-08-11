import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { ApiCoursesService } from '../../services/api-courses.service';
import { ShowCoursesComponent } from '../show-courses/show-courses.component';
import { AllCourses } from 'src/app/dashboard/helper/all-courses';
import { CrudData } from 'src/app/helper/crud-data';
@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.scss']
})
export class AddCoursesComponent {
  constructor(private toastr: ToastrService, private _ApiCoursesService: ApiCoursesService , private _ShowCoursesComponent:ShowCoursesComponent) { }
  courseForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    credit_hour: new FormControl("", [Validators.required]),
    code: new FormControl("", [Validators.required]),
  });
  requiredFields =
    [
      "name",
      "credit_hour",
      "code"
    ];
  validate(data: any) {
    let valid = true;
    this.requiredFields.forEach(element => {
      if (!data[element])
        valid = false;
    });
    return valid;
  }
  insert(data: any) {
    $("#submitAdd").attr("disabled", "true");
    $("#submitAdd").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    if (!this.validate(data)) {
      this.courseForm.markAllAsTouched();
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع جميع المطلوب');
      $("#submitAdd").removeAttr("disabled");
      $("#submitAdd").html('إضافة');
    } else {
        var SendData = CrudData.search(data);
        this._ApiCoursesService.add(SendData).subscribe((res) => {
          if (res.status == 1) {
            this._ShowCoursesComponent.courses.unshift(res.data);
            if(AllCourses.Courses != 0){AllCourses.Courses.unshift(res.data);}
            $("#submitAdd").removeAttr("disabled");
            $("#submitAdd").html('إضافة');
            $("#closeAdd").trigger("click");
            $('#audio')[0].play();
            this.toastr.success('تمت الإضافة بنجاح');
            this.courseForm.reset();
          } else{
            $('#audio')[0].play();
            this.toastr.error(res.message);
            $("#submitAdd").removeAttr("disabled");
            $("#submitAdd").html('إضافة');
          }
        });
    }
  }
}
