import { createSelector } from '@ngrx/store';
import { User } from 'src/app/users/models/user.models';
import { profileFeature } from './profile.reducer';

export const {
  selectProfile,
  selectProfileState,
} = profileFeature;

export const selectProfileRole = createSelector(
  selectProfile,
  (profile: User | null) => profile?.role
);
