import { authFeature } from './auth.reducer';

export const {
  selectAuthState,
  selectAccessToken,
  selectRefreshToken,
  selectErrorMessage,
} = authFeature;
