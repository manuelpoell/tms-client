import { User } from 'src/app/users/models/user.models';

export interface ProfileState {
  profile: User | null;
}
