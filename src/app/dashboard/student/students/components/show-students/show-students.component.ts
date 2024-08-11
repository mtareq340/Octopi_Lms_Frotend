import { Component } from '@angular/core';
import { ApiStudentsService } from '../../services/api-students.service';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/helper/pagination';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-show-students',
  templateUrl: './show-students.component.html',
  styleUrls: ['./show-students.component.scss']
})
export class ShowStudentsComponent {
  studentIdSend: any;
  formstudentsSearch: any = {pageNum: 1,perPage:Pagination.perPage};
  getDataLoadPagination = false;
  waitDataLoadPagination = true;
  pageNumber = 1;
  scrollTable: boolean = true;
  paramsLoadData = false;
  messageEmpty = false;
  constructor(private _ApiStudentsService: ApiStudentsService, private router: Router, private toastr: ToastrService) { }
  students: any = [];
  edit(student: any) {
    const queryParams = new URLSearchParams();
    for (const key in student) {
      if (student.hasOwnProperty(key)) {
        const value = student[key] !== null ? student[key] : "";
        queryParams.set(key, value);
      }
    }
    const queryParamsString = queryParams.toString();
    const routeUrl = 'dashboard/Student/students/update';
    const navigationExtras = {
      queryParams: { data: queryParamsString }
    };
    this.router.navigate([routeUrl], navigationExtras);
  }
  deleteId(id: any) {
    this.studentIdSend = id;
  }
  getDataPagination(event: any){
    if(this.scrollTable && event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight){
      this.getDataLoadPagination = true;
      this.waitDataLoadPagination = false;
      this.formstudentsSearch.pageNum = this.pageNumber;
      this._ApiStudentsService.search(this.formstudentsSearch).subscribe((res) => {
        if(res.status == 1){
          this.getDataLoadPagination = false;
          this.waitDataLoadPagination = true;
          if (res.data.length > 0) { this.students.push(...res.data);if(res.data.length < Pagination.perPage){this.scrollTable = false;} }
          else{this.scrollTable = false;}
        }
      });
      this.pageNumber++;
    }
  }
  search(data: any) {
    $("#submit, #searchModal, .loadDataSearch").attr("disabled","true");
    this.paramsLoadData = true;
    this.pageNumber = 1;
    data.pageNum = 1;
    data.perPage = Pagination.perPage;
    this._ApiStudentsService.search(data).subscribe((res) => {
      if (res.status == 1) {
        $("#submit, #searchModal, .loadDataSearch").removeAttr("disabled");
        this.students = res.data;
        this.pageNumber++;
        this.formstudentsSearch = data;
        this.paramsLoadData = false;
        this.messageEmpty = true;
      } else {
        $('#audio')[0].play();
        this.toastr.error(res.message);
      }
    });
  }
  changeStatus(id: any){
    $('body').css({"cursor":'wait'})
    this._ApiStudentsService.changeStatus(id).subscribe((res)=>{
      if(res.status == 1){
        $('body').css({"cursor":'default'})
        $('#audio')[0].play();
        this.toastr.success("تم تغير الحالة بنجاح");
      }
    })
  }
}
