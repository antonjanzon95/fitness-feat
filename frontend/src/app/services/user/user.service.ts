import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, from, switchMap } from 'rxjs';
import { getAccessTokenHeaders } from 'src/app/helpers/auth0.helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getUsers(): Observable<any> {
    return getAccessTokenHeaders(this.auth).pipe(
      switchMap((headers) => {
        return this.http.get('http://localhost:3000/users', { headers });
      })
    );
  }

  addUser(
    name: string,
    email: string,
    auth0Id: string,
    picture: string
  ): Observable<any> {
    return getAccessTokenHeaders(this.auth).pipe(
      switchMap((headers) => {
        return this.http.post(
          'http://localhost:3000/users/login',
          { name: name, email: email, auth0Id: auth0Id, picture: picture },
          { headers }
        );
      })
    );
  }
}
