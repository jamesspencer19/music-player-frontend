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

  //logout from the application
  logOut(){
    //clear the local storage and nagivate back to login page
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
