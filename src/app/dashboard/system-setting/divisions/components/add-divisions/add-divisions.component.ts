import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { ApiDivisionsService } from '../../services/api-divisions.service';
import { ShowDivisionsComponent } from '../show-divisions/show-divisions.component';
@Component({
  selector: 'app-add-divisions',
  templateUrl: './add-divisions.component.html',
  styleUrls: ['./add-divisions.component.scss']
})
export class AddDivisionsComponent {
  constructor(private toastr: ToastrService, private _ApiDivisionsService: ApiDivisionsService , private _ShowDivisionsComponent:ShowDivisionsComponent) { }
  @Input() divisionsTypes: any;
  divisionForm = new FormGroup({
    name: new FormControl("", [Validators.required])
  });
  requiredFields =
    [
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
  insert(data: any) {
    $("#submitAdd").attr("disabled", "true");
    $("#submitAdd").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    if (!this.validate(data)) {
      this.divisionForm.markAllAsTouched();
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع جميع المطلوب');
      $("#submitAdd").removeAttr("disabled");
      $("#submitAdd").html('إضافة');
    } else {
        this._ApiDivisionsService.add(data).subscribe((res) => {
          if (res.status == 1) {
            this._ShowDivisionsComponent.divisions.unshift(res.data);
            $("#submitAdd").removeAttr("disabled");
            $("#submitAdd").html('إضافة');
            $("#closeAdd").trigger("click");
            $('#audio')[0].play();
            this.toastr.success('تمت الإضافة بنجاح');
            this.divisionForm.reset();
          } else{
            $('#audio')[0].play();
            this.toastr.error(res.message);
            $("#submitAdd").removeAttr("disabled");
            $("#submitAdd").html('إضافة');
          }
        });
    }
  }
}
