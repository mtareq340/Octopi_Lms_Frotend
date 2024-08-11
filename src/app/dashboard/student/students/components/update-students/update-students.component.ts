import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiStudentsService } from '../../services/api-students.service';
import { MainSetting } from 'src/app/helper/main-setting';
import { User } from 'src/app/helper/user';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-update-students',
  templateUrl: './update-students.component.html',
  styleUrls: ['./update-students.component.scss']
})
export class UpdateStudentsComponent {
  levels: any = [];
  divisions: any = [];
  constructor(private toastr: ToastrService,private _ApiStudentsService: ApiStudentsService, private route: ActivatedRoute){
    if(MainSetting.levels.length == 0){
      this._ApiStudentsService.getLevels().subscribe((res)=>{
        if(res.status == 1){
          this.levels = res.data;
          MainSetting.levels = res.data;
        }
      })
    }else{
      this.levels = MainSetting.levels;
    }
    if(MainSetting.divisions.length == 0){
      this._ApiStudentsService.getDivision().subscribe((res)=>{
        if(res.status == 1){
          this.divisions = res.data;
          MainSetting.divisions = res.data;
        }
      })
    }else{
      this.divisions = MainSetting.divisions;
    }
    this.route.queryParams.subscribe((params: any) => {
      const data = params.data;
      const keyValuePairs = data.split('&');
      const myObject: any = {};
      keyValuePairs.forEach((keyValuePair: any) => {
        const [key, value] = keyValuePair.split('=');
        const decodedValue = decodeURIComponent(value.replace(/\+/g, ' '));
        myObject[key] = decodedValue;
      });
      this.studentForm.patchValue(myObject, { emitEvent: true, onlySelf: false });
    });
  }
  studentForm = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    code: new FormControl("", [Validators.required]),
    phone: new FormControl(""),
    national_id: new FormControl("", [Validators.required]),
    level_id: new FormControl("", [Validators.required]),
    division_id: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email])
  });
  requiredFields =
    [
      "id",
      "name",
      "code",
      "national_id",
      "level_id",
      "division_id"
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
      this.studentForm.markAllAsTouched();
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع جميع المطلوب');
      $("#submitUpdate").removeAttr("disabled");
      $("#submitUpdate").html('تعديل');
    } else {
      // data.user_id = User.GetUser().id;
      data.academic_year_id = User.GetUser().academic_year_id;
      data.academic_term_id = User.GetUser().academic_term_id;
        this._ApiStudentsService.update(data , data.id).subscribe((res) => {
          if (res.status == 1) {
            // this._ShowstudentsComponent.students.unshift(res.data);
            $("#submitUpdate").removeAttr("disabled");
            $("#submitUpdate").html('تعديل');
            $("#closeAdd").trigger("click");
            $('#audio')[0].play();
            this.toastr.success('تمت التعديل بنجاح');
          } else{
            $('#audio')[0].play();
            this.toastr.error(res.message);
            $("#submitUpdate").removeAttr("disabled");
            $("#submitUpdate").html('تعديل');
          }
        });
    }
  }
  ngOnInit(){
    $('.InputNumber').keypress(function(event: any) {
      var keyCode = event.which;
      if (keyCode === 8 || keyCode === 46 || keyCode === 9 || (keyCode >= 37 && keyCode <= 40)) {
        return;
      }
      else if (keyCode < 48 || keyCode > 57) {
        event.preventDefault();
      }
    });
  }

}
