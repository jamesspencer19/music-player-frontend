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

  constructor(private _service: BackendService, private _router: Router) { }

  user = new User()

  ngOnInit(): void {
  }

  loginUser(){
    this._service.loginUserFromRemote(this.user).subscribe(
      data => {
        console.log("Response Recieved")
        console.log(data)
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
