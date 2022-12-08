import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryComponent } from '../library/library.component';
import { SongService } from '../song.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor(private songservice:SongService) {
  }

  currentsong:any
  currentimage: any
  currentname: any

  ngOnInit(): void {
    this.currentname = this.songservice.currentname
    this.currentsong = this.songservice.currentsong
    this.currentimage = this.songservice.currentimage
    console.log(this.currentname, this.currentsong, this.currentimage)
    if(this.currentsong == undefined){
      this.currentname = "..."
      this.currentimage = "assets/blank.png"
    }
  }

}
