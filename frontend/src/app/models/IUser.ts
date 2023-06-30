export interface IUser {
  _id: string;
  id: string;
  name: string;
  picture: string;
  workoutTime?: number;
  currentWeight?: number;
  startingWeight?: number;
}

export interface IUserInfo {
  name?: string;
  currentWeight?: number;
  startingWeight?: number;
}
