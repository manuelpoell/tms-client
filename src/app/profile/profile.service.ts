import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../users/models/user.models';

@Injectable()
export class ProfileService {
  constructor(
    private http: HttpClient
  ) {}

  getProfile(): Observable<User> {
    return this.http.get<User>(`${environment.apiPath}/users/me`);
  }

  updateProfile(update: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${environment.apiPath}/users/me`, update);
  }

  changePassword(password: string, newPassword: string): Observable<void> {
    return this.http.patch<void>(`${environment.apiPath}/users/me/password`, { password, newPassword });
  }

  deleteProfile(password: string): Observable<void> {
    return this.http.put<void>(`${environment.apiPath}/users/me`, { password });
  }
}