import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Urls } from 'src/app/helper/urls';
import { ApiToken } from 'src/app/helper/api-token';
import { Permissions } from 'src/app/helper/permissions';
import { Router } from '@angular/router';
import { User } from 'src/app/helper/user';
import { CrudData } from 'src/app/helper/crud-data';
@Injectable({
  providedIn: 'root'
})
export class ApiResultsService {
  moduleName = 'Student/';
  constructor(private _HttpClient:HttpClient , private _router:Router) { }
  catchError = catchError(error => {
    ApiToken.RemoveApiTokenUser();
    Permissions.RemoveUserPermissions();
    User.RemoveUser();
    this._router.navigate(['login']);
    return throwError('Something went wrong');
  });
  getResultsStudent():Observable<any>{
    var data = CrudData.getResults({});
    return this._HttpClient.post(Urls.publicUrl + this.moduleName +'student_result_course?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
}
