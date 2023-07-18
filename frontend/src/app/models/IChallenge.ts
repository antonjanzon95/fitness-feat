import { IUser } from './IUser';

export interface IChallenge {
  _id: string;
  name: string;
  creator: IUser;
  startDate: Date;
  endDate: Date;
  description: string;
  participants: IUser[];
}
