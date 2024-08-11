import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $:any;
import { ApiStudentsService } from '../../services/api-students.service';
import { ShowStudentsComponent } from '../show-students/show-students.component';
import { ToastrService } from 'ngx-toastr';
import { MainSetting } from 'src/app/helper/main-setting';
import { FormDataFile } from 'src/app/helper/form-data';
@Component({
  selector: 'app-active-students',
  templateUrl: './active-students.component.html',
  styleUrls: ['./active-students.component.scss']
})
export class ActiveStudentsComponent {
  fileActive:any = "";
  levels: any = [];
  divisions: any = [];
  optionsActive = false;
  optionsClickedActive: boolean = false;
  activeTextLaterActive: any;
  nameActive= '';
  studentsActive: any;
  activeValue: any;
  loadActive = false;
  constructor(private _ApiStudentsService:ApiStudentsService , private _ShowStudentsComponent:ShowStudentsComponent , private toastr: ToastrService){
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
  }
  requiredFields =
    [
      "active"
    ];
  validate(data: any) {
    let valid = true;
    this.requiredFields.forEach(element => {
      if (!data[element])
        valid = false;
    });
    return valid;
  }
  studentFormActive = new FormGroup({
    student_id: new FormControl(""),
    level_id: new FormControl(""),
    division_id: new FormControl(""),
    active: new FormControl("", [Validators.required])
  });
  studentFormActiveExcel = new FormGroup({
    active: new FormControl("", [Validators.required])
  });
  active(data:any){
    $("#submitActive, #activeModal, .loadDataActive").attr("disabled","true");
    $("#submitActive, #activeModal, .loadDataActive").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    if (!this.validate(data)) {
      this.studentFormActive.markAllAsTouched();
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع جميع المطلوب');
      $("#submitActive, #activeModal, .loadDataActive").removeAttr("disabled");
        $("#submitActive").html('تأكيد');
        $("#activeModal").html('<i class="fas fa-active"></i>');
    } else {
    this._ApiStudentsService.active(data).subscribe((res)=>{
      if(res.status == 1){
        $("#submitActive, #activeModal, .loadDataActive").removeAttr("disabled");
        $("#submitActive").html('تأكيد');
        $("#activeModal").html('<i class="fas fa-active"></i>');
        $("#closeActive").trigger("click");
        $('#audio')[0].play();
        this.toastr.success('تمت العملية بنجاح');
        this.studentFormActive.reset({
          student_id:"",
          level_id:"",
          division_id:"",
          active:""
        });
        this.nameActive= '';
        this._ShowStudentsComponent.students = [];
        this._ShowStudentsComponent.messageEmpty = false;
        this._ShowStudentsComponent.paramsLoadData = false;

      } else{
        $('#audio')[0].play();
        this.toastr.error(res.message);
      }
    });
  }
  }
  handleFocusActive(target : any){
    this.optionsActive = true;
    if(target.value){
      this.getStudentActive(target);
    }
  }
  handleBlurActive() {
    if (!this.optionsClickedActive) {
      this.optionsActive = false;
    }
  }
  setOptionsClickedActive(clicked: boolean) {
    this.optionsClickedActive = clicked;
  }
  setDataStudentActive(id: any , name: any){
    this.studentFormActive.controls['student_id'].setValue(id);
    this.nameActive = name;
    this.optionsActive = false;
    this.studentsActive = [];
  }
  getStudentActive(target : any){
    this.activeValue = target.value;
    this.studentFormActive.controls['student_id'].setValue("");
    this.optionsActive = true;
    if(this.loadActive){
      this.activeTextLaterActive = target.value;
      return;
    }
    this.loadActive = true;
    const activeText = target.value;
    this.ActionApiGetStudentActive(activeText);
  }
  ActionApiGetStudentActive(activeText: any){
    this._ApiStudentsService.getStudents({searchKey:activeText}).subscribe((res)=>{
      if(res.status == 1){
        this.studentsActive = res.data;
        if(this.activeTextLaterActive){
          this.ActionApiGetStudentActive(this.activeTextLaterActive);
          this.activeTextLaterActive = '';
        }else{
          this.loadActive = false;
        }
      }
    })
  }
  onFileActiveSelect(files: any){
    this.fileActive = files.target.files[0];
  }
  submitExcelActive(dataForm: any){
    $("#submitUploadActive").attr("disabled","true");
    $("#submitUploadActive").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    if(this.fileActive == "" || !this.validate(dataForm)){
      this.studentFormActiveExcel.markAllAsTouched();
      $('#audio')[0].play();
      this.toastr.error('من فضلك ضع جميع البيانات');
      $("#submitUploadActive").removeAttr("disabled");
      $("#submitUploadActive").html('تأكيد');
    }else{
      const dataActive = FormDataFile.convertObjectToFormData(dataForm,this.fileActive,'file');
      this._ApiStudentsService.addExcelActive(dataActive).subscribe((res)=>{
        if(res.status == 1){
          $("#submitUploadActive").removeAttr("disabled");
          $("#submitUploadActive").html('تأكيد');
          $("#closeUploadActive").trigger("click");
          $('#audio')[0].play();
          res.message.forEach((element: any) => {
            this.toastr.success(element, 'Success', { timeOut: 10000 });
          });
          this._ShowStudentsComponent.students = [];
          this._ShowStudentsComponent.messageEmpty = false;
          this.studentFormActiveExcel.reset({
            active:""
          });
          if(res.data.dataNotUpdated.length > 0){
            FormDataFile.generateExcelFile(res.data.dataNotUpdated);
          }
          this.refreshdataActive();
        } else{
          res.message.forEach((element: any) => {
            this.toastr.error(element, 'Error', { timeOut: 10000 });
          });
          FormDataFile.generateExcelFile(res.data.res.data.dataNotUpdated);
          this.refreshdataActive();
        }
      });
    }
  }
  refreshdataActive(){
    this.fileActive = '';
    $('#fileActive').val('');
    $(".file_active_label").html('<i class="fa fa-upload" aria-hidden="true"></i> إختر الملف');
  }
  ngOnInit(){
    var thing = this;
    $('#exampleModal').on('show.bs.modal', function (event:any) {
      var button = $(event.relatedTarget)
      var recipient = button.data('whatever')
      var modal = $(thing)
      modal.find('.modal-title').text('New message to ' + recipient)
      modal.find('.modal-body input').val(recipient)
    })
    var selfActive = this;
    $(document).ready(function () {
      "use strict";
      $("#fileActive").on("change", function (e:any) {
          var filesActive = $(selfActive)[0].studentFormActiveExcel;
          if (filesActive.length >= 2) {
              $(".file_active_label").text(filesActive.length + " Files Ready To Upload");
          } else {
              var fileName = e.target.value.split("\\").pop();
              if(fileName != ''){
                $(".file_active_label").text(fileName);
              }else{
                selfActive.refreshdataActive();
              }
          }
      });
  });
  }
}
