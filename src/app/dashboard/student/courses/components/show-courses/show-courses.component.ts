import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Urls } from 'src/app/helper/urls';
@Component({
  selector: 'app-show-courses',
  templateUrl: './show-courses.component.html',
  styleUrls: ['./show-courses.component.scss']
})
export class ShowCoursesComponent {
  constructor(private router: Router){}
  mainUrl:string = Urls.mainUrl;
  courses: any = [];
  searchKey: any;
  paramsLoadData = false;
  getData(url: any , id: any){
    this.router.navigate([url], { queryParams: { id } });
  }
}
