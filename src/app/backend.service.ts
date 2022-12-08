import { Injectable } from '@angular/core';
import { User } from './user';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import { UserPlaylist } from './user-playlist';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  

  constructor(private _http: HttpClient) { }

  url:string

  public loginUserFromRemote(user : User):Observable<any>{
    return this._http.post<any>('authentication/login', user)
  }

  public signUpUserFromRemote(user : User):Observable<any>{
    return this._http.post<any>('authentication/signup', user)
  }

  public getMusicLibrary():Observable<any>{
    return this._http.get<any>('music/library')
  }

  public setPlaylist(username:any):Observable<any>{
    return this._http.post<any>('playlist/addplaylist',username)
  }

  public getPlaylist(username:any):Observable<any>{
    this.url = 'playlist/getplaylist/' + username
    return this._http.get<any>(this.url)
  }

  public getMusicById(id:any):Observable<any>{
    this.url = 'music/song/' + id
    return this._http.get<any>(this.url)
  }

  public deleteFromPlaylist(userplaylist:UserPlaylist):Observable<any>{
    return this._http.patch<any>('playlist/deletesong/', userplaylist)
  }

}
