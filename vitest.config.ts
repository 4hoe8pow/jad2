/// <reference types="vitest" />
/// <reference types="vite/client" />

import * as path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        globals: true,
        includeSource: ['./app/**/*.{ts,tsx}'],
        environment: 'happy-dom',
        setupFiles: './tests/setup-test-env.ts',
        exclude: ['node_modules'],
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'app'),
        },
    },
})
