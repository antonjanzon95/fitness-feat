import { IUser } from './IUser';

export interface IWeightEntry {
  user: IUser;
  weight: number;
  timestamp: Date;
}
