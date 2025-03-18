import { z } from 'zod'
import i18n from '#common/i18n'

const { t } = i18n

export const itemSchema = z.object({
	item_name: z.string().min(3, t('itemSchema.invalidName')).max(255, t('itemSchema.invalidName')),
})

export const idSchema = z.object({
	id: z
		.string()
		.regex(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
			t('itemSchema.invalidId'),
		),
})
