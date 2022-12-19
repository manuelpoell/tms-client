import { HttpInterceptorFn } from '@angular/common/http';
import { accessTokenStorageKey, refreshTokenStorageKey } from '../store/auth.reducer';

/**
 * Sets the accessToken for all requests as Bearer Auth Token header.
 * Uses the refreshToken for the refresh-Request instead.
 * @param req 
 * @param next 
 * @returns 
 */
export const AuthTokenInterceptor: HttpInterceptorFn = (req, next) => {
  let bearerToken = '';

  if (req.url.includes('/auth/refresh')) {
    bearerToken = localStorage.getItem(refreshTokenStorageKey) ?? '';
  } else {
    bearerToken = localStorage.getItem(accessTokenStorageKey) ?? '';
  }

  if (bearerToken) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${bearerToken}`)
    });
  }

  return next(req);
};
