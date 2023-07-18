import { UserState } from '../state/user/user.reducer';
import { ChallengesState } from './challenges/challenges.reducer';
import { WorkoutState } from './workouts/workouts.reducer';

export interface IAppState {
  user: UserState;
  workouts: WorkoutState;
  challenges: ChallengesState;
}
