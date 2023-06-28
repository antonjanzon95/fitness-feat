import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/app/models/IUser';
import { UserActions } from './user.actions';

export interface UserState {
  user: IUser | null;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: UserState = {
  user: null,
  error: null,
  status: 'pending',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.login, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  on(UserActions.loginSuccess, (state, { user }) => ({
    ...state,
    user: user,
    error: null,
    status: 'success',
  }))
);
