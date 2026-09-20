/**
 * The theme, declared once so every interpolation is typed.
 *
 * The augmentation below is what turns `props.theme.accent` from `unknown`
 * into `string`. A project that declares nothing keeps the indexed form and
 * loses the autocomplete, which is a poor trade for four lines.
 */
import type {} from '@firsthandjs/styled';

declare module '@firsthandjs/styled' {
  interface FirsthandTheme {
    background: string;
    surface: string;
    text: string;
    muted: string;
    accent: string;
    border: string;
  }
}

export const theme = {
  background: '#fbfaf8',
  surface: '#ffffff',
  text: '#1b1a17',
  muted: '#6f6b63',
  accent: '#2f6f4f',
  border: '#e6e2db',
};
