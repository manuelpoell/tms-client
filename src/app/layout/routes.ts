import { Route } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { LayoutComponent } from './layout.component';

export default [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'welcome', title: 'Willkommen!', component: WelcomeComponent },
      { path: 'not-found', title: 'Seite nicht gefunden...', component: PageNotFoundComponent },
      { path: '**', redirectTo: 'welcome' },
    ],
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
] as Array<Route>;