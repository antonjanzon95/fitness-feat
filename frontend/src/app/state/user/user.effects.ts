import { createEffect, Actions, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user/user.service';
import { UserActions } from './user.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { WeightEntryService } from 'src/app/services/weight-entry/weight-entry.service';

@Injectable()
export class UserEffects {
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      concatMap(({ user }) => {
        return this.userService.addUser(user).pipe(
          map((response) => UserActions.loginSuccess({ user: response })),
          catchError((error) => of(UserActions.loginFailure({ error })))
        );
      })
    )
  );

  weightEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.newWeightEntry),
      concatMap(({ weight }) => {
        return this.weightEntryService.newWeightEntry(weight).pipe(
          map((response) =>
            UserActions.newWeightEntrySuccess({ user: response })
          ),
          catchError((error) =>
            of(UserActions.newWeightEntryFailure({ error }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private weightEntryService: WeightEntryService
  ) {}
}
