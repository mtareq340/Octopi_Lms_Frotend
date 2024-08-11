import { Component , Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { ApiStudentsRegisterCoursesService } from '../../services/api-students-register-courses.service';
import { ShowStudentsRegisterCoursesComponent } from '../show-students-register-courses/show-students-register-courses.component';
@Component({
  selector: 'app-update-students-register-courses',
  templateUrl: './update-students-register-courses.component.html',
  styleUrls: ['./update-students-register-courses.component.scss']
})
export class UpdateStudentsRegisterCoursesComponent {
  constructor( private toastr: ToastrService, private _ApiStudentsRegisterCoursesService: ApiStudentsRegisterCoursesService , private _ShowStudentsRegisterCoursesComponent:ShowStudentsRegisterCoursesComponent) { }
  @Input() courses: any;
  @Input() loadCoursesEdit = false;
  @Input() studentsRegisterCourseForm = new FormGroup({
    id: new FormControl("", [Validators.required]),
    student_id: new FormControl("", [Validators.required]),
    regulation_course_id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required])
  });
  requiredFields =
    [
      "id",
      "student_id",
      "regulation_course_id",
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
      this.studentsRegisterCourseForm.markAllAsTouched();
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع جميع المطلوب');
      $("#submitUpdate").removeAttr("disabled");
      $("#submitUpdate").html('تعديل');
    } else {
        this._ApiStudentsRegisterCoursesService.update(data).subscribe((res) => {
          if (res.status == 1) {
            let object = this._ShowStudentsRegisterCoursesComponent.studentsRegisterCourses.find((obj: any) => obj.id === data.id);
            let index = this._ShowStudentsRegisterCoursesComponent.studentsRegisterCourses.indexOf(object);
            this._ShowStudentsRegisterCoursesComponent.studentsRegisterCourses[index]=res.data;
            $("#submitUpdate").removeAttr("disabled");
            $("#submitUpdate").html('تعديل');
            $("#closeUpdate").trigger("click");
            $('#audio')[0].play();
            this.toastr.success('تم التعديل بنجاح');
            this.studentsRegisterCourseForm.reset();
          }else{
            $('#audio')[0].play();
            this.toastr.error(res.message);
            $("#submitUpdate").removeAttr("disabled");
            $("#submitUpdate").html('تعديل');
          }
        });
    }
  }
  ngOnInit(){
    $('.mySelect2_regulation_course_id_edit').select2({
      dir:'rtl',
      placeholder: 'جاري تحميل البيانات.....'
    }).on('change', (event: any) => {
      var selectedValue = event.target.value;
      if(selectedValue == 0){selectedValue = ''}
      var objectArray = JSON.parse(selectedValue.replace(/'/g, "\""));
      this.studentsRegisterCourseForm.controls['regulation_course_id'].setValue(objectArray);
    });
  }
}
