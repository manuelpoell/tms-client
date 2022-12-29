import { User } from '../models/user.models';

export interface UsersState {
  users: Array<User>;
  totalCount: number;
  filterCount: number;
}