import { Component , Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { ApiCoursesService } from '../../services/api-courses.service';
import { ShowCoursesComponent } from '../show-courses/show-courses.component';
@Component({
  selector: 'app-update-courses',
  templateUrl: './update-courses.component.html',
  styleUrls: ['./update-courses.component.scss']
})
export class UpdateCoursesComponent {
  constructor( private toastr: ToastrService, private _ApiCoursesService: ApiCoursesService , private _ShowCoursesComponent:ShowCoursesComponent) { }
  @Input() courseForm = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    credit_hour: new FormControl("", [Validators.required]),
    code: new FormControl("", [Validators.required])
  });
  requiredFields =
    [
      "id",
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
  update(data: any) {
    $("#submitUpdate").attr("disabled", "true");
    $("#submitUpdate").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    if (!this.validate(data)) {
      this.courseForm.markAllAsTouched();
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع جميع المطلوب');
      $("#submitUpdate").removeAttr("disabled");
      $("#submitUpdate").html('تعديل');
    } else {
        this._ApiCoursesService.update(data).subscribe((res) => {
          if (res.status == 1) {
            let object = this._ShowCoursesComponent.courses.find((obj: any) => obj.id === data.id);
            let index = this._ShowCoursesComponent.courses.indexOf(object);
            this._ShowCoursesComponent.courses[index]=res.data;
            $("#submitUpdate").removeAttr("disabled");
            $("#submitUpdate").html('تعديل');
            $("#closeUpdate").trigger("click");
            $('#audio')[0].play();
            this.toastr.success('تم التعديل بنجاح');
            this.courseForm.reset();
          }else{
            $('#audio')[0].play();
            this.toastr.error(res.message);
            $("#submitUpdate").removeAttr("disabled");
            $("#submitUpdate").html('تعديل');
          }
        });
    }
  }
}
