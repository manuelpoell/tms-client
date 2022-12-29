import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { UsersService } from '../users.service';
import { addUser, addUserSuccess, deleteUser, deleteUserSuccess, failedUserAction, loadUser, loadUserList, loadUserListSuccess, loadUserSuccess, openAddUserDialog, openDeleteUserDialog, openUpdateUserDialog, updateUser, updateUserSuccess } from './users.actions';

@Injectable()
export class UsersEffects {

  $loadUserList = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUserList),
      switchMap(({ limit, offset, filter }) => this.usersService.getUserList(limit, offset, filter).pipe(
        map((userList) => loadUserListSuccess({ ...userList })),
        catchError(() => of(failedUserAction({ errorMessage: 'Liste der Benutzer konnte nicht geladen werden.' })))
      ))
    );
  });

  $loadUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUser),
      switchMap(({ userId }) => this.usersService.getUser(userId).pipe(
        map((user) => loadUserSuccess({ user })),
        catchError(() => of(failedUserAction({ errorMessage: 'Benutzer konnte nicht geladen werden.' })))
      ))
    );
  });

  $addUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(addUser),
      switchMap(({ user }) => this.usersService.addUser(user).pipe(
        map((user) => addUserSuccess({ user })),
        catchError(() => of(failedUserAction({ errorMessage: 'Benutzer konnte nicht angelegt werden.' })))
      ))
    );
  });

  $addUserSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(addUserSuccess),
      tap(() => this._snackbar.open('Benutzer erfolgreich angelegt!', undefined, { duration: 5000, horizontalPosition: 'right', panelClass: ['snackbar-success'] }))
    );
  }, { dispatch: false });

  $updateUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUser),
      switchMap(({ userId, update }) => this.usersService.updateUser(userId, update).pipe(
        map((user) => updateUserSuccess({ user })),
        catchError(() => of(failedUserAction({ errorMessage: 'Benutzer konnte nicht aktualisiert werden.' })))
      ))
    );
  });

  $updateUserSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserSuccess),
      tap(() => this._snackbar.open('Benutzer erfolgreich aktualisiert!', undefined, { duration: 5000, horizontalPosition: 'right', panelClass: ['snackbar-success'] }))
    );
  }, { dispatch: false });

  $deleteUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteUser),
      switchMap(({ userId }) => this.usersService.deleteUser(userId).pipe(
        map(() => deleteUserSuccess({ userId })),
        catchError(() => of(failedUserAction({ errorMessage: 'Benutzer konnte nicht gelöscht werden.' })))
      ))
    );
  });

  $deleteUserSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteUserSuccess),
      tap(() => this._snackbar.open('Benutzer erfolgreich gelöscht!', undefined, { duration: 5000, horizontalPosition: 'right', panelClass: ['snackbar-success'] }))
    );
  }, { dispatch: false });

  $openAddUserDialog = createEffect(() => {
    return this.actions$.pipe(
      ofType(openAddUserDialog),
      tap(() => this._dialog.open(AddUserDialogComponent))
    );
  }, { dispatch: false });

  $openUpdateUserDialog = createEffect(() => {
    return this.actions$.pipe(
      ofType(openUpdateUserDialog),
      tap(({ user }) => this._dialog.open(UpdateUserDialogComponent, { data: { user } }))
    );
  }, { dispatch: false });

  $openDeleteUserDialog = createEffect(() => {
    return this.actions$.pipe(
      ofType(openDeleteUserDialog),
      tap(({ user }) => this._dialog.open(DeleteUserDialogComponent, { data: { user } }))
    );
  }, { dispatch: false });

  $failedUserAction = createEffect(() => {
    return this.actions$.pipe(
      ofType(failedUserAction),
      tap(({ errorMessage }) => this._snackbar.open(errorMessage, undefined, { duration: 5000, horizontalPosition: 'right', panelClass: ['snackbar-error'] }))
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog,
  ) {}
}