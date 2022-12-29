import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { logout } from '../auth/store/auth.actions';
import { selectTheme } from './store/layout.selectors';
import { darkTheme, lightTheme } from './store/layout.actions';
import { CommonModule } from '@angular/common';
import { selectProfileRole } from '../profile/store/profile.selectors';
import { LetModule } from '@ngrx/component';
import { loadProfile } from '../profile/store/profile.actions';

@Component({
  imports: [
    CommonModule,
    LetModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  standalone: true,
  selector: 'tms-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {

  currentTheme$ = this.store.select(selectTheme);
  userRole$ = this.store.select(selectProfileRole);

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadProfile());
  }

  toggleTheme(): void {
    this.store.dispatch(
      document.body.classList.contains('dark')
        ? lightTheme()
        : darkTheme()
    );
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}