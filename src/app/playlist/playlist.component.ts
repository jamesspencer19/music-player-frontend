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


  //On page load
  ngOnInit(): void {
    //retrieve the users playlist
      var playlist = JSON.parse(this.backendService.getPlaylist(localStorage.getItem('username')))
      var playlistarray = playlist.songids.split(',')
      let last:any = playlistarray[playlistarray.length-1];
      //remove the trailing ',' from the list of song Ids
      if(last == ''){
        playlistarray.pop()
      }
      //for each songid in the playlist retrieve the song data
      for(var e in playlistarray){
        var music = JSON.parse(this.backendService.getMusicById(playlistarray[e]))
          this.playlist.push(music)
        }
  }

  //shuffle the users playlist and start playing the music
  shufflePlaylist(){
    localStorage.setItem('playlist',"")
    this.songService.playlist = []
    //retrieve the users playlist
    var playlist = JSON.parse(this.backendService.getPlaylist(localStorage.getItem('username')))
      var playlistarray = playlist.songids.split(',')
      let last:any = playlistarray[playlistarray.length-1];
      //remove the trailing comma from the list of songIds
      if(last == ''){
        playlistarray.pop()
      }
      var m = playlistarray.length, t, i;
      //randomize the order of the playlist
      while (m) {    
       i = Math.floor(Math.random() * m--);
       t = playlistarray[m];
       playlistarray[m] = playlistarray[i];
       playlistarray[i] = t;
      }
      //add the shuffled songs to the song service playlist array
      this.songService.addSongToPlaylist(playlistarray)
      //navigate to the music player page
      this.router.navigate(['/play'])
  }
  
  //play the users playlist from the start
  playPlaylist(){
    localStorage.setItem('playlist',"")
    this.songService.playlist = []
    //retrieve the users playlist
    var playlist = JSON.parse(this.backendService.getPlaylist(localStorage.getItem('username')))
      var playlistarray = playlist.songids.split(',')
      let last:any = playlistarray[playlistarray.length-1];
      //remove trailing comma from list of songids
      if(last == ''){
        playlistarray.pop()
      }
      //add the songs to the song service playlist array
      this.songService.addSongToPlaylist(playlistarray)
      //navigate to the music player page
      this.router.navigate(['/play'])
  }

  //play an individual song
  playSong(e:any):void {
    localStorage.setItem('playlist',"")
    this.songService.playlist = []
    this.songService.addSongToPlaylist(e.id)
    this.router.navigate(['/play'])
  }

  //remove a song from the users playlist
  deleteFromPlaylist(e:any){
    //retrieve the playlist
    var playlist = JSON.parse(this.backendService.getPlaylist(localStorage.getItem('username')))
      var newplaylist = playlist.songids.split(',')
      //find the index of the song that needs to be removed
      const index = playlist.songids.split(',').indexOf(e.id.toString())
      if (index !== -1) {
        //remove the song
        newplaylist.splice(index, 1)
        this.userplaylist.songids = newplaylist.toString()
        this.userplaylist.username = localStorage.getItem('username')
        //edit the playlist in the database
        this.backendService.editPlaylist(this.userplaylist).subscribe(data=>{
          if(data.songids.split(',').length == 1){
            window.location.reload()
            return
          }else{
            data.songids.split(',').forEach((element:any) => {
              this.backendService.getMusicById(element)
              //reload page to display changes
              window.location.reload()
              })
          }
        }
        )
      }
  }


}
