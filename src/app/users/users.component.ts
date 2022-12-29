import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PushModule } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { User } from './models/user.models';
import { loadUserList, openAddUserDialog, openDeleteUserDialog, openUpdateUserDialog, resetUserList } from './store/users.actions';
import { selectFilterCount, selectTotalCount, selectUsers } from './store/users.selectors';
import { debounce } from 'lodash-es';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PushModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    InfiniteScrollModule,
  ],
  standalone: true,
  selector: 'tms-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, OnDestroy {

  users$ = this.store.select(selectUsers);
  totalCount$ = this.store.select(selectTotalCount);
  filterCount$ = this.store.select(selectFilterCount);

  limit = 10;
  offset = 0;
  filter = new FormControl('');

  subscription = new Subscription();

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(resetUserList());
    this.store.dispatch(loadUserList({
      limit: this.limit,
      offset: this.offset,
      filter: this.filter.value ?? '',
    }));

    this.subscription.add(
      this.filter.valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(500),
      ).subscribe({
        next: () => this.resetUserList()
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadAdditionalUsers(): void {
    this.offset = this.offset + this.limit;
    this.store.dispatch(loadUserList({
      limit: this.limit,
      offset: this.offset,
      filter: this.filter.value ?? '',
    }));
  }
  debouncedLoadUsers = debounce(this.loadAdditionalUsers, 1000);

  resetUserList(): void {
    this.store.dispatch(resetUserList());
    this.offset = 0;
    this.store.dispatch(loadUserList({
      limit: this.limit,
      offset: this.offset,
      filter: this.filter.value ?? '',
    }));
  }

  addUser(): void {
    this.store.dispatch(openAddUserDialog());
  }

  updateUser(user: User): void {
    this.store.dispatch(openUpdateUserDialog({ user }));
  }

  deleteUser(user: User): void {
    this.store.dispatch(openDeleteUserDialog({ user }));
  }
}