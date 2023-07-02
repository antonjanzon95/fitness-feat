import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { getAccessTokenHeaders } from 'src/app/helpers/auth0.helper';
import { IUser } from 'src/app/models/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private userSubject = new BehaviorSubject<IUser | null>(null);

  user$ = this.userSubject.asObservable();

  getUsers(): Observable<any> {
    return getAccessTokenHeaders(this.auth).pipe(
      switchMap((headers) => {
        return this.http.get<IUser[]>('http://localhost:3000/users', {
          headers,
        });
      })
    );
  }

  getUser(): Observable<any> {
    return getAccessTokenHeaders(this.auth).pipe(
      switchMap((headers) => {
        return this.http.get<IUser>('http://localhost:3000/users/user', {
          headers,
        });
      }),
      tap((user: IUser) => this.userSubject.next(user))
    );
  }

  updateUserImage(imageUrl: string): Observable<any> {
    return getAccessTokenHeaders(this.auth).pipe(
      switchMap((headers) => {
        return this.http.post<IUser>(
          'http://localhost:3000/users/user/image',
          { imageUrl },
          { headers }
        );
      }),
      tap((user: IUser) => this.userSubject.next(user))
    );
  }

  addUser(user: User): Observable<any> {
    return getAccessTokenHeaders(this.auth).pipe(
      switchMap((headers) => {
        return this.http.post<IUser>(
          'http://localhost:3000/users/login',
          {
            name: user.name,
            email: user.email,
            auth0Id: user.sub,
            picture: user.picture,
          },
          { headers }
        );
      }),
      tap((user: IUser) => this.userSubject.next(user))
    );
  }
}
