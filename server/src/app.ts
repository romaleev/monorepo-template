import express from 'express'
import cors from 'cors'
import pino from 'pino'
import { itemsApi } from '#server/common/env'
import itemRoutes from '#server/routes/itemRoutes'

// ✅ Initialize Express & Logger
const app = express()

export const logger = pino({ transport: { target: 'pino-pretty' } })

app.use(cors())
app.use(express.json())

// ✅ Use modular routes
app.use(itemsApi, itemRoutes)

export default app
