import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  searchText:any;

  data= [
    {id: 1, image:"", song:"Absadfdsac",artist:"Absadfdc"},
    {id: 2, image:"", song:"Absadfc",artist:"Asadfdsbc"},
    {id: 3, image:"", song:"Asadfdsbc",artist:"Abasfdc"},
    {id: 4, image:"", song:"Asadfdsbc",artist:"Abasdfsdc"},
    {id: 5, image:"", song:"Absdafsdafc",artist:"james"},
    {id: 6, image:"", song:"Abasdfdsc",artist:"Absafdsc"},
    {id: 7, image:"", song:"Aasdfbc",artist:"Abasdfdsc"},
    {id: 8, image:"", song:"Asadfbc",artist:"Abasfdsdc"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
