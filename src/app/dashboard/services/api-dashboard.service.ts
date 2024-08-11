import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Urls } from 'src/app/helper/urls';
import { Observable } from 'rxjs';
import { ApiToken } from 'src/app/helper/api-token';
@Injectable({
  providedIn: 'root'
})
export class ApiDashboardService {
  constructor(private _HttpClient:HttpClient) { }
  logout():Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+'auth/logout?api_token='+ApiToken.ApiTokenUser() ,'');
  }
}
