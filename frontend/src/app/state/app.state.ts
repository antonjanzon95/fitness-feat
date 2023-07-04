import { UserState } from '../state/user/user.reducer';
import { WorkoutState } from './workouts/workouts.reducer';

export interface IAppState {
  user: UserState;
  workouts: WorkoutState;
}
