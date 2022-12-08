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
    if(this.playlist.indexOf(songdata) !== -1){
      alert("Already Exists")
    }
    this.playlist.push(songdata)
  }

}
