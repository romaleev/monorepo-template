import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { TsconfigRaw } from 'esbuild'
import tsconfigRawData from './tsconfig.build.json'

const tsconfigRaw: TsconfigRaw = tsconfigRawData as TsconfigRaw

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		chunkSizeWarningLimit: 600, // Adjust chunk size limit
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return 'vendor' // General vendor chunk
					}
				},
			},
		},
	},
	server: {
		port: 4200,
		proxy: {
			'/api': {
				target: 'http://localhost:3000', // Adjust to match your backend URL
				changeOrigin: true,
				secure: false, // Set to false if using self-signed SSL certs
				rewrite: (path) => path.replace(/^\/api/, '/api'), // Ensures the path remains intact
			},
		},
	},
	resolve: {
		alias: {
			'#common': path.resolve(__dirname, '../common'),
			'#client': path.resolve(__dirname, 'src'),
		},
	},
	esbuild: {
		tsconfigRaw,
	},
	test: {
		globals: true,
		environment: 'jsdom',
		// setupFiles: './src/test/setup.ts',
		include: ['src/**/*.{test,spec}.{ts,tsx}'],
	},
})
