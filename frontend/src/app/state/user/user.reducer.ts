import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/app/models/IUser';
import { UserActions } from './user.actions';
import { IWeightEntry } from 'src/app/models/IWeightEntry';

export interface UserState {
  user: IUser | null;
  weightEntries: IWeightEntry[] | null;
  loginError: string | null;
  weightEntryError: string | null;
  getWeightEntriesError: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: UserState = {
  user: null,
  weightEntries: null,
  loginError: null,
  weightEntryError: null,
  getWeightEntriesError: null,
  status: 'pending',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.login, (state) => ({
    ...state,
    status: 'loading' as 'loading',
  })),
  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    loginError: error,
    status: 'error' as 'error',
  })),
  on(UserActions.loginSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loginError: null,
    status: 'success' as 'success',
  })),
  on(UserActions.newWeightEntry, (state) => ({
    ...state,
    status: 'loading' as 'loading',
  })),
  on(UserActions.newWeightEntryFailure, (state, { error }) => ({
    ...state,
    weightEntryError: error,
    status: 'error' as 'error',
  })),
  on(UserActions.newWeightEntrySuccess, (state, { user }) => ({
    ...state,
    user: user,
    weightEntryError: null,
    status: 'success' as 'success',
  })),
  on(UserActions.getWeightEntries, (state) => ({
    ...state,
    status: 'loading' as 'loading',
  })),
  on(UserActions.getWeightEntriesFailure, (state, { error }) => ({
    ...state,
    getWeightEntriesError: error,
    status: 'error' as 'error',
  })),
  on(UserActions.getWeightEntriesSuccess, (state, { entries }) => ({
    ...state,
    weightEntries: entries,
    getWeightEntriesError: null,
    status: 'success' as 'success',
  }))
);
