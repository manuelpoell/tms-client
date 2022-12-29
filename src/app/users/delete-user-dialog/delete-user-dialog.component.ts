import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from '../models/user.models';
import { deleteUser } from '../store/users.actions';

@Component({
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  standalone: true,
  selector: 'tms-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteUserDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    private store: Store,
  ) {}

  delete(): void {
    this.store.dispatch(deleteUser({ userId: this.data.user.id }));
    this.dialogRef.close();
  }
}