import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalenderListComponent } from './calender-list/calender-list.component';
import { CalenderComponent } from './calender/calender.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'calender', component: CalenderComponent },
  { path: 'calender-list', component: CalenderListComponent },
  { path: 'user-register', component: UserRegistrationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
