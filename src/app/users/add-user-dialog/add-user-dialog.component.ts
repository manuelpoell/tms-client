import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { UserRoleOption } from '../models/user-role.options';
import { addUser } from '../store/users.actions';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
  ],
  standalone: true,
  selector: 'tms-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserDialogComponent {

  hidePassword = true;
  userRoles = UserRoleOption;

  userForm: FormGroup = this.fb.group({
    firstName: new FormControl('', { validators: [ Validators.required ] }),
    lastName: new FormControl('', { validators: [ Validators.required ] }),
    email: new FormControl('', { validators: [ Validators.required, Validators.email ] }),
    password: new FormControl('', { validators: [ Validators.required ] }),
    role: new FormControl('', { validators: [ Validators.required ] }),
  });

  constructor(
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    private store: Store,
    private fb: FormBuilder,
  ) {}

  add(): void {
    this.store.dispatch(addUser({ user: { ...this.userForm.value } }));
    this.dialogRef.close();
  }
}