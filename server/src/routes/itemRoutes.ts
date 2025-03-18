import { Router, Request, Response } from 'express'
import { logger } from '#server/app'
import { Item } from '#common/types'
import { itemSchema, idSchema } from '#common/validation/schemas'
import i18n from '#common/i18n'
import { validateRequest } from '#server/common/util'
import { v4 } from 'uuid'

const { t } = i18n
const router = Router()
const items: Item[] = [
	{
		item_id: '21998d34-f7ee-4bd6-91ae-be155204da89',
		item_name: 'Item0',
	},
	{
		item_id: '21998d34-f7ee-4bd6-91ae-be155204da82',
		item_name: 'Item1',
	},
	{
		item_id: '21998d34-f6ee-4bd8-91ae-be155204da82',
		item_name: 'Item2',
	},
]
/**
 * ✅ GET /api/items - Fetch all items with odds
 */
router.get('/', async (_req: Request, res: Response) => {
	try {
		logger.info('GET /')
		res.json(items)
	} catch (err) {
		logger.error(err)
		res.status(500).json({ error: t('api.error') })
	}
})

/**
 * ✅ POST /api/items - Add a new item with odds
 */
router.post('/', validateRequest('body', itemSchema), async (req: Request, res: Response) => {
	try {
		const { item_name }: { item_name: string } = req.body

		const newItem = {
			item_id: v4(),
			item_name,
		}

		items.push(newItem)
		logger.info(`POST / ${item_name}`)
		res.status(201).json({ status: 'created', item_id: newItem.item_id })
	} catch (err) {
		logger.error(err)
		res.status(500).json({ error: t('api.error') })
	}
})

/**
 * ✅ PUT /api/items/:id - Update an item and its odds
 */
router.put(
	'/:id',
	validateRequest('params', idSchema),
	validateRequest('body', itemSchema),
	async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const { item_name } = req.body

			const updateItem = items.find((item) => item.item_id === id)

			if (!updateItem) {
				res.status(404).json({ error: t('api.notFound') })
				return
			}

			updateItem.item_name = item_name
			logger.info(`PUT / ${item_name}`)
			res.json({ status: 'updated', item_id: updateItem.item_id })
		} catch (err) {
			logger.error(err)
			res.status(500).json({ error: t('api.error') })
		}
	},
)

/**
 * ✅ DELETE /api/items/:id - Remove an item (odds cascade deleted)
 */
router.delete('/:id', validateRequest('params', idSchema), async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		const deleteItemIndex = items.findIndex((item) => item.item_id === id)

		if (deleteItemIndex === -1) {
			res.status(404).json({ error: t('api.notFound') })
			return
		}

		const delete_item_id = items[deleteItemIndex].item_id

		items.splice(deleteItemIndex, 1)

		res.json({ status: 'deleted', event_id: delete_item_id })
	} catch (err) {
		logger.error(err)
		res.status(500).json({ error: t('api.error') })
	}
})

export default router
