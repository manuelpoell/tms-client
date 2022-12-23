import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { initTheme } from './layout/store/layout.actions';

@Component({
  imports: [RouterModule],
  standalone: true,
  selector: 'tms-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<router-outlet></router-outlet>`,
})
export class TMSComponent implements OnInit {
  constructor(
    private store: Store,
  ) {}

  ngOnInit() {
    this.store.dispatch(initTheme());
  }
}
