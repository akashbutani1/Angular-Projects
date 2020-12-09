import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from './login-register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Product Example';
  isLoggedIn : boolean = false;
  userName : string = '';

  constructor(private loginRegisterService : LoginRegisterService,
    private route : Router){}

  ngOnInit(){
    
    this.loginRegisterService.getLoggedInUserDetails()
    .subscribe(userdata => {
      if(userdata != null){
        this.isLoggedIn = true;
        this.userName = userdata.username;
      }
    })
  }

  logOut(){
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');
    this.loginRegisterService.loginstatus = false;
    this.isLoggedIn = false;
    this.userName = '';
    this.route.navigate(['login']);
  }
}
