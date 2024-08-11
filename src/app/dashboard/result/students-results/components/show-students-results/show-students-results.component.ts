import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiStudentsResultsService } from '../../services/api-students-results.service';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/helper/pagination';
import { User } from 'src/app/helper/user';
declare var $: any;
@Component({
  selector: 'app-show-students-results',
  templateUrl: './show-students-results.component.html',
  styleUrls: ['./show-students-results.component.scss']
})
export class ShowStudentsResultsComponent {
  messageEmpty = false;
  paramsLoadData = false;
  formStudentsResultsSearch: any;
  getDataLoadPagination = false;
  waitDataLoadPagination = true;
  pageNumber = 1;
  scrollTable: boolean = true;
  constructor(private _ApiStudentsResultsService: ApiStudentsResultsService , private toastr: ToastrService){}
  studentsResults: any = [];
  studentsResultsIdSend: any;
  studentsSend: any;
  coursesSend: any = [];
  studentsResultsFormSend = new FormGroup({
    id: new FormControl("", [Validators.required]),
    student_id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    mid_degree: new FormControl(""),
    final_degree: new FormControl(""),
    // amly_degree: new FormControl(""),
    work_year_degree: new FormControl(""),
    total_degree: new FormControl(""),
    gpa: new FormControl(""),
    gpa_word: new FormControl(""),
  });
  search(data:any){
    $("#submit, #searchModal, .loadDataSearch").attr("disabled","true");
    this.paramsLoadData = true;
    this.pageNumber = 1;
    data.pageNum = 1;
    data.perPage = Pagination.perPage;
    data.academic_year_id = User.GetUser().academic_year_id;
    data.academic_term_id = User.GetUser().academic_term_id;
    this._ApiStudentsResultsService.search(data).subscribe((res)=>{
      if(res.status == 1){
        $("#submit, #searchModal, .loadDataSearch").removeAttr("disabled");
        this.studentsResults = res.data;
        this.pageNumber++;
        this.formStudentsResultsSearch = data;
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
  edit(studentsResults: any) {
    $('.mySelect2_regulation_course_id_edit').prop('disabled', true);
    this.coursesSend = [{id:studentsResults.regulation_course_id,course:studentsResults.course}];
    this.studentsResultsFormSend.patchValue(studentsResults, { emitEvent: true, onlySelf: false });
    $('#nameStudent').val(studentsResults.student.name);
  }
  getDataPagination(event: any){
    if(this.scrollTable && event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight){
      this.getDataLoadPagination = true;
      this.waitDataLoadPagination = false;
      this.formStudentsResultsSearch.pageNum = this.pageNumber;
      this._ApiStudentsResultsService.search(this.formStudentsResultsSearch).subscribe((res)=>{
        if(res.status == 1){
          this.getDataLoadPagination = false;
          this.waitDataLoadPagination = true;
          if(res.data.length > 0){this.studentsResults.push(...res.data);if(res.data.length < Pagination.perPage){this.scrollTable = false;} }
          else{this.scrollTable = false;}
        }
      });
      this.pageNumber++;
    }
  }
}
