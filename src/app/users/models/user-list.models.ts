import { User } from './user.models';

export interface UsersList {
  users: Array<User>;
  totalCount: number;
  filterCount: number;
}