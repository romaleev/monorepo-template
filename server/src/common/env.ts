import dotenv from 'dotenv'

// warning: .env & .env.production kept in git for test purposes

dotenv.config({
	path: `../common/${process.env.NODE_ENV === 'production' ? '.env.production' : '.env'}`,
})

export const isDev = process.env.NODE_ENV === 'development'
export const clientPort = process.env.CLIENT_PORT || 4200
export const serverPort = process.env.SERVER_PORT || 3000
export const itemsApi = process.env.ITEMS_API || '/api/items'
