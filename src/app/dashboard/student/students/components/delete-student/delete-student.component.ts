import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiStudentsService } from '../../services/api-students.service';
import { ShowStudentsComponent } from '../show-students/show-students.component';
declare var $:any;
@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.scss']
})
export class DeleteStudentComponent {
  constructor( private toastr: ToastrService, private _ApiStudentsService: ApiStudentsService , private _ShowStudentsComponent:ShowStudentsComponent) { }
  FormDelete =new FormGroup({});
  @Input() studentId: any = "";
  delete(){
    $("#submitDelete").attr("disabled", "true");
    $("#submitDelete").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    if (this.studentId == "") {
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع إختر العضو');
      $("#submitDelete").removeAttr("disabled");
      $("#submitDelete").html('مسح');
    } else {
        var data = {id:this.studentId};
        this._ApiStudentsService.delete(data).subscribe((res) => {
          if (res.status == 1) {
            let object = this._ShowStudentsComponent.students.find((obj: any) => obj.id === data.id);
            let index = this._ShowStudentsComponent.students.indexOf(object);
            this._ShowStudentsComponent.students.splice(index, 1);
            $("#submitDelete").removeAttr("disabled");
            $("#submitDelete").html('مسح');
            $("#closeDelete").trigger("click");
            $('#audio')[0].play();
            this.toastr.success('تم المسح بنجاح');
            this.studentId = "";
            this._ShowStudentsComponent.messageEmpty = true;
          } else{
            $('#audio')[0].play();
            this.toastr.error(res.message);
          }
        });
    }
  }
}
