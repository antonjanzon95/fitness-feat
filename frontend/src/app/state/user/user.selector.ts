import { createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import { IAppState } from '../app.state';

export const selectUser = (state: IAppState) => state.user;
export const selectCurrentUser = createSelector(
  selectUser,
  (state: UserState) => state.user
);
export const selectLoginError = createSelector(
  selectUser,
  (state: UserState) => state.loginError
);
export const selectWeightEntryError = createSelector(
  selectUser,
  (state: UserState) => state.weightEntryError
);
export const selectWeightEntries = createSelector(
  selectUser,
  (state: UserState) => state.weightEntries
);
