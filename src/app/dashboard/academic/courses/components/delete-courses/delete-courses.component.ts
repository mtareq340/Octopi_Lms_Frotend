import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiCoursesService } from '../../services/api-courses.service';
import { ShowCoursesComponent } from '../show-courses/show-courses.component';
import { AllCourses } from 'src/app/dashboard/helper/all-courses';
declare var $:any;
@Component({
  selector: 'app-delete-courses',
  templateUrl: './delete-courses.component.html',
  styleUrls: ['./delete-courses.component.scss']
})
export class DeleteCoursesComponent {
  constructor( private toastr: ToastrService, private _ApiCoursesService: ApiCoursesService , private _ShowCoursesComponent:ShowCoursesComponent) { }
  FormDelete =new FormGroup({});
  @Input() courseId: any = "";
  delete(){
    $("#submitDelete").attr("disabled", "true");
    $("#submitDelete").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    if (this.courseId == "") {
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع إختر المقرر');
      $("#submitDelete").removeAttr("disabled");
      $("#submitDelete").html('مسح');
    } else {
        var data = {id:this.courseId};
        this._ApiCoursesService.delete(data).subscribe((res) => {
          if (res.status == 1) {
            let object = this._ShowCoursesComponent.courses.find((obj: any) => obj.id === data.id);
            let index = this._ShowCoursesComponent.courses.indexOf(object);
            this._ShowCoursesComponent.courses.splice(index, 1);
            if(AllCourses.Courses != 0){
              let objectDelete = AllCourses.Courses.find((obj: any) => obj.id == data.id);
              let indexDelete = AllCourses.Courses.indexOf(objectDelete);
              AllCourses.Courses.splice(indexDelete, 1);
            }
            $("#submitDelete").removeAttr("disabled");
            $("#submitDelete").html('مسح');
            $("#closeDelete").trigger("click");
            $('#audio')[0].play();
            this.toastr.success('تم المسح بنجاح');
            this.courseId = "";
            this._ShowCoursesComponent.messageEmpty = true;
          } else{
            $("#submitDelete").removeAttr("disabled");
            $("#submitDelete").html('مسح');
            $("#closeDelete").trigger("click");
            $('#audio')[0].play();
            this.toastr.error(res.message);
          }
        });
    }
  }
}
