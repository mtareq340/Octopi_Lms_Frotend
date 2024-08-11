import { Component , Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { ApiDivisionsService } from '../../services/api-divisions.service';
import { ShowDivisionsComponent } from '../show-divisions/show-divisions.component';
@Component({
  selector: 'app-update-divisions',
  templateUrl: './update-divisions.component.html',
  styleUrls: ['./update-divisions.component.scss']
})
export class UpdateDivisionsComponent {
  constructor( private toastr: ToastrService, private _ApiDivisionsService: ApiDivisionsService , private _ShowDivisionsComponent:ShowDivisionsComponent) { }
  @Input() divisionsTypes: any;
  @Input() divisionForm = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required])
  });
  requiredFields =
    [
      "id",
      "name"
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
      this.divisionForm.markAllAsTouched();
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع جميع المطلوب');
      $("#submitUpdate").removeAttr("disabled");
      $("#submitUpdate").html('تعديل');
    } else {
        this._ApiDivisionsService.update(data).subscribe((res) => {
          if (res.status == 1) {
            let object = this._ShowDivisionsComponent.divisions.find((obj: any) => obj.id === data.id);
            let index = this._ShowDivisionsComponent.divisions.indexOf(object);
            this._ShowDivisionsComponent.divisions[index]=res.data;
            $("#submitUpdate").removeAttr("disabled");
            $("#submitUpdate").html('تعديل');
            $("#closeUpdate").trigger("click");
            $('#audio')[0].play();
            this.toastr.success('تم التعديل بنجاح');
            this.divisionForm.reset();
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
