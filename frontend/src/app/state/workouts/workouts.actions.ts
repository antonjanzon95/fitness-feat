import { createAction, props } from '@ngrx/store';
import { IWorkout } from 'src/app/models/IWorkout';

export const WorkoutActions = {
  getWorkouts: createAction('[Workouts Dashboard] Get Workouts'),
  getWorkoutsSuccess: createAction(
    '[Workouts Dashboard] Get Workouts Success',
    props<{ workouts: IWorkout[] }>()
  ),
  getWorkoutsFailure: createAction(
    '[Workouts Dashboard] Get Workouts Failure',
    props<{ error: string }>()
  ),
};
