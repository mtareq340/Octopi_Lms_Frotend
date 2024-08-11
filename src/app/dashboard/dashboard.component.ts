import { Component } from '@angular/core';
declare var $: any;
import { ApiDashboardService } from './services/api-dashboard.service';
import { Router } from '@angular/router';
import { ApiToken } from '../helper/api-token';
import { Permissions } from '../helper/permissions';
import { ToastrService } from 'ngx-toastr';
import { User } from '../helper/user';
import { CoursesStudent } from './student/helper/courses-student';
import { AllCourses } from './helper/all-courses';
import { MainSetting } from '../helper/main-setting';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  name = User.GetUser().name;
  role_name = User.GetUser().role_name;
  constructor(private _ApiDashboardService: ApiDashboardService, private _Router: Router, private toastr: ToastrService) { }
  logout() {
    $('body').css({ "cursor": 'wait' })
    this._ApiDashboardService.logout().subscribe((res: any) => {
      if (res.status == 1) {
        ApiToken.RemoveApiTokenUser();
        Permissions.RemoveUserPermissions();
        User.RemoveUser();
        this._Router.navigate(['']);
        $('body').css({ "cursor": 'default' })
        CoursesStudent.Courses = 0;
        AllCourses.Courses = 0;
        CoursesStudent.CoursesExamsTypes = 0;
        CoursesStudent.CoursesLectures = 0;
        MainSetting.CourseTypes = [];
      }
    });
  }
  mobileToggle() {
    if (window.innerWidth <= 1199) {
      $('#toggle-btn').trigger('click');
    }
  }
  ngOnInit() {
    $('#toggle-btn').on('click', () => {
      if ($(window).outerWidth() > 1199) {
        $('nav.side-navbar').toggleClass('shrink');
        $('.page').toggleClass('active');
      } else {
        $('nav.side-navbar').toggleClass('show-sm');
        $('.page').toggleClass('active-sm');
      }
    });
  }
}
