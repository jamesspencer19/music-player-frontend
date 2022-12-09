import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  constructor() { }
  public currentsong:any
  public currentimage: any
  public currentname:any
  public playlist:any[] = [];

  setSong(song:any,image:any,name:any){
    this.currentsong = song
    this.currentimage = image
    this.currentname=name
  }

  addSongToPlaylist(songdata:any){
    this.playlist.push(songdata)
  }

}
