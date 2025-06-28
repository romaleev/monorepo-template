import i18n from 'i18next'

// Dynamically import locale file to support both ESM & CommonJS
import translationEN from '#common/locales/en'
;(async () => {
	// Check if running in a browser
	const isClient = typeof globalThis === 'object' && 'window' in globalThis

	const resources = {
		en: { translation: translationEN },
	}
	// Initialize i18n
	const config = {
		resources,
		lng: 'en', // Default language
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false, // React already handles escaping
		},
		returnNull: false,
		returnEmptyString: false,
		parseMissingKeyHandler: (key: string) => {
			throw new Error(`Missing locale value for key: '${key}'`)
		},
	}
	// Only use React plugin in the client
	if (isClient) {
		// @ts-ignore: skip react-i18next check on server side
		const { initReactI18next } = await import('react-i18next')
		await i18n.use(initReactI18next).init(config)
	} else {
		await i18n.init(config)
	}
})()

export default i18n
