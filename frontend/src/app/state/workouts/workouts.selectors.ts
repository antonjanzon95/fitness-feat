import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';
import { WorkoutState } from './workouts.reducer';

export const selectWorkouts = (state: IAppState) => state.workouts;
export const selectAllWorkouts = createSelector(
  selectWorkouts,
  (state: WorkoutState) => state.workouts
);
