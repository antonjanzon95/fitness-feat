import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, switchMap } from 'rxjs';
import { getAccessTokenHeaders } from 'src/app/helpers/auth0.helper';
import { IUser } from 'src/app/models/IUser';
import { IWeightEntry } from 'src/app/models/IWeightEntry';

@Injectable({
  providedIn: 'root',
})
export class WeightEntryService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getWeightEntries(): Observable<IWeightEntry[]> {
    return getAccessTokenHeaders(this.auth).pipe(
      switchMap((headers) => {
        return this.http.get<IWeightEntry[]>(
          'http://localhost:3000/weightEntry',
          { headers }
        );
      })
    );
  }

  newWeightEntry(weight: number): Observable<IUser> {
    return getAccessTokenHeaders(this.auth).pipe(
      switchMap((headers) => {
        return this.http.post<IUser>(
          'http://localhost:3000/weightEntry/add',
          { weight: weight },
          { headers }
        );
      })
    );
  }

  getChallengeWeightEntries(challengeId: string): Observable<IWeightEntry[]> {
    return getAccessTokenHeaders(this.auth).pipe(
      switchMap((headers) => {
        return this.http.post<IWeightEntry[]>(
          'http://localhost:3000/weightEntry/challenge',
          { challengeId },
          { headers }
        );
      })
    );
  }

  newChallengeWeightEntry(
    weight: number,
    challengeId: string
  ): Observable<IUser> {
    return getAccessTokenHeaders(this.auth).pipe(
      switchMap((headers) => {
        return this.http.post<IUser>(
          'http://localhost:3000/weightEntry/challenge/add',
          { weight: weight, challengeId: challengeId },
          { headers }
        );
      })
    );
  }
}
