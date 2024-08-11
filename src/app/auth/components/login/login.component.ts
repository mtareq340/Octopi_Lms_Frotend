import { Component } from '@angular/core';
import { FormControl , FormGroup , Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiAuthService } from '../../services/api-auth.service';
import { Router } from '@angular/router';
import { ApiToken } from 'src/app/helper/api-token';
import { Permissions } from 'src/app/helper/permissions';
import { User } from 'src/app/helper/user';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private toastr: ToastrService,private _ApiAuthService:ApiAuthService , private _Router:Router) {}
  login = new FormGroup({
    username: new FormControl('' , [Validators.required]),
    password: new FormControl('' , [Validators.required,Validators.minLength(6)])
  });
  requiredFields=
  [
    "password",
    "username"
  ];
  validate(data:any) {
    let valid = true;
    this.requiredFields.forEach(element => {
      if (!data[element])
        valid = false;
    });
    return valid;
  }
  Login(data:object){
    $("#submit").attr("disabled","true");
    $("#submit").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    if (!this.validate(data)) {
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع جميع المطلوب');
      $("#submit").removeAttr("disabled");
      $("#submit").html('تسجيل الدخول');
    }
    else{
      this._ApiAuthService.login(data).subscribe((res)=>{
        if(res.status == 1){
          ApiToken.SetApiTokenUser(res.data.api_token);
          Permissions.SetUserPermissions(res.data.permissions);
          var object:any = {name:res.data.name,id:res.data.id,academic_term_id:res.data.academic_term_id,academic_year_id: res.data.academic_year_id,role_name:res.data.role_name,role_id:res.data.role_id};
          if(res.data.role_id == 3){object.division_id = res.data.division_id;}
          User.SetUser(object);
          this._Router.navigate(['/dashboard']);
        } else{
          $('#audio')[0].play();
          this.toastr.error(res.message);
          $("#submit").removeAttr("disabled");
          $("#submit").html('تسجيل الدخول');
        }
      });
    }
  }
  forgetPassword(){
    $('#audio')[0].play();
    this.toastr.error('من فضلك قم بإرسال أسم المستخدم بإيميل رسمي وسيتم التواصل معك علي الفور');
  }
  ngOnInit() {
    $("#togglePassword").on("click", function (e:any) {
      const type = $("#id_password").attr("type") === "password" ? "text" : "password";
      $("#id_password").attr("type", type);
      $("#togglePassword").toggleClass("fa-eye-slash");
    });
  }
}
