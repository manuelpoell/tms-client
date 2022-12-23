import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import { detectTheme } from 'src/app/core/utils/detect-theme';
import { Themes } from '../models/themes.enum';
import { darkTheme, initTheme, lightTheme } from './layout.actions';
import { themeStorageKey } from './layout.reducer';

@Injectable()
export class LayoutEffects {

  $initTheme = createEffect(() => {
    return this.$actions.pipe(
      ofType(initTheme),
      map(() => {
        return detectTheme() === Themes.DARK
          ? darkTheme()
          : lightTheme();
      })
    );
  });

  $switchToLightTheme = createEffect(() => {
    return this.$actions.pipe(
      ofType(lightTheme),
      tap(() => {
        localStorage.setItem(themeStorageKey, Themes.LIGHT);
        document.body.classList.remove('dark');
      })
    );
  }, { dispatch: false });

  $switchToDarkTheme = createEffect(() => {
    return this.$actions.pipe(
      ofType(darkTheme),
      tap(() => {
        localStorage.setItem(themeStorageKey, Themes.DARK);
        document.body.classList.add('dark');
      })
    );
  }, { dispatch: false });

  constructor(
    private $actions: Actions,
  ) {}
}