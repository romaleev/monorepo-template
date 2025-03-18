import { z } from 'zod'
import { Request, Response, NextFunction } from 'express'
import { logger } from '#server/app'

export const validateRequest =
	(prop: 'params' | 'body', schema: z.Schema) =>
	(req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req[prop])
		if (!result.success) {
			logger.error(`validation error: ${JSON.stringify(result.error)}`)
			res.status(400).json({ error: result.error.flatten() })
			return
		}
		Object.assign(req[prop], result.data)
		next()
	}
