import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiDivisionsService } from '../../services/api-divisions.service';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/helper/pagination';
declare var $: any;
@Component({
  selector: 'app-show-divisions',
  templateUrl: './show-divisions.component.html',
  styleUrls: ['./show-divisions.component.scss']
})
export class ShowDivisionsComponent {
  constructor(private _ApiDivisionsService: ApiDivisionsService , private toastr: ToastrService){}
  formDivisionsSearch: any;
  getDataLoadPagination = false;
  waitDataLoadPagination = true;
  pageNumber = 1;
  scrollTable: boolean = true;
  divisions: any = [];
  divisionIdSend: any;
  divisionsTypesSend: any;
  paramsLoadData = false;
  messageEmpty = false;
  divisionFormSend = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
  });
  search(data: any) {
    this.paramsLoadData = true;
    this.pageNumber = 1;
    data.pageNum = 1;
    data.perPage = Pagination.perPage;
    this._ApiDivisionsService.search(data).subscribe((res) => {
      if (res.status == 1) {
        this.divisions = res.data;
        this.pageNumber++;
        this.formDivisionsSearch = data;
        this.paramsLoadData = false;
        this.messageEmpty = true;
      } else {
        $('#audio')[0].play();
        this.toastr.error(res.message);
      }
    });
  }
  edit(division: any) {
    this.divisionFormSend.patchValue(division, { emitEvent: true, onlySelf: false });
  }
  deleteId(id: any) {
    this.divisionIdSend = id;
  }
  getDataPagination(event: any){
    if(this.scrollTable && event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight){
      this.getDataLoadPagination = true;
      this.waitDataLoadPagination = false;
      this.formDivisionsSearch.pageNum = this.pageNumber;
      this._ApiDivisionsService.search(this.formDivisionsSearch).subscribe((res)=>{
        if(res.status == 1){
          this.getDataLoadPagination = false;
          this.waitDataLoadPagination = true;
          if(res.data.length > 0){this.divisions.push(...res.data);if(res.data.length < Pagination.perPage){this.scrollTable = false;} }
          else{this.scrollTable = false;}
        }
      });
      this.pageNumber++;
    }
  }
}
