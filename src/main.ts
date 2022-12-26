import { bootstrapApplication } from '@angular/platform-browser';
import { TMSComponent } from './app/tms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, Route } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { metaReducers } from './app/meta.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from './environments/environment';
import { AuthGuard } from './app/auth/guards/auth.guard';
import { AuthEffects } from './app/auth/store/auth.effects';
import { authFeature } from './app/auth/store/auth.reducer';
import { AuthTokenInterceptor } from './app/auth/interceptors/auth-token.interceptor';
import { RefreshTokensInterceptor } from './app/auth/interceptors/refresh-tokens.interceptor';
import { IsLoggedInGuard } from './app/auth/guards/is-logged-in.guard';
import { LayoutEffects } from './app/layout/store/layout.effects';
import { layoutFeature } from './app/layout/store/layout.reducer';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

export const ROUTES: Array<Route> = [
	{ path: 'app', loadChildren: () => import('./app/layout/routes'), canActivate: [AuthGuard] },
	{ path: 'auth', loadChildren: () => import('./app/auth/routes'), canActivate: [IsLoggedInGuard] },
	{ path: '**', redirectTo: 'auth' }
];

bootstrapApplication(TMSComponent, {
	providers: [
		importProvidersFrom(BrowserAnimationsModule),
		importProvidersFrom(MatSnackBarModule),
		importProvidersFrom(MatDialogModule),
		provideRouter(ROUTES),
		provideHttpClient(
			withInterceptors([
				AuthTokenInterceptor,
				RefreshTokensInterceptor
			])
		),
		provideStore([], { metaReducers: metaReducers }),
		provideStoreDevtools({
			maxAge: 10,
			logOnly: environment.production,
			autoPause: true,
			trace: false
		}),
		provideEffects([AuthEffects, LayoutEffects]),
		provideState(authFeature),
		provideState(layoutFeature),
	]	
});
