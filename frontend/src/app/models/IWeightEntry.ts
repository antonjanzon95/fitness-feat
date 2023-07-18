import { IChallenge } from './IChallenge';
import { IUser } from './IUser';

export interface IWeightEntry {
  user: IUser;
  weight: number;
  timestamp: Date;
  challenge?: IChallenge;
}
