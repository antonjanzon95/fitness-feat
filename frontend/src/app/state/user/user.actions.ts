import { User } from '@auth0/auth0-angular';
import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/models/IUser';
import { IWeightEntry } from 'src/app/models/IWeightEntry';

export const UserActions = {
  login: createAction('[Auth API] User Login', props<{ user: User }>()),
  loginSuccess: createAction(
    '[Auth API] User Login Success',
    props<{ user: IUser }>()
  ),
  loginFailure: createAction(
    '[Auth API] User Login Failure',
    props<{ error: string }>()
  ),
  changeUserImage: createAction(
    '[User Dashboard] Change User Image',
    props<{ imageUrl: string }>()
  ),
  newWeightEntry: createAction(
    '[Weight Entry Form] New Weight Entry',
    props<{ weight: number }>()
  ),
  newWeightEntryFailure: createAction(
    '[Weight Entry Form] Weight Entry Failure',
    props<{ error: string }>()
  ),
  newWeightEntrySuccess: createAction(
    '[Weight Entry Form] Weight Entry Success',
    props<{ user: IUser }>()
  ),
  newChallengeWeightEntry: createAction(
    '[Weight Entry Form] New Challenge Weight Entry',
    props<{ weight: number; challengeId: string }>()
  ),
  newChallengeWeightEntryFailure: createAction(
    '[Weight Entry Form] New Challenge Weight Entry Failure',
    props<{ error: string }>()
  ),
  newChallengeWeightEntrySuccess: createAction(
    '[Weight Entry Form] New Challenge Weight Entry Success',
    props<{ user: IUser }>()
  ),
  getWeightEntries: createAction('[Weight Chart] Get Weight Entries'),
  getWeightEntriesFailure: createAction(
    '[Weight Chart] Get Weight Entries Failure',
    props<{ error: string }>()
  ),
  getWeightEntriesSuccess: createAction(
    '[Weight Chart] Get Weight Entries Success',
    props<{ entries: IWeightEntry[] }>()
  ),
};
