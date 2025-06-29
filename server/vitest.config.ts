import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
	resolve: {
		alias: {
			'#common': path.resolve(__dirname, '../common'),
			'#server': path.resolve(__dirname, 'src'),
		},
	},
	test: {
		globals: true,
		environment: 'node',
		include: ['src/**/*.{test,spec}.ts'],
	},
})
