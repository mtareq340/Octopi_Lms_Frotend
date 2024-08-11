import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiStudentsRegisterCoursesService } from '../../services/api-students-register-courses.service';
import { ShowStudentsRegisterCoursesComponent } from '../show-students-register-courses/show-students-register-courses.component';
declare var $:any;
@Component({
  selector: 'app-delete-students-register-courses',
  templateUrl: './delete-students-register-courses.component.html',
  styleUrls: ['./delete-students-register-courses.component.scss']
})
export class DeleteStudentsRegisterCoursesComponent {
  constructor( private toastr: ToastrService, private _ApiStudentsRegisterCoursesService: ApiStudentsRegisterCoursesService , private _ShowStudentsRegisterCoursesComponent:ShowStudentsRegisterCoursesComponent) { }
  FormDelete =new FormGroup({});
  @Input() studentsRegisterCourseId: any = "";
  delete(){
    $("#submitDelete").attr("disabled", "true");
    $("#submitDelete").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    if (this.studentsRegisterCourseId == "") {
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع إختر التسجيل');
      $("#submitDelete").removeAttr("disabled");
      $("#submitDelete").html('مسح');
    } else {
        var data = {id:this.studentsRegisterCourseId};
        this._ApiStudentsRegisterCoursesService.delete(data).subscribe((res) => {
          if (res.status == 1) {
            let object = this._ShowStudentsRegisterCoursesComponent.studentsRegisterCourses.find((obj: any) => obj.id === data.id);
            let index = this._ShowStudentsRegisterCoursesComponent.studentsRegisterCourses.indexOf(object);
            this._ShowStudentsRegisterCoursesComponent.studentsRegisterCourses.splice(index, 1);
            $("#submitDelete").removeAttr("disabled");
            $("#submitDelete").html('مسح');
            $("#closeDelete").trigger("click");
            $('#audio')[0].play();
            this.toastr.success('تم المسح بنجاح');
            this.studentsRegisterCourseId = "";
            this._ShowStudentsRegisterCoursesComponent.messageEmpty = true;
          } else{
            $('#audio')[0].play();
            this.toastr.error(res.message);
          }
        });
    }
  }
}
