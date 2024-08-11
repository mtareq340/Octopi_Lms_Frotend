import { Component } from '@angular/core';
import { Permissions } from 'src/app/helper/permissions';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  title='النتائج';
  permissionCheck: any = Permissions.UserPermissions();
  results:any=[
    {name:'نتائج الطلاب',icon:'fas fa-map',permission:this.permissionCheck.includes('show_studentsResults'),routerLink:'studentsResults'}
  ];
}
