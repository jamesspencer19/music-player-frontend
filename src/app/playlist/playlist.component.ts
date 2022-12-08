import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(private service: SongService) { }

  playlist: string[] = this.service.playlist

  searchText:string

  ngOnInit(): void {
  }

}
