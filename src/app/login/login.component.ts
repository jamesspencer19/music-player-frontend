import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _service: BackendService, private router: Router) { }

  user = new User()

  ngOnInit(): void {
  }

  //login user verifiying credentials
  loginUser(){
    this._service.loginUserFromRemote(this.user).subscribe(
      //if the login request is successfull navigate to the play page
      data => {
        console.log("Response Recieved")
        localStorage.setItem('token', 'loggedin')
        localStorage.setItem('username', this.user.username)
        localStorage.setItem('playlist', "")
        this.router.navigate(['/play'])
      },
      //if the login request is unsucessfull display the the credentials are incorrect
      error=> {
        console.log("Exception Occurred")
        alert("Invalid Username or Password")
      }
    )
  }

}
