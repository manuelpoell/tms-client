import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ProfileService } from '../profile.service';
import { changeUserPassword, changeUserPasswordSuccess, deleteProfile, failedProfileAction, loadProfile, openChangePasswordDialog, openDeleteProfileDialog, setProfile, updateProfile } from './profile.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { logout } from 'src/app/auth/store/auth.actions';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';

@Injectable()
export class ProfileEffects {

  $loadProfile = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProfile),
      switchMap(() => this.profileService.getProfile().pipe(
        map((user) => setProfile({ profile: user })),
        catchError(() => {
          return of(failedProfileAction({ errorMessage: 'Profil konnte nicht geladen werden.' }))
        })
      ))
    );
  });

  $updateProfile = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProfile),
      switchMap(({ update }) => this.profileService.updateProfile({ ...update }).pipe(
        map((user) => setProfile({ profile: user })),
        catchError(() => {
          return of(failedProfileAction({ errorMessage: 'Profil konnte nicht aktualisiert werden.' }))
        })
      ))
    );
  });

  $openChangePasswordDialog = createEffect(() => {
    return this.actions$.pipe(
      ofType(openChangePasswordDialog),
      tap(() => this._dialog.open(ChangePasswordDialogComponent))
    );
  }, { dispatch: false });

  $changeUserPassword = createEffect(() => {
    return this.actions$.pipe(
      ofType(changeUserPassword),
      switchMap(({ password, newPassword }) => this.profileService.changePassword(password, newPassword).pipe(
        map(() => changeUserPasswordSuccess()),
        catchError(() => {
          return of(failedProfileAction({ errorMessage: 'Passwort konnte nicht geändert werden.' }))
        })
      ))
    );
  });

  $changeUserPasswordSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(changeUserPasswordSuccess),
      tap(() => this._snackbar.open('Passwort erfolgreich geändert!', undefined, { duration: 5000, horizontalPosition: 'right', panelClass: ['snackbar-success'] }))
    );
  }, { dispatch: false });

  $openDeleteProfileDialog = createEffect(() => {
    return this.actions$.pipe(
      ofType(openDeleteProfileDialog),
      tap(() => this._dialog.open(DeleteAccountDialogComponent))
    );
  }, { dispatch: false });

  $deleteProfile = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteProfile),
      switchMap(({ password }) => this.profileService.deleteProfile(password).pipe(
        map(() => logout()),
        catchError(() => {
          return of(failedProfileAction({ errorMessage: 'Profil konnte nicht gelöscht werden.' }))
        })
      ))
    );
  });

  $failedProfileAction = createEffect(() => {
    return this.actions$.pipe(
      ofType(failedProfileAction),
      tap((error) => 
        this._snackbar.open(error.errorMessage, undefined, { duration: 5000, horizontalPosition: 'right', panelClass: ['snackbar-error'] })
      )
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog,
  ) {}
}