import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { PlayComponent } from '../play/play.component';
import { SongService } from '../song.service';
import { User } from '../user';
import { UserPlaylist } from '../user-playlist';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  searchText:any;

  data:[];

  userplaylist = new UserPlaylist
  
  constructor(private backendservice: BackendService, private songservice: SongService, private router:Router) { }

  ngOnInit(): void {
    this.data = JSON.parse(this.backendservice.getMusicLibrary())
  }

  playSong(e:any):void {
    localStorage.setItem('playlist', "")
    this.songservice.playlist = []
    this.songservice.addSongToPlaylist(e.id)
    this.router.navigate(['/play'])
  }

  addToPlaylist(e:any):void {
    var playlist = JSON.parse(this.backendservice.getPlaylist(localStorage.getItem('username')))
    this.userplaylist.username = localStorage.getItem('username')
    this.userplaylist.songids = playlist.songids+e.id+','.toString()
    this.backendservice.editPlaylist(this.userplaylist).subscribe()
  }

}
