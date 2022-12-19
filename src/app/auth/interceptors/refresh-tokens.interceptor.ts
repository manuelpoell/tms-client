import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth.service';

/**
 * On expired accessTokens the tokens will be refreshed 
 * and the previous request is sent again.
 * @param req 
 * @param next 
 * @returns 
 */
export const RefreshTokensInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status !== 401 || req.url.includes('/auth/refresh')) {
        return throwError(() => err);
      }

      return authService.refreshTokens().pipe(
        switchMap(({ accessToken }) => {
          return next(req.clone({ headers: req.headers.set('Authorization', `Bearer ${accessToken}`) }))
        })
      );
    })
  );
};