import { createAction, props } from '@ngrx/store';
import { IChallenge } from 'src/app/models/IChallenge';
import { IWeightEntry } from 'src/app/models/IWeightEntry';

export const ChallengeActions = {
  getChallenges: createAction('[Challenges Page] Get Challenges'),
  getChallengesFailure: createAction(
    '[Challenges Page] Get Challenges Failure',
    props<{ error: string }>()
  ),
  getChallengesSuccess: createAction(
    '[Challenges Page] Get Challenges Success',
    props<{ challenges: IChallenge[] }>()
  ),
  getCurrentChallenge: createAction(
    '[Challenges Page] Get Current Challenge',
    props<{ challengeId: string }>()
  ),
  getCurrentChallengeFailure: createAction(
    '[Challenges Page] Get Current Challenge Failure',
    props<{ error: string }>()
  ),
  getCurrentChallengeSuccess: createAction(
    '[Challenges Page] Get Current Challenge Success',
    props<{ challenge: IChallenge }>()
  ),
  resetCurrentChallenge: createAction(
    '[Challenges Page] Reset Current Challenge'
  ),
  getCurrentChallengeWeightEntries: createAction(
    '[Challenge Page] Get Current Challenge Weight Entries',
    props<{ challengeId: string }>()
  ),
  getCurrentChallengeWeightEntriesFailure: createAction(
    '[Challenge Page] Get Current Challenge Weight Entries Failure',
    props<{ error: string }>()
  ),
  getCurrentChallengeWeightEntriesSuccess: createAction(
    '[Challenge Page] Get Current Challenge Weight Entries Success',
    props<{ entries: IWeightEntry[] }>()
  ),
};
