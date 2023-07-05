import { createReducer, on } from '@ngrx/store';
import { IWorkout } from 'src/app/models/IWorkout';
import { WorkoutActions } from './workouts.actions';

export interface WorkoutState {
  workouts: IWorkout[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: WorkoutState = {
  workouts: [],
  error: null,
  status: 'pending',
};

export const workoutsReducer = createReducer(
  initialState,
  on(WorkoutActions.getWorkouts, (state) => ({
    ...state,
    status: 'loading' as 'loading',
  })),
  on(WorkoutActions.getWorkoutsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as 'error',
  })),
  on(WorkoutActions.getWorkoutsSuccess, (state, { workouts }) => ({
    ...state,
    workouts: workouts,
    error: null,
    status: 'success' as 'success',
  })),
  on(WorkoutActions.addWorkout, (state) => ({
    ...state,
    status: 'loading' as 'loading',
  })),
  on(WorkoutActions.addWorkoutFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as 'error',
  })),
  on(WorkoutActions.addWorkoutSuccess, (state, { workout }) => ({
    ...state,
    workouts: [...state.workouts, workout],
    error: null,
    status: 'success' as 'success',
  }))
);
