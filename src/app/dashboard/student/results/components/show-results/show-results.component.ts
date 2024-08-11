import { Component } from '@angular/core';
import { ApiResultsService } from '../../services/api-results.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.scss']
})
export class ShowResultsComponent {
  constructor(private _ApiResultsService:ApiResultsService,private toastr: ToastrService){}
  results: any = [];
  dataReceive: any = {is_show_gpa:[]};
  searchKey: any;
  paramsLoadData = false;
  messageEmpty = false;
  search(){
    $(".loadDataSearch").attr("disabled","true");
    this.paramsLoadData = true;
      this._ApiResultsService.getResultsStudent().subscribe((res)=>{
        $(".loadDataSearch").removeAttr("disabled");
        this.paramsLoadData = false;
        this.messageEmpty = true;
        if(res.status == 1){
          this.dataReceive = res.data;
          this.results = res.data.results;
        } else{
          $('#audio')[0].play();
          this.toastr.error(res.message);
        }
      })
  }
}
