import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiCoursesService } from '../../services/api-courses.service';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/helper/pagination';
import { CrudData } from 'src/app/helper/crud-data';
declare var $: any;
@Component({
  selector: 'app-show-courses',
  templateUrl: './show-courses.component.html',
  styleUrls: ['./show-courses.component.scss']
})
export class ShowCoursesComponent {
  constructor(private _ApiCoursesService: ApiCoursesService , private toastr: ToastrService){}
  messageEmpty = false;
  paramsLoadData = false;
  formcoursesSearch: any;
  getDataLoadPagination = false;
  waitDataLoadPagination = true;
  pageNumber = 1;
  scrollTable: boolean = true;
  courses: any = [];
  courseIdSend: any;
  courseFormSend = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    credit_hour: new FormControl("", [Validators.required]),
    code: new FormControl("", [Validators.required])
  });
  search(data:any){
    $("#submit, #searchModal, .loadDataSearch").attr("disabled","true");
    this.paramsLoadData = true;
    this.pageNumber = 1;
    var SendData = CrudData.search(data);
    this._ApiCoursesService.search(SendData).subscribe((res)=>{
      if(res.status == 1){
        $("#submit, #searchModal, .loadDataSearch").removeAttr("disabled");
        this.courses = res.data;
        this.pageNumber++;
        this.formcoursesSearch = data;
        this.paramsLoadData = false;
        this.messageEmpty = true;
      } else{
        $("#submit, #searchModal, .loadDataSearch").removeAttr("disabled");
        $('#audio')[0].play();
        this.toastr.error(res.message);
      }
    });
  }
  edit(course: any) {
    this.courseFormSend.patchValue(course, { emitEvent: true, onlySelf: false });
  }
  deleteId(id: any) {
    this.courseIdSend = id;
  }
  getDataPagination(event: any){
    if(this.scrollTable && event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight){
      this.getDataLoadPagination = true;
      this.waitDataLoadPagination = false;
      this.formcoursesSearch.pageNum = this.pageNumber;
      this._ApiCoursesService.search(this.formcoursesSearch).subscribe((res)=>{
        if(res.status == 1){
          this.getDataLoadPagination = false;
          this.waitDataLoadPagination = true;
          if(res.data.length > 0){this.courses.push(...res.data);if(res.data.length < Pagination.perPage){this.scrollTable = false;} }
          else{this.scrollTable = false;}
        }
      });
      this.pageNumber++;
    }
  }
}
