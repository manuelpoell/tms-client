import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsersList } from './models/user-list.models';
import { User } from './models/user.models';

@Injectable()
export class UsersService {

  constructor(
    private http: HttpClient,
  ) {}

  getUserList(limit: number, offset: number, filter: string): Observable<UsersList> {
    return this.http.get<UsersList>(`${environment.apiPath}/users`, { params: { limit, offset, filter } });
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${environment.apiPath}/users/${userId}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiPath}/users`, { ...user });
  }

  updateUser(userId: string, update: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${environment.apiPath}/users/${userId}`, { ...update });
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiPath}/users/${userId}`);
  }

}