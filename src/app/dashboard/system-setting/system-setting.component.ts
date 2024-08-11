import { Component } from '@angular/core';
import { Permissions } from 'src/app/helper/permissions';
@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.scss']
})
export class SystemSettingComponent {
  title='إدارة النظام';
  permissionCheck: any = Permissions.UserPermissions();
  MainModules:any=[];
}
