import { Route } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LayoutComponent } from './layout.component';

export default [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', title: 'TMS - Dashboard', component: DashboardComponent },
      { path: 'not-found', title: 'Seite nicht gefunden...', component: PageNotFoundComponent },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
] as Array<Route>;