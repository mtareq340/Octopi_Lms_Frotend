import { Component } from '@angular/core';
import { Permissions } from 'src/app/helper/permissions';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  title='الطلاب';
  permissionCheck: any = Permissions.UserPermissions();
  students:any=[
    {name:'الطلبة',icon:'fa-users fas',permission:this.permissionCheck.includes('show_students'),routerLink:'students'},
    {name:'تسجيل المقررات للطلاب',icon:'fas fa-book',permission:this.permissionCheck.includes('show_studentsRegisterCourses'),routerLink:'studentsRegisterCourses'}
  ];
}
