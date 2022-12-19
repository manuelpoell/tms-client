import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { authReset, login, loginFailure, loginSuccess, logout, udpateTokens } from './auth.actions';
import { accessTokenStorageKey, refreshTokenStorageKey } from './auth.reducer';

@Injectable()
export class AuthEffects {

  $login = createEffect(() => {
    return this.$actions.pipe(
      ofType(login),
      switchMap(({ email, password }) => this.authService.login(email?.trim(), password?.trim()).pipe(
        map(result => loginSuccess(result)),
        catchError((err: HttpErrorResponse) => {
          return of(loginFailure({ errorMessage: err?.message || err?.error }));
        })
      ))
    );
  });

  $loginSuccess = createEffect(() => {
    return this.$actions.pipe(
      ofType(loginSuccess),
      map(({ accessToken, refreshToken }) => udpateTokens({ accessToken, refreshToken }))
    );
  });

  $redirectAfterSuccessfulLogin = createEffect(() => {
    return this.$actions.pipe(
      ofType(loginSuccess),
      switchMap(() => this.router.navigate(['app']))
    );
  }, { dispatch: false });

  $updateTokens = createEffect(() => {
    return this.$actions.pipe(
      ofType(udpateTokens),
      tap(({ accessToken, refreshToken }) => {
        localStorage.setItem(accessTokenStorageKey, accessToken);
        localStorage.setItem(refreshTokenStorageKey, refreshToken);
      })
    );
  }, { dispatch: false });

  $logout = createEffect(() => {
    return this.$actions.pipe(
      ofType(logout),
      switchMap(() => this.authService.logout().pipe(
        map(() => authReset())
      ))
    );
  });

  $authReset = createEffect(() => {
    return this.$actions.pipe(
      ofType(authReset),
      tap(() => {
        localStorage.removeItem(accessTokenStorageKey);
        localStorage.removeItem(refreshTokenStorageKey);
        this.router.navigate(['auth']);
      })
    );
  }, { dispatch: false });

  constructor(
    private $actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}