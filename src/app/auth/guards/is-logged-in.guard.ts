import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { refreshTokenStorageKey } from '../store/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  /**
   * Redirects to app route when user is already logged in.
   * @returns 
   */
  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!localStorage.getItem(refreshTokenStorageKey)) return true;
    this.router.navigate(['app']);
    return false;
  }
}