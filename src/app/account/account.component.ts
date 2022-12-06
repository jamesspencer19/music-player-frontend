import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  username: any = localStorage.getItem('username');

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
