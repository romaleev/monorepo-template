import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	eslintConfigPrettier,
	{
		languageOptions: {
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				...globals.node,
				...globals.browser,
			},
		},
		plugins: {
			react: react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			...react.configs.recommended.rules,
			...react.configs['jsx-runtime'].rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'eol-last': ['error', 'always'], // ✅ Enforces newline at EOF
		},
		ignores: ['dist'],
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
)
