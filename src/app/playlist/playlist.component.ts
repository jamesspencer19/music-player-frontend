import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { SongService } from '../song.service';
import { UserPlaylist } from '../user-playlist';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(private songService: SongService, private backendService:BackendService, private router: Router) { }

  playlist:any=[];

  playlistsongids=[];

  searchText:string

  userplaylist = new UserPlaylist

  emp:any


  ngOnInit(): void {
      var playlist = JSON.parse(this.backendService.getPlaylist(localStorage.getItem('username')))
      var playlistarray = playlist.songids.split(',')
      let last:any = playlistarray[playlistarray.length-1];
      if(last == ''){
        playlistarray.pop()
      }
      for(var e in playlistarray){
        var music = JSON.parse(this.backendService.getMusicById(playlistarray[e]))
          this.playlist.push(music)
        }
  }

  shufflePlaylist(){
    localStorage.setItem('playlist',"")
    this.songService.playlist = []
    var playlist = JSON.parse(this.backendService.getPlaylist(localStorage.getItem('username')))
      var playlistarray = playlist.songids.split(',')
      let last:any = playlistarray[playlistarray.length-1];
      if(last == ''){
        playlistarray.pop()
      }
      var m = playlistarray.length, t, i;

      while (m) {    
       i = Math.floor(Math.random() * m--);
       t = playlistarray[m];
       playlistarray[m] = playlistarray[i];
       playlistarray[i] = t;
      }
      this.songService.addSongToPlaylist(playlistarray)
      this.router.navigate(['/play'])
  }
  
  playPlaylist(){
    localStorage.setItem('playlist',"")
    this.songService.playlist = []
    var playlist = JSON.parse(this.backendService.getPlaylist(localStorage.getItem('username')))
      var playlistarray = playlist.songids.split(',')
      let last:any = playlistarray[playlistarray.length-1];
      if(last == ''){
        playlistarray.pop()
      }
      this.songService.addSongToPlaylist(playlistarray)
      this.router.navigate(['/play'])
  }

  playSong(e:any):void {
    localStorage.setItem('playlist',"")
    this.songService.playlist = []
    this.songService.addSongToPlaylist(e.id)
    this.router.navigate(['/play'])
  }

  deleteFromPlaylist(e:any){
    var playlist = JSON.parse(this.backendService.getPlaylist(localStorage.getItem('username')))
      var newplaylist = playlist.songids.split(',')
      const index = playlist.songids.split(',').indexOf(e.id.toString())
      if (index !== -1) {
        newplaylist.splice(index, 1)
        this.userplaylist.songids = newplaylist.toString()
        this.userplaylist.username = localStorage.getItem('username')
        this.backendService.editPlaylist(this.userplaylist).subscribe(data=>{
        data.songids.split(',').forEach((element:any) => {
          this.backendService.getMusicById(element)
          window.location.reload()
          })
        }
        )
      }
  }


}
