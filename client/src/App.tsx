import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemPage from '#client/pages/ItemPage.tsx'
import darkTheme from '#client/themes/darkTheme'
import i18n from '#common/i18n'

const queryClient = new QueryClient()

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<I18nextProvider i18n={i18n}>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<ItemPage />} />
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</I18nextProvider>
		</QueryClientProvider>
	)
}

export default App