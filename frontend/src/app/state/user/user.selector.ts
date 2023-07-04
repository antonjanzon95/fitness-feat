import { createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import { IAppState } from '../app.state';

export const selectUser = (state: IAppState) => state.user;
export const selectCurrentUser = createSelector(
  selectUser,
  (state: UserState) => state.user
);
