import { Directive , ElementRef } from '@angular/core';
import { Permissions } from 'src/app/helper/permissions';

@Directive({
  selector: '[permission]'
})
export class PermissionsDirective {

  constructor(private el: ElementRef) {
    let permission = el.nativeElement.getAttribute('permission');
    var permissionCheck = Permissions.UserPermissions();
    if (!permissionCheck.includes(permission))
      el.nativeElement.remove();
  }

}
