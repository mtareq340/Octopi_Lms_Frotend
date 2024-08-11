import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/helper/user';
import { ApiProfileSettingService } from '../../services/api-profile-setting.service';
declare var $: any;
@Component({
  selector: 'app-show-profile-setting',
  templateUrl: './show-profile-setting.component.html',
  styleUrls: ['./show-profile-setting.component.scss']
})
export class ShowProfileSettingComponent {
  constructor(private toastr: ToastrService,private _ApiProfileSettingService:ApiProfileSettingService) { }
  passwordForm = new FormGroup({
    current_password: new FormControl("", [Validators.required]),
    new_password: new FormControl("", [Validators.required]),
    confirm_new_password: new FormControl("", [Validators.required])
  });
  requiredFields =
    [
      "current_password",
      "new_password",
      "confirm_new_password"
    ];
    validate(data: any) {
      let valid = true;
      this.requiredFields.forEach(element => {
        if (!data[element])
          valid = false;
      });
      return valid;
    }
  updatePassword(data: any) {
    $("#submitupdatePassword").attr("disabled", "true");
    $("#submitupdatePassword").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    if (!this.validate(data)) {
      this.passwordForm.markAllAsTouched();
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع جميع المطلوب');
      $("#submitupdatePassword").removeAttr("disabled");
      $("#submitupdatePassword").html('تعديل');
    } else {
      if(data.new_password != data.confirm_new_password){
        $('#audio')[0].play();
        this.toastr.error('تأكيد كلمة المرور غير متطابقة');
        $("#submitupdatePassword").removeAttr("disabled");
        $("#submitupdatePassword").html('تعديل');
        return;
      }
      data.role_id = User.GetUser().role_id;
      this._ApiProfileSettingService.updatePassword(data , User.GetUser().id).subscribe((res) => {
        if (res.status == 1) {
          $("#submitupdatePassword").removeAttr("disabled");
          $("#submitupdatePassword").html('تعديل');
          $('#audio')[0].play();
          this.toastr.success('تم التعديل بنجاح');
          this.passwordForm.reset();
        } else {
          $('#audio')[0].play();
          this.toastr.error(res.message);
          $("#submitupdatePassword").removeAttr("disabled");
          $("#submitupdatePassword").html('تعديل');
        }
      });
    }
  }

}
