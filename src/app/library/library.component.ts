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

  data=[];

  userplaylist = new UserPlaylist
  
  constructor(private service: BackendService, private songservice: SongService, private router:Router) { }

  ngOnInit(): void {
    this.service.getMusicLibrary().subscribe(
      data => this.data = data
    )
  }

  playSong(e:any):void {
    this.songservice.setSong(e.songpath,e.imagepath,e.song)
    this.router.navigate(['/play'])
  }

  addToPlaylist(e:any):void {
    this.service.getPlaylist(localStorage.getItem('username')).subscribe(data=>{
      this.userplaylist.username = localStorage.getItem('username')
      this.userplaylist.songids = data.songids+e.id+','.toString()
      console.log(this.userplaylist)
      this.service.editPlaylist(this.userplaylist).subscribe(data=>
        console.log(data))
    })
  }

}
