import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/server/**/*.spec.ts'],
	moduleNameMapper: {
		'^#common/(.*)$': '<rootDir>/../common/$1',
		'^#server/(.*)$': '<rootDir>/src/$1',
	},
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				useESM: true,
				tsconfig: 'tsconfig.spec.json',
				diagnostics: { ignoreCodes: ['TS151001'] },
			},
		],
	},
}
export default config
