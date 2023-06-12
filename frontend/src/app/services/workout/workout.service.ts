import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, switchMap } from 'rxjs';
import { getAccessTokenHeaders } from 'src/app/helpers/auth0.helper';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getWorkouts(): Observable<any> {
    return getAccessTokenHeaders(this.auth).pipe(
      switchMap((headers) => {
        return this.http.get('http://localhost:3000/workouts', { headers });
      })
    );
  }

  addWorkout(
    type: string,
    duration: number,
    intensity: string
  ): Observable<any> {
    return getAccessTokenHeaders(this.auth).pipe(
      switchMap((headers) => {
        return this.http.post(
          'http://localhost:3000/workouts/add',
          { type: type, duration: duration, intensity: intensity },
          { headers }
        );
      })
    );
  }
}
