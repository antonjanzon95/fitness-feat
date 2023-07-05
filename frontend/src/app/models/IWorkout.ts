import { IUser } from './IUser';

export interface IWorkout extends IWorkoutData {
  user: IUser;
  date: Date;
}

export interface IWorkoutData {
  type: string;
  duration: number;
  intensity: string;
}
