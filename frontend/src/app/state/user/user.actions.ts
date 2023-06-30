import { User } from '@auth0/auth0-angular';
import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/models/IUser';

export const UserActions = {
  login: createAction('[Auth API] Login User', props<{ user: User }>()),
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
};
