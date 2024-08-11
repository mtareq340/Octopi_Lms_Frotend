import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiDivisionsService } from '../../services/api-divisions.service';
import { ShowDivisionsComponent } from '../show-divisions/show-divisions.component';
declare var $:any;
@Component({
  selector: 'app-delete-divisions',
  templateUrl: './delete-divisions.component.html',
  styleUrls: ['./delete-divisions.component.scss']
})
export class DeleteDivisionsComponent {
  constructor( private toastr: ToastrService, private _ApiDivisionsService: ApiDivisionsService , private _ShowDivisionsComponent:ShowDivisionsComponent) { }
  FormDelete =new FormGroup({});
  @Input() divisionId: any = "";
  delete(){
    $("#submitDelete").attr("disabled", "true");
    $("#submitDelete").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    if (this.divisionId == "") {
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع إختر المقرر');
      $("#submitDelete").removeAttr("disabled");
      $("#submitDelete").html('مسح');
    } else {
        var data = {id:this.divisionId};
        this._ApiDivisionsService.delete(data).subscribe((res) => {
          if (res.status == 1) {
            let object = this._ShowDivisionsComponent.divisions.find((obj: any) => obj.id === data.id);
            let index = this._ShowDivisionsComponent.divisions.indexOf(object);
            this._ShowDivisionsComponent.divisions.splice(index, 1);
            $("#submitDelete").removeAttr("disabled");
            $("#submitDelete").html('مسح');
            $("#closeDelete").trigger("click");
            $('#audio')[0].play();
            this.toastr.success('تم المسح بنجاح');
            this.divisionId = "";
            this._ShowDivisionsComponent.messageEmpty = true;
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
