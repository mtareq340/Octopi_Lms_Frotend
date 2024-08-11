import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $:any;
import { ApiCoursesService } from '../../services/api-courses.service';
import { ShowCoursesComponent } from '../show-courses/show-courses.component';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/helper/pagination';
@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.scss']
})
export class SearchCoursesComponent {
  showFormAdd = false;
  showExcelAdd = false;
  titleForm = "";
  constructor(private _ApiCoursesService:ApiCoursesService , private _ShowCoursesComponent:ShowCoursesComponent , private toastr: ToastrService){}
  courseForm = new FormGroup({
    search_key: new FormControl("",[Validators.required]),
  });
  showForm(showFormAdd:boolean,showExcelAdd:boolean,titleForm:string){
    this.showFormAdd = showFormAdd;
    this.showExcelAdd = showExcelAdd;
    this.titleForm = titleForm;
  }
  search(data:any){
    $("#submit, #searchModal, .loadDataSearch").attr("disabled","true");
    $("#submit, #searchModal, .loadDataSearch").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    this._ShowCoursesComponent.pageNumber = 1;
    data.pageNum = 1;
    data.perPage = Pagination.perPage;
    this._ApiCoursesService.search(data).subscribe((res)=>{
      if(res.status == 1){
        $("#submit, #searchModal, .loadDataSearch").removeAttr("disabled");
        $("#submit").html('بحث');
        $("#searchModal").html('<i class="fas fa-search"></i>');
        $("#closeSearch").trigger("click");
        this._ShowCoursesComponent.courses = res.data;
        this._ShowCoursesComponent.pageNumber++;
        this._ShowCoursesComponent.formcoursesSearch = data;
        this._ShowCoursesComponent.messageEmpty = true;
        this._ShowCoursesComponent.scrollTable = true;
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
    })
  }
}
