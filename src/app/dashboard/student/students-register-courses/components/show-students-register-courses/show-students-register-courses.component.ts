import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiStudentsRegisterCoursesService } from '../../services/api-students-register-courses.service';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/helper/pagination';
import { User } from 'src/app/helper/user';
declare var $: any;
@Component({
  selector: 'app-show-students-register-courses',
  templateUrl: './show-students-register-courses.component.html',
  styleUrls: ['./show-students-register-courses.component.scss']
})
export class ShowStudentsRegisterCoursesComponent {
  messageEmpty = false;
  paramsLoadData = false;
  formStudentsRegisterCoursesSearch: any;
  getDataLoadPagination = false;
  waitDataLoadPagination = true;
  pageNumber = 1;
  scrollTable: boolean = true;
  loadCoursesEditSend = false;
  constructor(private _ApiStudentsRegisterCoursesService: ApiStudentsRegisterCoursesService , private toastr: ToastrService){}
  studentsRegisterCourses: any = [];
  studentsRegisterCourseIdSend: any;
  studentsSend: any;
  coursesSend: any = [];
  studentsRegisterCourseFormSend = new FormGroup({
    id: new FormControl("", [Validators.required]),
    student_id: new FormControl("", [Validators.required]),
    regulation_course_id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required])
  });
  search(data:any){
    $("#submit, #searchModal, .loadDataSearch").attr("disabled","true");
    this.paramsLoadData = true;
    this.pageNumber = 1;
    data.pageNum = 1;
    data.perPage = Pagination.perPage;
    data.academic_year_id = User.GetUser().academic_year_id;
    data.academic_term_id = User.GetUser().academic_term_id;
    this._ApiStudentsRegisterCoursesService.search(data).subscribe((res)=>{
      if(res.status == 1){
        $("#submit, #searchModal, .loadDataSearch").removeAttr("disabled");
        this.studentsRegisterCourses = res.data;
        this.pageNumber++;
        this.formStudentsRegisterCoursesSearch = data;
        $('.mySelect2_course_id').val(data.course_id).trigger('change');
        this.paramsLoadData = false;
        this.messageEmpty = true;
      } else{
        $("#submit, #searchModal, .loadDataSearch").removeAttr("disabled");
        $('#audio')[0].play();
        this.toastr.error(res.message);
      }
    });
  }
  edit(studentsRegisterCourse: any) {
    this.loadCoursesEditSend = true;
    $('.mySelect2_regulation_course_id_edit').prop('disabled', true);
    this.coursesSend = [{id:studentsRegisterCourse.regulation_course_id,course:studentsRegisterCourse.course}];
    this._ApiStudentsRegisterCoursesService.getAvailableCourses({student_id:studentsRegisterCourse.student_id}).subscribe((res)=>{
      this.loadCoursesEditSend = false;
      $('.mySelect2_regulation_course_id_edit').prop('disabled', false);
      this.coursesSend = this.coursesSend.concat(res.availableCourses);
      $('.mySelect2_regulation_course_id_edit').val(`{'regulation_course_id':${studentsRegisterCourse.regulation_course_id},'course_id':${studentsRegisterCourse.course_id}}`).trigger('change');
    });
    this.studentsRegisterCourseFormSend.patchValue(studentsRegisterCourse, { emitEvent: true, onlySelf: false });
    $('#nameStudent').val(studentsRegisterCourse.student.name);
  }
  deleteId(id: any) {
    this.studentsRegisterCourseIdSend = id;
  }
  getDataPagination(event: any){
    if(this.scrollTable && event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight){
      this.getDataLoadPagination = true;
      this.waitDataLoadPagination = false;
      this.formStudentsRegisterCoursesSearch.pageNum = this.pageNumber;
      this._ApiStudentsRegisterCoursesService.search(this.formStudentsRegisterCoursesSearch).subscribe((res)=>{
        if(res.status == 1){
          this.getDataLoadPagination = false;
          this.waitDataLoadPagination = true;
          if(res.data.length > 0){this.studentsRegisterCourses.push(...res.data);if(res.data.length < Pagination.perPage){this.scrollTable = false;} }
          else{this.scrollTable = false;}
        }
      });
      this.pageNumber++;
    }
  }
}
