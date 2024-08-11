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
export class ApiStudentsService {
  moduleName = 'Student/';
  constructor(private _HttpClient:HttpClient , private _router:Router) { }
  catchError = catchError(error => {
    ApiToken.RemoveApiTokenUser();
    Permissions.RemoveUserPermissions();
    User.RemoveUser();
    this._router.navigate(['login']);
    return throwError('Something went wrong');
  });
  search(data:any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ 'Student?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
  active(data:any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ this.moduleName +  'change_student_active?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
  getStudents(searchKey: any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl + this.moduleName + 'get?api_token='+ApiToken.ApiTokenUser(),searchKey).pipe(this.catchError);
  }
  add(data:any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ this.moduleName +  'store?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
  update(data:any , id: number):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ this.moduleName +  'update/'+id+'?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
  addExcel(data:any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ this.moduleName +  'students/import?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
  addExcelActive(data:any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ this.moduleName +  'students/import_active?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
  delete(data:any):Observable<any>{
    return this._HttpClient.delete(Urls.publicUrl+ this.moduleName +  'destroy/'+data.id+'?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
  getLevels():Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ 'MainSetting/levels?api_token='+ApiToken.ApiTokenUser(),"").pipe(this.catchError);
  }
  getDivision():Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ 'MainSetting/getDivisions?api_token='+ApiToken.ApiTokenUser(),"").pipe(this.catchError);
  }
  exportExcel(data: any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ this.moduleName +  'students/export?api_token='+ApiToken.ApiTokenUser(),data,{ responseType: 'blob'}).pipe(this.catchError);
  }
  getNumbers(data: any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ this.moduleName +  'counts?api_token='+ApiToken.ApiTokenUser(),data).pipe(this.catchError);
  }
  changeStatus(id:any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+ this.moduleName + 'changeStatus/'+id+'?api_token='+ApiToken.ApiTokenUser(),"").pipe(this.catchError);
  }
}
