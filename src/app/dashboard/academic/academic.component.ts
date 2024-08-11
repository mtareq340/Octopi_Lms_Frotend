import { Component } from '@angular/core';
import { Permissions } from 'src/app/helper/permissions';
@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.scss']
})
export class AcademicComponent {
  title='الإرشاد';
  permissionCheck: any = Permissions.UserPermissions();
  academics:any=[
    {name:'المقررات الدراسية',icon:'fas fa-book-open',permission:this.permissionCheck.includes('show_courses'),routerLink:'courses'},
  ];
}
