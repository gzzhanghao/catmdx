import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';

export default defineConfig({
  input: {
    index: './src/index.ts',
    cli: './src/cli.ts',
  },
  output: {
    dir: 'dist',
    format: 'es',
  },
  platform: 'node',
  external: ['commander'],
  plugins: [dts()],
});
