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
export class ApiStudentsResultsService {
  moduleName = 'Result/';
  constructor(private _HttpClient:HttpClient , private _router:Router) { }
  catchError = catchError(error => {
    ApiToken.RemoveApiTokenUser();
    Permissions.RemoveUserPermissions();
    User.RemoveUser();
    this._router.navigate(['login']);
    return throwError('Something went wrong');
  });
  search(data:any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ this.moduleName + 'student_result_course?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
  update(data:any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ this.moduleName + 'student_result_course/update/'+data.id+'?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
  addExcel(data:any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ this.moduleName + 'student_result_course/import?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
  getStudents(searchKey: any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl + 'Student/get?api_token='+ApiToken.ApiTokenUser(),searchKey).pipe(this.catchError);
  }
  getCourses():Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ 'Academic/courses/get?api_token='+ApiToken.ApiTokenUser(),"").pipe(this.catchError);
  }
  getLevels():Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ 'MainSetting/levels?api_token='+ApiToken.ApiTokenUser(),"").pipe(this.catchError);
  }
  getDivision():Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ 'MainSetting/getDivisions?api_token='+ApiToken.ApiTokenUser(),"").pipe(this.catchError);
  }
  exportExcel(data: any):Observable<any>{
    data.academic_year_id = User.GetUser().academic_year_id;
    data.academic_term_id = User.GetUser().academic_term_id;
    return this._HttpClient.post(Urls.publicUrl+ this.moduleName +  'student_result_course/export?api_token='+ApiToken.ApiTokenUser(),data,{ responseType: 'blob'}).pipe(this.catchError);
  }
  getNumbers(data: any):Observable<any>{
    data.academic_year_id = User.GetUser().academic_year_id;
    data.academic_term_id = User.GetUser().academic_term_id;
    return this._HttpClient.post(Urls.publicUrl+ this.moduleName +  'student_result_course/counts?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
}
