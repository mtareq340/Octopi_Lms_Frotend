import { Component , Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { ApiStudentsResultsService } from '../../services/api-students-results.service';
import { ShowStudentsResultsComponent } from '../show-students-results/show-students-results.component';
@Component({
  selector: 'app-update-students-results',
  templateUrl: './update-students-results.component.html',
  styleUrls: ['./update-students-results.component.scss']
})
export class UpdateStudentsResultsComponent {
  constructor( private toastr: ToastrService, private _ApiStudentsResultsService: ApiStudentsResultsService , private _ShowStudentsResultsComponent:ShowStudentsResultsComponent) { }
  @Input() courses: any;
  @Input() loadCoursesEdit = false;
  @Input() studentsResultsForm = new FormGroup({
    id: new FormControl("", [Validators.required]),
    student_id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    mid_degree: new FormControl(""),
    final_degree: new FormControl(""),
    // amly_degree: new FormControl(""),
    work_year_degree: new FormControl(""),
    total_degree: new FormControl(""),
    gpa: new FormControl(""),
    gpa_word: new FormControl(""),
  });
  requiredFields =
    [
      "id",
      "student_id"
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
      this.studentsResultsForm.markAllAsTouched();
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع جميع المطلوب');
      $("#submitUpdate").removeAttr("disabled");
      $("#submitUpdate").html('تعديل');
    } else {
        this._ApiStudentsResultsService.update(data).subscribe((res) => {
          if (res.status == 1) {
            let object = this._ShowStudentsResultsComponent.studentsResults.find((obj: any) => obj.id === data.id);
            let index = this._ShowStudentsResultsComponent.studentsResults.indexOf(object);
            this._ShowStudentsResultsComponent.studentsResults[index]=res.data;
            $("#submitUpdate").removeAttr("disabled");
            $("#submitUpdate").html('تعديل');
            $("#closeUpdate").trigger("click");
            $('#audio')[0].play();
            this.toastr.success('تم التعديل بنجاح');
            this.studentsResultsForm.reset();
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
