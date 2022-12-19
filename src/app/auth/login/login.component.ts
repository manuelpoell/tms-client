import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../store/auth.actions';

@Component({
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  standalone: true,
  selector: 'tms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  hidePassword = true;
  loginForm: FormGroup = this.fb.group({
    email: this.fb.control('', { validators: [ Validators.required, Validators.email ] }),
    password: this.fb.control('', { validators: [ Validators.required ] })
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  login(): void {
    this.store.dispatch(login(this.loginForm.getRawValue()));
  }
}