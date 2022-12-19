import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ email: string, password: string }>());
export const loginSuccess = createAction('[Auth] Login success', props<{ accessToken: string, refreshToken: string }>());
export const loginFailure = createAction('[Auth] Login failed', props<{ errorMessage: string }>());

export const udpateTokens = createAction('[Auth] Update tokens', props<{ accessToken: string, refreshToken: string }>());

export const logout = createAction('[Auth] Logout');

export const authReset = createAction('[Auth] Reset authentication');
