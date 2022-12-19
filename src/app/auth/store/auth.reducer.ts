import { createFeature, createReducer, on } from '@ngrx/store';
import { authReset, loginFailure, loginSuccess, logout, udpateTokens } from './auth.actions';
import { AuthState } from './auth.state';

export const accessTokenStorageKey = 'auth.access.token';
export const refreshTokenStorageKey = 'auth.refresh.token';

export const initialState: AuthState = {
  accessToken: localStorage.getItem(accessTokenStorageKey),
  refreshToken: localStorage.getItem(refreshTokenStorageKey),
  errorMessage: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(loginSuccess, (state, { accessToken, refreshToken }): AuthState => ({ ...state, accessToken, refreshToken })),
    on(loginFailure, (state, { errorMessage }): AuthState => ({ ...state, errorMessage })),
    on(udpateTokens, (state, { accessToken, refreshToken }): AuthState => ({ ...state, accessToken, refreshToken })),
    on(logout, (): AuthState => ({ ...initialState })),
    on(authReset, (): AuthState => ({ ...initialState }))
  )
});
