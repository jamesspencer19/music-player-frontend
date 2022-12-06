import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _service: RegistrationService, private _router: Router) { }

  user = new User()

  ngOnInit(): void {
  }

  loginUser(){
    this._service.loginUserFromRemote(this.user).subscribe(
      data => {
        console.log("Response Recieved")
        localStorage.setItem('token', 'loggedin')
        localStorage.setItem('username', this.user.username)
        this._router.navigate(['/play'])
      },
      error=> {
        console.log("Exception Occurred")
        alert("Invalid Username or Password")
      }
    )
  }

}
