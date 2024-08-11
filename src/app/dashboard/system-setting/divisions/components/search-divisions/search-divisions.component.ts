import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $:any;
import { ApiDivisionsService } from '../../services/api-divisions.service';
import { ShowDivisionsComponent } from '../show-divisions/show-divisions.component';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/helper/pagination';
import { MainSetting } from 'src/app/helper/main-setting';
@Component({
  selector: 'app-search-divisions',
  templateUrl: './search-divisions.component.html',
  styleUrls: ['./search-divisions.component.scss']
})
export class SearchDivisionsComponent {
  showFormAdd = false;
  showExcelAdd = false;
  titleForm = "";
  paramsLoadData = false;
  constructor(private _ApiDivisionsService:ApiDivisionsService , private _ShowDivisionsComponent:ShowDivisionsComponent , private toastr: ToastrService){}
  divisionForm = new FormGroup({
    search_key: new FormControl("",[Validators.required])
  });
  showForm(showFormAdd:boolean,showExcelAdd:boolean,titleForm:string){
    this.showFormAdd = showFormAdd;
    this.showExcelAdd = showExcelAdd;
    this.titleForm = titleForm;
  }
  search(data:any){
    $("#submit, #searchModal, .loadDataSearch").attr("disabled","true");
    $("#submit, #searchModal, .loadDataSearch").html('<span class="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>');
    this._ShowDivisionsComponent.pageNumber = 1;
    data.pageNum = 1;
    data.perPage = Pagination.perPage;
    this._ApiDivisionsService.search(data).subscribe((res)=>{
      if(res.status == 1){
        $("#submit, #searchModal, .loadDataSearch").removeAttr("disabled");
        $("#submit").html('بحث');
        $("#searchModal").html('<i class="fas fa-search"></i>');
        $("#closeSearch").trigger("click");
        this._ShowDivisionsComponent.divisions = res.data;
        this._ShowDivisionsComponent.pageNumber++;
        this._ShowDivisionsComponent.formDivisionsSearch = data;
        this._ShowDivisionsComponent.messageEmpty = true;
        this._ShowDivisionsComponent.scrollTable = true;
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
