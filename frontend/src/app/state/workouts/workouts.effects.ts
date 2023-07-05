import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WorkoutActions } from './workouts.actions';
import { Injectable } from '@angular/core';
import { WorkoutService } from 'src/app/services/workout/workout.service';
import { catchError, map, of, exhaustMap, concatMap } from 'rxjs';

@Injectable()
export class WorkoutEffects {
  getWorkouts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutActions.getWorkouts),
      exhaustMap(() => {
        return this.workoutService.getWorkouts().pipe(
          map((response) => {
            return WorkoutActions.getWorkoutsSuccess({ workouts: response });
          }),
          catchError((error) =>
            of(WorkoutActions.getWorkoutsFailure({ error }))
          )
        );
      })
    )
  );

  addWorkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutActions.addWorkout),
      concatMap((action) =>
        this.workoutService.addWorkout(action.workout).pipe(
          map((response) =>
            WorkoutActions.addWorkoutSuccess({ workout: response })
          ),
          catchError((error) => of(WorkoutActions.addWorkoutFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private workoutService: WorkoutService
  ) {}
}
