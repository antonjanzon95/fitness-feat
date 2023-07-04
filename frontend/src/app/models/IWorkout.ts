import { IUser } from './IUser';

export interface IWorkout {
  user: IUser;
  date: Date;
  type: string;
  duration: number;
  intensity: string;
}
