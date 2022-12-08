import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { PlayComponent } from '../play/play.component';
import { SongService } from '../song.service';
import { User } from '../user';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  searchText:any;

  data=[];
  
  constructor(private _service: BackendService, private songservice: SongService, private router:Router) { }

  ngOnInit(): void {
    this._service.getMusicLibrary().subscribe(
      data => this.data = data
    )
  }

  playSong(e:any):void {
    this.songservice.setSong(e.songpath,e.imagepath,e.song)
    this.router.navigate(['/play'])
  }

  addToPlaylist(e:any):void {
    this.songservice.addSongToPlaylist(e)
  }

}
