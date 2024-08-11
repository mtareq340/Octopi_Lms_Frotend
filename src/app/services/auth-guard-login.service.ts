import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import {AuthGuardService} from "./auth-guard.service";
import { HttpClient } from '@angular/common/http';
import { ApiToken } from '../helper/api-token';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoginService implements CanActivate {

  constructor(private _router:Router , private _AuthGuardService:AuthGuardService , private _HttpClient:HttpClient) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (ApiToken.ApiTokenUser())  {
        this._router.navigate(['dashboard']);
        return false;
      }
      return true;
  }
}
