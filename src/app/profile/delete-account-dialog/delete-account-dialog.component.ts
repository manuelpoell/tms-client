import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { deleteProfile } from '../store/profile.actions';

@Component({
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  selector: 'tms-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAccountDialogComponent {

  password = new FormControl('', { validators: [ Validators.required ] });

  constructor(
    public dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
    private store: Store
  ) {}

  deleteAccount(): void {
    this.store.dispatch(deleteProfile({ password: this.password.value ?? '' }));
    this.dialogRef.close();
  }
}