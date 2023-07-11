export interface IUser {
  _id: string;
  id: string;
  name: string;
  picture: string;
  totalWorkoutTime?: number;
  currentWeight?: number;
  startingWeight?: number;
}

export interface IUserInfo {
  name?: string;
  currentWeight?: number;
  startingWeight?: number;
}
