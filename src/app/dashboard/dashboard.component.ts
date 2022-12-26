import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LetModule } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { selectProfile } from '../profile/store/profile.selectors';

@Component({
  imports: [
    LetModule,
    MatCardModule,
  ],
  standalone: true,
  selector: 'tms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {

  profile$ = this.store.select(selectProfile);

  constructor(
    private store: Store
  ) {}
}