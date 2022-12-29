import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { ProfileComponent } from '../profile/profile.component';
import { ProfileService } from '../profile/profile.service';
import { ProfileEffects } from '../profile/store/profile.effects';
import { profileFeature } from '../profile/store/profile.reducer';
import { UsersEffects } from '../users/store/users.effects';
import { usersFeature } from '../users/store/users.reducer';
import { UsersComponent } from '../users/users.component';
import { UsersService } from '../users/users.service';
import { LayoutComponent } from './layout.component';

export default [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', title: 'TMS - Dashboard', component: DashboardComponent },
      { path: 'profile', title: 'TMS - Account', component: ProfileComponent },
      { path: 'users', title: 'TMS - Benutzerverwaltung', component: UsersComponent },
      { path: 'not-found', title: 'Seite nicht gefunden...', component: PageNotFoundComponent },
      { path: '**', redirectTo: 'dashboard' },
    ],
    providers: [
      ProfileService,
      UsersService,
      provideState(profileFeature),
      provideState(usersFeature),
      provideEffects([
        ProfileEffects,
        UsersEffects
      ]),
    ]
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
] as Array<Route>;