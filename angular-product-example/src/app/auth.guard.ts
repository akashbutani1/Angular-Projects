import { Injectable, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginRegisterService } from './login-register.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: LoginRegisterService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    if (!!localStorage.getItem('token')) {
      return true;
    }
    else {
      this.authService.redirectUrl = url;
      // Navigate to the login page 
      this.router.navigate(['/login']);
      return false;
    }
  }


}
