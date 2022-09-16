import 'styled-components';
import light from './light';

declare module 'styled-components' {
  type ThemeType = typeof light;

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeType {}
}
