import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResult } from './models/auth-result.models';
import { authReset, udpateTokens } from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private store: Store,
  ) {}

  /**
   * Performs user login.
   * @param credentials 
   * @returns 
   */
  login(email: string, password: string): Observable<AuthResult> {
    return this.http.post<AuthResult>(`${environment.apiPath}/auth/login`, { email, password });
  }

  /**
   * Fetches new access and refresh tokens.
   * @returns 
   */
  refreshTokens(): Observable<AuthResult> {
    return this.http.get<AuthResult>(`${environment.apiPath}/auth/refresh`).pipe(
      tap(({ accessToken, refreshToken }) => this.store.dispatch(udpateTokens({ accessToken, refreshToken }))),
      catchError((err) => {
        this.store.dispatch(authReset());
        return throwError(() => err);
      })
    );
  }

  /**
   * Performs user logout.
   * @returns 
   */
  logout(): Observable<void> {
    return this.http.post<void>(`${environment.apiPath}/auth/logout`, null);
  }
}