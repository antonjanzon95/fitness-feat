import { IUser } from './IUser';
import { IWeightEntry } from './IWeightEntry';

export interface IChallenge {
  _id: string;
  name: string;
  creator: IUser;
  startDate: Date;
  endDate: Date;
  weightEntries: IWeightEntry[];
  description: string;
  participants: IUser[];
}
