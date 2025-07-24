// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig(({ mode }) => ({
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/widget.js'),
      formats: ['es'],
      fileName: () => 'widget.js'
    },
    outDir: 'build',
    sourcemap: mode === 'production',
    rollupOptions: {
      external: ['remotestoragejs'],
      output: { globals: { remotestoragejs: 'RemoteStorage' } }
    }
  },
  server: { port: 8008, open: true }
}))
