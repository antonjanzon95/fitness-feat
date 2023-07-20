import { IChallenge } from './IChallenge';
import { IUser } from './IUser';

export interface IWeightEntry {
  _id: string;
  user: IUser;
  weight: number;
  timestamp: Date;
  challenge?: IChallenge;
}
