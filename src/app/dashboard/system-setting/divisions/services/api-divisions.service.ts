import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Urls } from 'src/app/helper/urls';
import { ApiToken } from 'src/app/helper/api-token';
import { Permissions } from 'src/app/helper/permissions';
import { Router } from '@angular/router';
import { User } from 'src/app/helper/user';
@Injectable({
  providedIn: 'root'
})
export class ApiDivisionsService {
  moduleName = 'MainSetting/';
  constructor(private _HttpClient:HttpClient , private _router:Router) { }
  catchError = catchError(error => {
    ApiToken.RemoveApiTokenUser();
    Permissions.RemoveUserPermissions();
    User.RemoveUser();
    this._router.navigate(['login']);
    return throwError('Something went wrong');
  });

  search(data:any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ this.moduleName + 'divisions?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
  add(data:any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ this.moduleName + 'divisions/store?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
  update(data:any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ this.moduleName + 'divisions/update/'+data.id+'?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
  delete(data:any):Observable<any>{
    return this._HttpClient.delete(Urls.publicUrl+ this.moduleName + 'divisions/destroy/'+data.id+'?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
}
