import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginRegisterService } from '../login-register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  userName: string;
  userImage : string;
  private userSub: Subscription;

  constructor(private loginRegisterService: LoginRegisterService,
    private route: Router) { }

  ngOnInit() {
    
    this.userSub = this.loginRegisterService.user.subscribe(user => {
      if(user != null){
        this.isLoggedIn = !!user;
        this.userName = user.username;
        this.userImage = '../assets/' + user.image;
      }
    });
  }


  logOut() {
    this.isLoggedIn = false;
    this.userName = '';
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('image');
    this.route.navigate(['login']);
  }

}
