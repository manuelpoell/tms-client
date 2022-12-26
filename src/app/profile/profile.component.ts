import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadProfile, openChangePasswordDialog, openDeleteProfileDialog, updateProfile } from './store/profile.actions';
import { selectProfile } from './store/profile.selectors';

@Component({
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
  ],
  standalone: true,
  selector: 'tms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {

  profile$ = this.store.select(selectProfile);
  subscription = new Subscription();

  profileForm: FormGroup = this.fb.group({
    firstName: new FormControl(
      { value: '', disabled: true },
      { validators: [ Validators.required ] }
    ),
    lastName: new FormControl(
      { value: '', disabled: true },
      { validators: [ Validators.required ] }
    ),
    email: new FormControl(
      { value: '', disabled: true },
      { validators: [ Validators.required, Validators.email ] }
    ),
  });
  password = new FormControl({ value: '*********', disabled: true });

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadProfile());

    const s = this.profile$.subscribe(user => this.profileForm.patchValue({ ...user }));
    this.subscription.add(s);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveProfile(): void {
    if (this.profileForm.invalid) return;
    this.store.dispatch(updateProfile({ update: this.profileForm.getRawValue() }));
    this.profileForm.disable();
  }

  changePassword(): void {
    this.store.dispatch(openChangePasswordDialog());
  }

  deleteProfile(): void {
    this.store.dispatch(openDeleteProfileDialog());
  }
}