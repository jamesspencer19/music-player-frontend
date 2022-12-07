import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { User } from '../user';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  searchText:any;

  data=[]
  
  constructor(private _service: BackendService) { }

  ngOnInit(): void {
    this._service.getMusicLibrary().subscribe(
      data => this.data = data
    )
  }

}
