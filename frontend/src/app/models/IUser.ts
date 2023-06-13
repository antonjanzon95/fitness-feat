export interface IUser {
  _id: string;
  id: string;
  name: string;
  picture: string;
  workoutTime?: number;
  currentWeight?: number;
  startingWeight?: number;
}
