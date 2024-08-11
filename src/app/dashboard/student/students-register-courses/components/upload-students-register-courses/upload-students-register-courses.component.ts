import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiStudentsRegisterCoursesService } from '../../services/api-students-register-courses.service';
declare var $: any;
import { ShowStudentsRegisterCoursesComponent } from '../show-students-register-courses/show-students-register-courses.component';
import { FormDataFile } from 'src/app/helper/form-data';
@Component({
  selector: 'app-upload-students-register-courses',
  templateUrl: './upload-students-register-courses.component.html',
  styleUrls: ['./upload-students-register-courses.component.scss']
})
export class UploadStudentsRegisterCoursesComponent {
  constructor(private toastr: ToastrService , private _ApiStudentsRegisterCoursesService:ApiStudentsRegisterCoursesService, private _ShowStudentsRegisterCoursesComponent:ShowStudentsRegisterCoursesComponent){}
  studentFormExcel = new FormGroup({});
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
      const data = FormDataFile.convertObjectToFormData({},this.file,'file');
      this._ApiStudentsRegisterCoursesService.addExcel(data).subscribe((res)=>{
        if(res.status == 1){
          $("#submitUpload").removeAttr("disabled");
          $("#submitUpload").html('إضافة');
          $("#closeUpload").trigger("click");
          $('#audio')[0].play();
          res.message.forEach((element: any) => {
            this.toastr.success(element, 'Success', { timeOut: 10000 });
          });
          if(res.data.dataRegistered.length > 0){
            this._ShowStudentsRegisterCoursesComponent.studentsRegisterCourses = res.data.dataRegistered;
          }
          if(res.data.dataNotRegistered.length > 0){
            FormDataFile.generateExcelFile(res.data.dataNotRegistered);
          }
          this.refreshdata();
        } else{
          res.message.forEach((element: any) => {
            this.toastr.error(element, 'Error', { timeOut: 10000 });
          });
          FormDataFile.generateExcelFile(res.data.res.data.dataNotRegistered);
          this.refreshdata();
        }
      });
    }
  }
  refreshdata(){
    this.file = '';
    $('#file').val('');
    $(".file_label").html('<i class="fa fa-upload" aria-hidden="true"></i> إختر الملف');
  }
  onFileSelect(files: any){
    this.file = files.target.files[0];
  }
  ngOnInit() {
    var self = this;
    $(document).ready(function () {
      "use strict";
      $("#file").on("change", function (e:any) {
          var files = $(self)[0].studentFormExcel;
          if (files.length >= 2) {
              $(".file_label").text(files.length + " Files Ready To Upload");
          } else {
              var fileName = e.target.value.split("\\").pop();
              if(fileName != ''){
                $(".file_label").text(fileName);
              }else{
                self.refreshdata();
              }
          }
      });
  });
  }
}
