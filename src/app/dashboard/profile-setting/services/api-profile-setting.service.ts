import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiToken } from 'src/app/helper/api-token';
import { Permissions } from 'src/app/helper/permissions';
import { Urls } from 'src/app/helper/urls';
import { User } from 'src/app/helper/user';
@Injectable({
  providedIn: 'root'
})
export class ApiProfileSettingService {
  moduleName = 'home/';
  constructor(private _HttpClient:HttpClient , private _router:Router) { }
  catchError = catchError(error => {
    ApiToken.RemoveApiTokenUser();
    Permissions.RemoveUserPermissions();
    User.RemoveUser();
    this._router.navigate(['login']);
    return throwError('Something went wrong');
  });
  updatePassword(data:any , id: number):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl + this.moduleName +'update/'+id+'?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
}
