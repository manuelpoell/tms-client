import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { logout } from '../auth/store/auth.actions';
import { selectTheme } from './store/layout.selectors';
import { darkTheme, lightTheme } from './store/layout.actions';
import { CommonModule } from '@angular/common';

@Component({
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  standalone: true,
  selector: 'tms-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {

  currentTheme$ = this.store.select(selectTheme);

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  toggleTheme(): void {
    this.store.dispatch(
      document.body.classList.contains('dark')
        ? lightTheme()
        : darkTheme()
    );
  }

  home(): void {
    this.router.navigate(['app']);
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}