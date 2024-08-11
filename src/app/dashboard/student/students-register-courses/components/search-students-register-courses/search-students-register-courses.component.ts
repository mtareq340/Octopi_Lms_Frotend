import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $:any;
import { ApiStudentsRegisterCoursesService } from '../../services/api-students-register-courses.service';
import { ShowStudentsRegisterCoursesComponent } from '../show-students-register-courses/show-students-register-courses.component';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/helper/pagination';
import { AllCourses } from 'src/app/dashboard/helper/all-courses';
import { User } from 'src/app/helper/user';
@Component({
  selector: 'app-search-students-register-courses',
  templateUrl: './search-students-register-courses.component.html',
  styleUrls: ['./search-students-register-courses.component.scss']
})
export class SearchStudentsRegisterCoursesComponent {
  searchValue: any;
  nameSearch= '';
  showFormAdd = false;
  optionsClickedSearch: boolean = false;
  searchTextLaterSearch: any;
  showExcelAdd = false;
  optionsSearch = false;
  titleForm = "";
  loadSearch = false;
  coursesSearch: any;
  studentsSearch: any;
  constructor(private _ApiStudentsRegisterCoursesService:ApiStudentsRegisterCoursesService , private _ShowStudentsRegisterCoursesComponent:ShowStudentsRegisterCoursesComponent , private toastr: ToastrService){
    if(AllCourses.Courses != 0){
      this.coursesSearch = AllCourses.Courses;
    }else{
      this._ApiStudentsRegisterCoursesService.getCourses().subscribe((res)=>{
        if(res.status == 1){
          this.coursesSearch = res.data;
          AllCourses.Courses = res.data;
        } else{
          this.toastr.error(res.message);
        }
      })
    }
  }
  setDataStudentSearch(id: any , name: any){
    this.studentsRegisterCourseForm.controls['student_id'].setValue(id);
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
    this.studentsRegisterCourseForm.controls['student_id'].setValue("");
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
    this._ApiStudentsRegisterCoursesService.getStudents({searchKey:searchText}).subscribe((res)=>{
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
  studentsRegisterCourseForm = new FormGroup({
    student_id: new FormControl("",[Validators.required]),
    course_id: new FormControl("",[Validators.required])
  });
  showForm(showFormAdd:boolean,showExcelAdd:boolean,titleForm:string){
    this.showFormAdd = showFormAdd;
    this.showExcelAdd = showExcelAdd;
    this.titleForm = titleForm;
  }
  search(data:any){
    $("#submit, #searchModal, .loadDataSearch").attr("disabled","true");
    $("#submit, #searchModal, .loadDataSearch").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    this._ShowStudentsRegisterCoursesComponent.pageNumber = 1;
    data.pageNum = 1;
    data.perPage = Pagination.perPage;
    data.academic_year_id = User.GetUser().academic_year_id;
    data.academic_term_id = User.GetUser().academic_term_id;
    this._ApiStudentsRegisterCoursesService.search(data).subscribe((res)=>{
      if(res.status == 1){
        $("#submit, #searchModal, .loadDataSearch").removeAttr("disabled");
        $("#submit").html('بحث');
        $("#searchModal").html('<i class="fas fa-search"></i>');
        $("#closeSearch").trigger("click");
        this._ShowStudentsRegisterCoursesComponent.studentsRegisterCourses = res.data;
        this._ShowStudentsRegisterCoursesComponent.pageNumber++;
        this._ShowStudentsRegisterCoursesComponent.formStudentsRegisterCoursesSearch = data;
        this._ShowStudentsRegisterCoursesComponent.messageEmpty = true;
        this._ShowStudentsRegisterCoursesComponent.scrollTable = true;
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
      this.studentsRegisterCourseForm.controls['course_id'].setValue(selectedValue);
    });
  }
}
