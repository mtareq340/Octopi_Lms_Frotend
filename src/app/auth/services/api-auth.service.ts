import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from 'src/app/helper/urls';
@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  constructor(private _HttpClient:HttpClient) { }
  login(data:any):Observable<any>{
    return this._HttpClient.post(Urls.publicUrl+"auth/login",data);
  }
}
