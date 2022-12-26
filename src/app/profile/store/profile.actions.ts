import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/users/models/user.models';

export const loadProfile = createAction('[Profile] Load user account');
export const setProfile = createAction('[Profile] Set user account information', props<{ profile: User }>());
export const updateProfile = createAction('[Profile] Update user account', props<{ update: Partial<User> }>());

export const openDeleteProfileDialog = createAction('[Profile] Open delete user account dialog');
export const deleteProfile = createAction('[Profile] Delete user account', props<{ password: string }>());
export const deleteProfileCancelled = createAction('[Profile] Cancelled deleting user account');

export const openChangePasswordDialog = createAction('[Profile] Open change password dialog');
export const changeUserPassword = createAction('[Profile] Change user password', props<{ password: string, newPassword: string }>());
export const changeUserPasswordSuccess = createAction('[Profile] Successfully changed user password');
export const changeUserPasswordCancelled = createAction('[Profile] Cancelled changing user password');

export const failedProfileAction = createAction('[Profile] Failed profile action', props<{ errorMessage: string }>());
