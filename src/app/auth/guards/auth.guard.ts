import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { refreshTokenStorageKey } from '../store/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {}

  /**
   * Protects this route for authenticated users only.
   * @returns 
   */
  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (localStorage.getItem(refreshTokenStorageKey) != null) return true;
    this.router.navigate(['auth']);
    return false;
  }
}