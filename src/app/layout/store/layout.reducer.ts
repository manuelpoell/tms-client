import { createFeature, createReducer, on } from '@ngrx/store';
import { Themes } from '../models/themes.enum';
import { darkTheme, lightTheme } from './layout.actions';
import { LayoutState } from './layout.state';

export const themeStorageKey = 'layout.theme';

export const initialState: LayoutState = {
  theme: Themes.LIGHT
};

export const layoutFeature = createFeature({
  name: 'layout',
  reducer: createReducer(
    initialState,
    on(lightTheme, (state): LayoutState => ({ ...state, theme: Themes.LIGHT })),
    on(darkTheme, (state): LayoutState => ({ ...state, theme: Themes.DARK })),
  )
});
