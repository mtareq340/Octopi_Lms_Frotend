import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiCoursesService } from '../../services/api-courses.service';
declare var $: any;
@Component({
  selector: 'app-upload-courses',
  templateUrl: './upload-courses.component.html',
  styleUrls: ['./upload-courses.component.scss']
})
export class UploadCoursesComponent {
  constructor(private toastr: ToastrService , private _ApiCoursesService:ApiCoursesService){}
  courseFormExcel = new FormGroup({});
  file:any = "";
  submitExcel(){
    $("#submitUpload").attr("disabled","true");
    $("#submitUpload").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    if(this.file == ""){
      $('#audio')[0].play();
      this.toastr.error('من فضلك إختر الإكسيل');
      $("#submitUpload").removeAttr("disabled");
      $("#submitUpload").html('إضافة');
    }else{
      const formData = new FormData();
      formData.append('file', this.file);
      this._ApiCoursesService.addExcel(formData).subscribe((res)=>{
        if(res.status == 1){
          $("#submitUpload").removeAttr("disabled");
          $("#submitUpload").html('إضافة');
          $("#closeUpload").trigger("click");
          $('#audio')[0].play();
          this.toastr.success('تمت الإضافة بنجاح');
        }
      });
    }
  }
  onFileSelect(files: any){
    this.file = files.target.files[0];
  }
  ngOnInit() {
    var self = this;
    $(document).ready(function () {
      "use strict";
      $("#file").on("change", function (e:any) {
          var files = $(self)[0].courseFormExcel;
          if (files.length >= 2) {
              $(".file_label").text(files.length + " Files Ready To Upload");
          } else {
              var fileName = e.target.value.split("\\").pop();
              $(".file_label").text(fileName);
          }
      });
  });
  }
}
