import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { changeUserPassword } from '../store/profile.actions';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordDialogComponent {

  hideCurrentPassword = true;
  hideNewPassword = true;

  changePasswordForm = this.fb.group({
    password: new FormControl('', { validators: Validators.required }),
    newPassword: new FormControl('', { validators: Validators.required }),
  });
  
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private fb: FormBuilder,
    private store: Store,
  ) {}

  changePassword(): void {
    const { password, newPassword } = this.changePasswordForm.getRawValue();
    this.store.dispatch(changeUserPassword({
      password: password ?? '',
      newPassword: newPassword ?? ''
    }));
    this.dialogRef.close();
  }
}