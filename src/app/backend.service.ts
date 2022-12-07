import { Injectable } from '@angular/core';
import { User } from './user';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  

  constructor(private _http: HttpClient) { }

  public loginUserFromRemote(user : User):Observable<any>{
    console.log(this._http.post<any>('authentication/login', user).subscribe())
    return this._http.post<any>('authentication/login', user)
  }

  public signUpUserFromRemote(user : User):Observable<any>{
    return this._http.post<any>('authentication/signup', user)
  }

  public getMusicLibrary():Observable<any>{
    return this._http.get<any>('music/library')
  }

}
