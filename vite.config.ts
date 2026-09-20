/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { firsthand } from '@firsthandjs/compiler/vite';

export default defineConfig({
  // TSX into DOM instructions. `enforce: 'pre'`, so no JSX reaches esbuild and
  // no `jsxImportSource` is needed here - the tsconfig setting is for the
  // editor and `tsc --noEmit`.
  plugins: [firsthand({ packageName: 'firsthand-starter' })],
  test: { environment: 'happy-dom' },
});
