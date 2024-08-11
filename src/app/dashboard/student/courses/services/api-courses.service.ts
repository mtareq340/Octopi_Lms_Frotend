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
export class ApiCoursesService {
  moduleName = 'Student/';
  constructor(private _HttpClient:HttpClient , private _router:Router) { }
  catchError = catchError(error => {
    ApiToken.RemoveApiTokenUser();
    Permissions.RemoveUserPermissions();
    User.RemoveUser();
    this._router.navigate(['login']);
    return throwError('Something went wrong');
  });
  getCoursesStudent(id: number):Observable<any>{
    var data: any = {};
    data.academic_year_id = User.GetUser().academic_year_id;
    data.academic_term_id = User.GetUser().academic_term_id;
    return this._HttpClient.post(Urls.publicUrl + this.moduleName +'show-courses/'+id+'?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
}
