import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  standalone: true,
  selector: 'tms-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css'],
})
export class ChangePasswordDialogComponent {

  hideCurrentPassword = true;
  hideNewPassword = true;

  changePasswordForm = this.fb.group({
    password: new FormControl('', { validators: Validators.required }),
    newPassword: new FormControl('', { validators: Validators.required }),
  });
  
  constructor(
    private fb: FormBuilder
  ) {}
}