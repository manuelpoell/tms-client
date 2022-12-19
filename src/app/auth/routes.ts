import { Route } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';

export default [
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
    providers: [AuthService],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
] as Array<Route>;