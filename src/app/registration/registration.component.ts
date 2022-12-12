import { Component, OnInit } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { timeInterval } from 'rxjs';
import { BackendService } from '../backend.service';
import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User()
  success = false;

  constructor(private _service: BackendService, private router: Router) { }

  ngOnInit(): void {
  }
  
  //make a http request to sign up a user and save credentials
  signUpUser(){
    this._service.signUpUserFromRemote(this.user).subscribe(
      //if request is successful redirect to login and display success
      data => {
        this.success = true;
        alert("Successfully Created Account - Redirecting")
        setTimeout(()=>this.router.navigate(['']), 5000)
      },
      //if there is an error prompt the user to retry
      error=> {
        console.log("Exception Occurred")
        alert("Invalid Username or Password")
      }
    )
  }

}
