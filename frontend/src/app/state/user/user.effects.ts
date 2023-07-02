import { createEffect, Actions, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user/user.service';
import { UserActions } from './user.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UserEffects {
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      concatMap(({ user }) => {
        console.log(user);
        return this.userService.addUser(user).pipe(
          map((response) => UserActions.loginSuccess({ user: response })),
          catchError((error) => of(UserActions.loginFailure({ error })))
        );
      })
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
