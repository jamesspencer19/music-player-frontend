import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { LibraryComponent } from '../library/library.component';
import { SongService } from '../song.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor(private songservice:SongService, private backendservice:BackendService,private router:Router) {
  }

  currentsong:string
  currentimage: any
  currentname: any
  playlist:any[] = []
  result:any

  ngOnInit(): void {
    var array:any = []
    if(localStorage.getItem('playlist')?.toString().split(',').filter(Number).length == 0){
      array = this.songservice.playlist.toString().split(',')
    }
    else if(localStorage.getItem('playlist') != "0" || localStorage.getItem('playlist') != null){
      array = localStorage.getItem('playlist')?.split(',')
    }
    array = array.filter(Number)
    if (array.length ==0 && this.currentsong == undefined){
      this.currentname = "..."
      this.currentimage = "assets/blank.png"
      return
    }
    if(array.length >1){
      let data = JSON.parse(this.backendservice.getMusicById(array[0]))
      this.currentname = data.song
      this.currentsong = data.songpath
      this.currentimage = data.imagepath
    }
    for(let e in array){
      let data = JSON.parse(this.backendservice.getMusicById(array[e]))
      if(e == "0"){
        this.currentname = data.song
        this.currentsong = data.songpath
        this.currentimage = data.imagepath
      }else{
        this.playlist.push(data)
      }
    }
  }

  playSong(e:any){
    var array:any
    if(this.songservice.playlist.toString().split(',').filter(Number).length != 0){
      array = this.songservice.playlist.toString().split(',')
    }
    else{
      array = (localStorage.getItem('playlist') as string).split(',')
    }
    const index = array.indexOf(e.id.toString())
    console.log(array)
    if (index !== -1) {
      array.splice(index, 1)
    }
    array.shift()
    array.unshift(e.id.toString())
    localStorage.setItem('playlist', array.toString())
    window.location.reload()
  }

}
