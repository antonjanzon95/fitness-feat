import { createReducer, on } from '@ngrx/store';
import { IChallenge } from 'src/app/models/IChallenge';
import { ChallengeActions } from './challenges.actions';
import { IWeightEntry } from 'src/app/models/IWeightEntry';

export interface ChallengesState {
  challenges: IChallenge[] | null;
  currentChallenge: IChallenge | null;
  currentChallengeWeightEntries: IWeightEntry[] | null;
  getChallengesError: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: ChallengesState = {
  challenges: null,
  currentChallenge: null,
  currentChallengeWeightEntries: null,
  getChallengesError: null,
  status: 'pending',
};

export const challengesReducer = createReducer(
  initialState,
  on(ChallengeActions.getChallenges, (state) => ({
    ...state,
    status: 'loading' as 'loading',
  })),
  on(ChallengeActions.getChallengesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as 'error',
  })),
  on(ChallengeActions.getChallengesSuccess, (state, { challenges }) => ({
    ...state,
    challenges: challenges,
    error: null,
    status: 'success' as 'success',
  })),
  on(ChallengeActions.getCurrentChallenge, (state) => ({
    ...state,
    status: 'loading' as 'loading',
  })),
  on(ChallengeActions.getCurrentChallengeFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as 'error',
  })),
  on(ChallengeActions.getCurrentChallengeSuccess, (state, { challenge }) => ({
    ...state,
    currentChallenge: challenge,
    error: null,
    status: 'success' as 'success',
  })),
  on(ChallengeActions.resetCurrentChallenge, (state) => ({
    ...state,
    currentChallenge: null,
    error: null,
    status: 'pending' as 'pending',
  })),
  on(ChallengeActions.getCurrentChallengeWeightEntries, (state) => ({
    ...state,
    status: 'loading' as 'loading',
  })),
  on(
    ChallengeActions.getCurrentChallengeWeightEntriesFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      status: 'error' as 'error',
    })
  ),
  on(
    ChallengeActions.getCurrentChallengeWeightEntriesSuccess,
    (state, { entries }) => ({
      ...state,
      currentChallengeWeightEntries: entries,
      status: 'success' as 'success',
    })
  )
);
