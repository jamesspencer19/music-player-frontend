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

  //send login http request to authorise that the credentials entered match those in the database
  public loginUserFromRemote(user : User):Observable<any>{
    return this._http.post<any>('authentication/login', user)
  }

  //adds the users username and password to the database
  public signUpUserFromRemote(user : User):Observable<any>{
    return this._http.post<any>('authentication/signup', user)
  }

  //retrieve all songs from the music database
  getMusicLibrary() {
    var request = new XMLHttpRequest();
    this.url = 'music/library'
    request.open('GET', this.url, false);
    request.send();
    if (request.status === 200) {
        return request.response;
    } else {
        throw new Error('request failed');
    }
  }

  //retrieve a playlist using the username
  getPlaylist(username:any) {
    var request = new XMLHttpRequest();
    this.url = 'playlist/getplaylist/' + username
    request.open('GET', this.url, false);
    request.send();
    if (request.status === 200) {
        return request.response;
    } else {
        throw new Error('request failed');
    }
  }

  //retrieve a song using the song's ID 
  getMusicById(id:any) {
    var request = new XMLHttpRequest();
    this.url = 'music/song/' + id
    request.open('GET', this.url, false);
    request.send();
    if (request.status === 200) {
        return request.response;
    } else {
        throw new Error('request failed');
    }
  }

  //edit the songIds within a users playlist (adding/removing songs)
  public editPlaylist(userplaylist:UserPlaylist):Observable<any>{
    return this._http.patch<any>('playlist/editplaylist', userplaylist)
  }

}
