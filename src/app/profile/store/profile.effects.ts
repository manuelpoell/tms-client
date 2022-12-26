import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ProfileService } from '../profile.service';
import { changeUserPassword, changeUserPasswordCancelled, changeUserPasswordSuccess, deleteProfile, deleteProfileCancelled, failedProfileAction, loadProfile, openChangePasswordDialog, openDeleteProfileDialog, setProfile, updateProfile } from './profile.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { logout } from 'src/app/auth/store/auth.actions';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { Action } from '@ngrx/store';

@Injectable()
export class ProfileEffects implements OnInitEffects {

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
      switchMap(() => this._dialog.open(ChangePasswordDialogComponent).afterClosed().pipe(
        map(({ password, newPassword }) => {
          if (password && newPassword) return changeUserPassword({ password, newPassword });
          return changeUserPasswordCancelled();
        }),
        catchError(() => of(changeUserPasswordCancelled()))
      ))
    );
  });

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
      switchMap(() => this._dialog.open(DeleteAccountDialogComponent).afterClosed().pipe(
        map(({ password }) => {
          if (password) return deleteProfile({ password });
          return deleteProfileCancelled();
        }),
        catchError(() => of(deleteProfileCancelled()))
      ))
    );
  });

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

  ngrxOnInitEffects(): Action {
    return loadProfile();
  }
}