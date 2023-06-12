import { IUser } from './IUser';

export interface IChallenge {
  name: string;
  creator: IUser;
  startDate: Date;
  endDate: Date;
  description: string;
  participants: string[];
}
