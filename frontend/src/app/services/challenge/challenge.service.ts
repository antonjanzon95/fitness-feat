import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, switchMap } from 'rxjs';
import { getAccessTokenHeaders } from 'src/app/helpers/auth0.helper';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getChallenges(): Observable<any> {
    return getAccessTokenHeaders(this.auth).pipe(
      switchMap((headers) => {
        return this.http.get('http://localhost:3000/challenges/all', {
          headers,
        });
      })
    );
  }

  addChallenge(
    name: string,
    description: string,
    visibility: string,
    startDate: Date,
    endDate: Date
  ): Observable<any> {
    return getAccessTokenHeaders(this.auth).pipe(
      switchMap((headers) => {
        return this.http.post(
          'http://localhost:3000/challenges/add',
          {
            name: name,
            description: description,
            visibility: visibility,
            startDate: startDate,
            endDate: endDate,
          },
          { headers }
        );
      })
    );
  }
}
