import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { logout } from '../auth/store/auth.actions';

@Component({
  imports: [
    MatButtonModule
  ],
  standalone: true,
  selector: 'tms-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  constructor(
    private store: Store
  ) {}

  logout(): void {
    this.store.dispatch(logout());
  }
}