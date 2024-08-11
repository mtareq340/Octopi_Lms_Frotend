import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $:any;
import { ApiStudentsService } from '../../services/api-students.service';
import { ShowStudentsComponent } from '../show-students/show-students.component';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/helper/pagination';
import { MainSetting } from 'src/app/helper/main-setting';
@Component({
  selector: 'app-search-students',
  templateUrl: './search-students.component.html',
  styleUrls: ['./search-students.component.scss']
})
export class SearchStudentsComponent {
  levels: any = [];
  divisions: any = [];
  optionsSearch = false;
  optionsClickedSearch: boolean = false;
  searchTextLaterSearch: any;
  nameSearch= '';
  studentsSearch: any;
  searchValue: any;
  loadSearch = false;
  numbers: any = 0;
  levelName: any = '';
  divisionName: any = '';
  loadNumberReport: any = true;
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
  studentForm = new FormGroup({
    student_id: new FormControl("",[Validators.required]),
    level_id: new FormControl("",[Validators.required]),
    division_id: new FormControl("",[Validators.required]),
  });
  studentsNumbersForm = new FormGroup({
    student_id: new FormControl("",[Validators.required]),
    level_id: new FormControl("",[Validators.required]),
    division_id: new FormControl("",[Validators.required]),
  });
  getStudentsNumbers(){
    if(this.loadNumberReport == true){
      $("#submitExport").attr("disabled","true");
    $("#submitExport").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    this._ApiStudentsService.getNumbers(this.studentsNumbersForm.value).subscribe((res)=>{
      $("#submitExport").removeAttr("disabled");
      $("#submitExport").html('<i class="fas fa-file-excel"></i> تنزيل الأكسيل ');
      if(res.status == 1){
        this.numbers = res.data;
        this.loadNumberReport = false;
      }else{
        $('#audio')[0].play();
        this.toastr.error(res.message);
      }
    });
    }
  }
  numbersReports(data: any){
    this.levelName = this.levels.find((level: any) => level.id == data.level_id);
    this.levelName = this.levelName?.name;
    this.divisionName = this.divisions.find((division: any) => division.id == data.division_id);
    this.divisionName = this.divisionName?.name;
    if(data.student_id == ""){this.nameSearch = '';}
  }
  search(data:any){
    $("#submit, #searchModal, .loadDataSearch").attr("disabled","true");
    $("#submit, #searchModal, .loadDataSearch").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    this._ShowStudentsComponent.pageNumber = 1;
    data.pageNum = 1;
    data.perPage = Pagination.perPage;
    this._ApiStudentsService.search(data).subscribe((res)=>{
      if(res.status == 1){
        $("#submit, #searchModal, .loadDataSearch").removeAttr("disabled");
        $("#submit").html('بحث');
        $("#searchModal").html('<i class="fas fa-search"></i>');
        $("#closeSearch").trigger("click");
        this._ShowStudentsComponent.students = res.data;
        this._ShowStudentsComponent.pageNumber++;
        this._ShowStudentsComponent.formstudentsSearch = data;
        this._ShowStudentsComponent.messageEmpty = true;
        this._ShowStudentsComponent.scrollTable = true;
        this.studentsNumbersForm.patchValue(data, { emitEvent: true, onlySelf: false });
        this.numbersReports(data);
        this.loadNumberReport = true;
      } else{
        $('#audio')[0].play();
        this.toastr.error(res.message);
      }
    });
  }
  handleFocusSearch(target : any){
    this.optionsSearch = true;
    if(target.value){
      this.getStudentSearch(target);
    }
  }
  handleBlurSearch() {
    if (!this.optionsClickedSearch) {
      this.optionsSearch = false;
    }
  }
  setOptionsClickedSearch(clicked: boolean) {
    this.optionsClickedSearch = clicked;
  }
  setDataStudentSearch(id: any , name: any){
    this.studentForm.controls['student_id'].setValue(id);
    this.nameSearch = name;
    this.optionsSearch = false;
    this.studentsSearch = [];
  }
  getStudentSearch(target : any){
    this.searchValue = target.value;
    this.studentForm.controls['student_id'].setValue("");
    this.optionsSearch = true;
    if(this.loadSearch){
      this.searchTextLaterSearch = target.value;
      return;
    }
    this.loadSearch = true;
    const searchText = target.value;
    this.ActionApiGetStudentSearch(searchText);
  }
  ActionApiGetStudentSearch(searchText: any){
    this._ApiStudentsService.getStudents({searchKey:searchText}).subscribe((res)=>{
      if(res.status == 1){
        this.studentsSearch = res.data;
        if(this.searchTextLaterSearch){
          this.ActionApiGetStudentSearch(this.searchTextLaterSearch);
          this.searchTextLaterSearch = '';
        }else{
          this.loadSearch = false;
        }
      }
    })
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
  }
}
