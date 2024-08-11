import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Urls } from '../helper/urls';
import { ApiToken } from '../helper/api-token';
import { Observable, catchError, throwError } from 'rxjs';
import { Permissions } from '../helper/permissions';
import { User } from '../helper/user';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _router:Router , private _HttpClient:HttpClient) {}
  catchError = catchError(error => {
    ApiToken.RemoveApiTokenUser();
    Permissions.RemoveUserPermissions();
    User.RemoveUser();
    this._router.navigate(['login']);
    return throwError('Something went wrong');
  });
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(ApiToken.ApiTokenUser()){
        this.checkDetails();
        return true;
      }
      return false;
  }
  check():Observable<any>{
    return this._HttpClient.post( Urls.publicUrl + "auth/check?api_token="+ApiToken.ApiTokenUser() , '').pipe(this.catchError);
  }
  checkDetails(){
    this.check().subscribe((res: any)=>{
      if(res.status == 0){
        ApiToken.RemoveApiTokenUser();
        Permissions.RemoveUserPermissions();
        User.RemoveUser();
        this._router.navigate(['login']);
      }else{
        Permissions.RemoveUserPermissions();
        Permissions.SetUserPermissions(res.data.permissions);
      }
    })
  }
}
