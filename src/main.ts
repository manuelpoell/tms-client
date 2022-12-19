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
import { AuthGuard } from './app/auth/auth.guard';
import { AuthEffects } from './app/auth/store/auth.effects';
import { authFeature } from './app/auth/store/auth.reducer';
import { AuthTokenInterceptor } from './app/auth/interceptors/auth-token.interceptor';
import { RefreshTokensInterceptor } from './app/auth/interceptors/refresh-tokens.interceptor';

export const ROUTES: Array<Route> = [
	{ path: 'app', loadChildren: () => import('./app/layout/routes'), canActivate: [AuthGuard] },
	{ path: 'auth', loadChildren: () => import('./app/auth/routes') },
	{ path: '**', redirectTo: 'auth' }
];

bootstrapApplication(TMSComponent, {
	providers: [
		importProvidersFrom(BrowserAnimationsModule),
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
		provideEffects([AuthEffects]),
		provideState(authFeature)
	]	
});
