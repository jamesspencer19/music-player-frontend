import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { SongService } from '../song.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(private songService: SongService, private backendService:BackendService) { }

  playlist:any=[];

  playlistsongids=[];

  searchText:string

  ngOnInit(): void {
    this.backendService.getPlaylist(localStorage.getItem('username')).subscribe(data=>
      localStorage.setItem("songsids", data.songids)
    )
    var array = localStorage.getItem("songsids")?.split(',')
    console.log(array)
    array?.forEach((element) => {
      this.backendService.getMusicById(element).subscribe(data=>
        this.playlist.push(data))})
  }


}
