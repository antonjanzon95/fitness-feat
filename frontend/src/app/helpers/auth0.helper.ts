import { Observable, from, map } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { HttpHeaders } from '@angular/common/http';

export function getAccessTokenHeaders(
  auth: AuthService
): Observable<HttpHeaders> {
  return from(auth.getAccessTokenSilently()).pipe(
    map((token) => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return headers;
    })
  );
}
