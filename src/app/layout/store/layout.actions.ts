import { createAction } from '@ngrx/store';

export const initTheme = createAction('[Layout] Detect initial theme');

export const lightTheme = createAction('[Layout] Switch to light theme');
export const darkTheme = createAction('[Layout] Switch to dark theme');
