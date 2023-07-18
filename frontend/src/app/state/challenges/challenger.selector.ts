import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';
import { ChallengesState } from './challenges.reducer';

export const selectChallenges = (state: IAppState) => state.challenges;
export const selectAllChallenges = createSelector(
  selectChallenges,
  (state: ChallengesState) => state.challenges
);
export const selectCurrentChallenge = createSelector(
  selectChallenges,
  (state: ChallengesState) => state.currentChallenge
);
export const selectAllChallengesError = createSelector(
  selectChallenges,
  (state: ChallengesState) => state.getChallengesError
);
