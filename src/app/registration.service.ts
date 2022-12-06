import { Injectable } from '@angular/core';
import { User } from './user';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http: HttpClient) { }

  public loginUserFromRemote(user : User):Observable<any>{
    console.log(user.username)
    return this._http.post<any>('authentication/login', user)
  }

  public signUpUserFromRemote(user : User):Observable<any>{
    return this._http.post<any>('authentication/signup', user)
  }

}
