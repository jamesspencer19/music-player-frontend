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
    this.backendService.getPlaylist(localStorage.getItem('username')).subscribe(data=>{
      var playlistarray = data.songids.split(',')
      let last:any = playlistarray[playlistarray.length-1];
      if(last == ''){
        playlistarray.pop()
      }
      console.log(playlistarray)
      playlistarray.forEach((element:any) => {
        this.backendService.getMusicById(element).subscribe(data=>
          this.playlist.push(data))})
    }
    )
  }

  playSong(e:any):void {
    this.songService.setSong(e.songpath,e.imagepath,e.song)
    this.router.navigate(['/play'])
  }

  deleteFromPlaylist(e:any){
    this.backendService.getPlaylist(localStorage.getItem('username')).subscribe(data=>{
      var newplaylist = data.songids.split(',')
      console.log(newplaylist)
      const index = data.songids.split(',').indexOf(e.id.toString())
      if (index !== -1) {
        newplaylist.splice(index, 1)
        console.log(newplaylist.toString())
        this.userplaylist.songids = newplaylist.toString()
        this.userplaylist.username = localStorage.getItem('username')
        console.log(this.userplaylist)
        this.backendService.editPlaylist(this.userplaylist).subscribe(data=>{
        data.songids.split(',').forEach((element:any) => {
          this.backendService.getMusicById(element)
          window.location.reload()
          })
        }
        )
      }
    })
  }


}
