import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { UserRoleOption } from '../models/user-role.options';
import { User } from '../models/user.models';
import { updateUser } from '../store/users.actions';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  standalone: true,
  selector: 'tms-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserDialogComponent implements OnInit {

  userRoles = UserRoleOption;

  userForm: FormGroup = this.fb.group({
    id: new FormControl({ value: '', disabled: true }),
    firstName: new FormControl('', { validators: [ Validators.required ] }),
    lastName: new FormControl('', { validators: [ Validators.required ] }),
    email: new FormControl('', { validators: [ Validators.required, Validators.email ] }),
    role: new FormControl('', { validators: Validators.required }),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    private store: Store,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.userForm.patchValue({ ...this.data.user });
  }

  update(): void {
    this.store.dispatch(updateUser({ userId: this.data.user.id, update: { ...this.userForm.value } }));
    this.dialogRef.close();
  }
}