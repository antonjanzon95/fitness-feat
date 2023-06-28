import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user/user.service';
import { UserActions } from './user.actions';
import { catchError, concatMap, map, of } from 'rxjs';

export const loginUser = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(UserActions.login),
      concatMap(({ user }) => {
        return userService.addUser(user).pipe(
          map((response) => UserActions.loginSuccess({ user: response })),
          catchError((error) => of(UserActions.loginFailure({ error })))
        );
      })
    );
  },
  { functional: true }
);
