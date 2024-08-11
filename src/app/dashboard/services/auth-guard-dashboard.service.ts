import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiToken } from 'src/app/helper/api-token';
import { Urls } from 'src/app/helper/urls';
import { Permissions } from 'src/app/helper/permissions';
import { User } from 'src/app/helper/user';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardDashboardService implements CanActivate {

  constructor(private _router:Router , private _HttpClient:HttpClient) { }
  catchError = catchError(error => {
    ApiToken.RemoveApiTokenUser();
    Permissions.RemoveUserPermissions();
    User.RemoveUser();
    this._router.navigate(['login']);
    return throwError('Something went wrong');
  });
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      var permission = Permissions.UserPermissions();
    if (permission.includes(route.data['name'])) {
      this.checkDetails(route.data['name']);
      return true;
    }
    return false;
  }
  check(permission:any):Observable<any>{
    return this._HttpClient.post( Urls.publicUrl + "auth/check-permission?api_token="+ApiToken.ApiTokenUser() , {permission:permission}).pipe(this.catchError);
  }
  checkDetails(permission:any){
    this.check(permission).subscribe((res: any)=>{
      if(res.status == 0){
        ApiToken.RemoveApiTokenUser();
        Permissions.RemoveUserPermissions();
        this._router.navigate(['login']);
      }else{
        Permissions.RemoveUserPermissions();
        Permissions.SetUserPermissions(res.data);
      }
    })
  }
}
