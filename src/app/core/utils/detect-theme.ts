import { Themes } from 'src/app/layout/models/themes.enum';
import { themeStorageKey } from 'src/app/layout/store/layout.reducer';

export const detectTheme = (): Themes => {
  let theme: Themes = Themes.LIGHT;
  const storedTheme = localStorage.getItem(themeStorageKey);

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = Themes.DARK;
  }

  if (storedTheme === Themes.LIGHT) {
    theme = Themes.LIGHT;
  } else if (storedTheme === Themes.DARK) {
    theme = Themes.DARK;
  }

  return theme;
};
