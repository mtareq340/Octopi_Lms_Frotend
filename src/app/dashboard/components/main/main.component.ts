import { Component } from '@angular/core';
import { Permissions } from 'src/app/helper/permissions';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  permissionCheck: any = Permissions.UserPermissions();
  pages= [
    {name:'المقررات الدراسية',icon:'fas fa-book',permission:this.permissionCheck.includes('show_facultyMemberCourses'),routerLink:'FacultyMembers/facultyMemberCourses'},
    {name:'الطلاب',icon:'fas fa-user-graduate',permission:this.permissionCheck.includes('show_students'),routerLink:'Student/students'},
    {name:'الإرشاد الأكاديمي',icon:'fas fa-book',permission:this.permissionCheck.includes('Academic'),routerLink:'Academic'},
    {name:'نتائج الطلاب',icon:'fas fa-graduation-cap',permission:this.permissionCheck.includes('show_studentsResults'),routerLink:'Result/studentsResults'},
    {name:'المقررات الدراسية',icon:'fas fa-book',permission:this.permissionCheck.includes('show_studentCourses'),routerLink:'Student/studentCourses'},
    {name:'النتيجة',icon:'fas fa-graduation-cap',permission:this.permissionCheck.includes('show_studentResults'),routerLink:'Student/studentResults'},
    {name:'الإعدادات',icon:'fas fa-cogs',permission:this.permissionCheck.includes('ProfileSetting'),routerLink:'ProfileSetting'}
  ];
}
