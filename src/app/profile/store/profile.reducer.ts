import { createFeature, createReducer, on } from '@ngrx/store';
import { setProfile } from './profile.actions';
import { ProfileState } from './profile.state';

export const initialState: ProfileState = {
  profile: null,
};

export const profileFeature = createFeature({
  name: 'profile',
  reducer: createReducer(
    initialState,
    on(setProfile, (state, user): ProfileState => ({ ...state, profile: user.profile })),
  )
});