import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $:any;
import { ApiStudentsResultsService } from '../../services/api-students-results.service';
import { ShowStudentsResultsComponent } from '../show-students-results/show-students-results.component';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/helper/pagination';
import { MainSetting } from 'src/app/helper/main-setting';
import { AllCourses } from 'src/app/dashboard/helper/all-courses';
import { User } from 'src/app/helper/user';
@Component({
  selector: 'app-search-students-results',
  templateUrl: './search-students-results.component.html',
  styleUrls: ['./search-students-results.component.scss']
})
export class SearchStudentsResultsComponent {
  levels: any = [];
  divisions: any = [];
  searchValue: any;
  nameSearch= '';
  optionsClickedSearch: boolean = false;
  searchTextLaterSearch: any;
  optionsSearch = false;
  loadSearch = false;
  coursesSearch: any;
  studentsSearch: any;
  loadNumberReport: any = true;
  numbers: any = 0;
  levelName: any = '';
  divisionName: any = '';
  courseName: any = '';
  studentsResultsNumbersForm = new FormGroup({
    student_id: new FormControl("",[Validators.required]),
    level_id: new FormControl("",[Validators.required]),
    division_id: new FormControl("",[Validators.required]),
    course_id: new FormControl("",[Validators.required])
  });
  constructor(private _ApiStudentsResultsService:ApiStudentsResultsService , private _ShowStudentsResultsComponent:ShowStudentsResultsComponent , private toastr: ToastrService){
    if(AllCourses.Courses != 0){
      this.coursesSearch = AllCourses.Courses;
    }else{
      this._ApiStudentsResultsService.getCourses().subscribe((res)=>{
        if(res.status == 1){
          this.coursesSearch = res.data;
          AllCourses.Courses = res.data;
        } else{
          this.toastr.error(res.message);
        }
      })
    }
    if(MainSetting.levels.length == 0){
      this._ApiStudentsResultsService.getLevels().subscribe((res)=>{
        if(res.status == 1){
          this.levels = res.data;
          MainSetting.levels = res.data;
        }
      })
    }else{
      this.levels = MainSetting.levels;
    }
    if(MainSetting.divisions.length == 0){
      this._ApiStudentsResultsService.getDivision().subscribe((res)=>{
        if(res.status == 1){
          this.divisions = res.data;
          MainSetting.divisions = res.data;
        }
      })
    }else{
      this.divisions = MainSetting.divisions;
    }
  }
  getStudentsResultsNumbers(){
    if(this.loadNumberReport == true){
      $("#submitExport").attr("disabled","true");
    $("#submitExport").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    this._ApiStudentsResultsService.getNumbers(this.studentsResultsNumbersForm.value).subscribe((res)=>{
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
    this.courseName = this.coursesSearch.find((course: any) => course.id == data.course_id);
    this.courseName = this.courseName?.name;

    if(data.student_id == ""){this.nameSearch = '';}
  }
  setDataStudentSearch(id: any , name: any){
    this.studentsResultsForm.controls['student_id'].setValue(id);
    this.nameSearch = name;
    this.optionsSearch = false;
    this.studentsSearch = [];
  }
  handleFocusSearch(target : any){
    this.optionsSearch = true;
    if(target.value){
      this.getStudentSearch(target);
    }
  }
  getStudentSearch(target : any){
    this.searchValue = target.value;
    this.studentsResultsForm.controls['student_id'].setValue("");
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
    this._ApiStudentsResultsService.getStudents({searchKey:searchText}).subscribe((res)=>{
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
  handleBlurSearch() {
    if (!this.optionsClickedSearch) {
      this.optionsSearch = false;
    }
  }
  setOptionsClickedSearch(clicked: boolean) {
    this.optionsClickedSearch = clicked;
  }
  studentsResultsForm = new FormGroup({
    student_id: new FormControl("",[Validators.required]),
    course_id: new FormControl("",[Validators.required]),
    level_id: new FormControl("",[Validators.required]),
    division_id: new FormControl("",[Validators.required])
  });
  search(data:any){
    $("#submit, #searchModal, .loadDataSearch").attr("disabled","true");
    $("#submit, #searchModal, .loadDataSearch").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    this._ShowStudentsResultsComponent.pageNumber = 1;
    data.pageNum = 1;
    data.perPage = Pagination.perPage;
    data.academic_year_id = User.GetUser().academic_year_id;
    data.academic_term_id = User.GetUser().academic_term_id;
    this._ApiStudentsResultsService.search(data).subscribe((res)=>{
      if(res.status == 1){
        $("#submit, #searchModal, .loadDataSearch").removeAttr("disabled");
        $("#submit").html('بحث');
        $("#searchModal").html('<i class="fas fa-search"></i>');
        $("#closeSearch").trigger("click");
        this._ShowStudentsResultsComponent.studentsResults = res.data;
        this._ShowStudentsResultsComponent.pageNumber++;
        this._ShowStudentsResultsComponent.formStudentsResultsSearch = data;
        this._ShowStudentsResultsComponent.messageEmpty = true;
        this._ShowStudentsResultsComponent.scrollTable = true;
        this.studentsResultsNumbersForm.patchValue(data, { emitEvent: true, onlySelf: false });
        this.numbersReports(data);
        this.loadNumberReport = true;
      } else{
        $('#audio')[0].play();
        this.toastr.error(res.message);
      }
    });
  }
  ngOnInit(){
    var thing = this;
    $('#exampleModal').on('show.bs.modal', function (event:any) {
      var button = $(event.relatedTarget)
      var recipient = button.data('whatever')
      var modal = $(thing)
      modal.find('.modal-title').text('New message to ' + recipient)
      modal.find('.modal-body input').val(recipient)
    });
    $('.mySelect2_course_id').select2({
      dir:'rtl',
      allowClear: true,
      placeholder: 'بحث بالمقرر الدراسي'
    }).on('change', (event: any) => {
      var selectedValue = event.target.value;
      if(selectedValue == 0){selectedValue = ''}
      this.studentsResultsForm.controls['course_id'].setValue(selectedValue);
    });
  }
}
