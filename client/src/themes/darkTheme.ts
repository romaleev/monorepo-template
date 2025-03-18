import { createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#1E2328',
			paper: '#0C1118',
		},
		primary: {
			main: '#1f2227',
		},
		info: { main: '#FFFFFF' },
		success: { main: '#75FB92' },
		text: {
			primary: '#FFFFFF',
			secondary: '#a3a3a3',
		},
	},
})

export default darkTheme
