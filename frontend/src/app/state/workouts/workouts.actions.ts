import { createAction, props } from '@ngrx/store';
import { IWorkout, IWorkoutData } from 'src/app/models/IWorkout';

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
  addWorkout: createAction(
    '[Workout Form] Add Workout',
    props<{ workout: IWorkoutData }>()
  ),
  addWorkoutSuccess: createAction(
    '[Workout Form] Add Workout Success',
    props<{ workout: IWorkout }>()
  ),
  addWorkoutFailure: createAction(
    '[Workout Form] Add Workout Failure',
    props<{ error: string }>()
  ),
};
