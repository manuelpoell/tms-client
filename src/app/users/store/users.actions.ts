import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.models';

export const resetUserList = createAction('[Users] Reset user list');

export const loadUserList = createAction('[Users] Load user list', props<{ limit: number, offset: number, filter: string }>());
export const loadUserListSuccess = createAction('[Users] Successfully loaded user list', props<{ users: Array<User>, totalCount: number, filterCount: number }>());

export const loadUser = createAction('[Users] Load single user', props<{ userId: string }>());
export const loadUserSuccess = createAction('[Users] Successfully loaded single user', props<{ user: User }>());

export const openAddUserDialog = createAction('[Users] Open add new user dialog');
export const addUser = createAction('[Users] Add new user', props<{ user: User }>());
export const addUserSuccess = createAction('[Users] Successfully added new user', props<{ user: User }>());

export const openDeleteUserDialog = createAction('[Users] Open delete user dialog', props<{ user: User }>());
export const deleteUser = createAction('[Users] Delete user', props<{ userId: string }>());
export const deleteUserSuccess = createAction('[Users] Successfully deleted user', props<{ userId: string }>());

export const openUpdateUserDialog = createAction('[Users] Open update user dialog', props<{ user: User }>());
export const updateUser = createAction('[Users] Update user', props<{ userId: string, update: Partial<User> }>());
export const updateUserSuccess = createAction('[Users] Successfully updated user', props<{ user: User }>());

export const failedUserAction = createAction('[Users] Failed user action', props<{ errorMessage: string }>())