import { Box, IconButton, TextField } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { useState } from 'react'
import { useUIStore } from '#client/stores/uiStore.ts'
import { useCreateItem } from '#client/api/itemApi.ts'
import { itemSchema } from '#common/validation/schemas.ts'
import i18n from '#common/i18n'

const { t } = i18n

const ListItemAdd = () => {
	const { setNotification, setError } = useUIStore()
	const createItem = useCreateItem()
	const [itemName, setItemName] = useState('')

	const handleAdd = () => {
		const newItem = { item_name: itemName }

		const result = itemSchema.safeParse(newItem)
		if (!result.success) {
			const error = result.error?.issues?.[0]?.message
			console.log(`validation error: ${error}`)
			setError(error)
			return
		}

		createItem.mutate(newItem, {
			onSuccess: () => {
				setNotification(t('itemList.addSuccess', { itemName }))
				setItemName('') // Clear input after successful addition
			},
			onError: (error) => setError(error.message),
		})
	}

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: 2,
				borderRadius: 2,
				backgroundColor: 'background.paper',
				boxShadow: 1,
				marginBottom: 1,
				width: '100%',
				maxWidth: 400,
				marginX: 'auto',
				textAlign: 'center',
			}}
		>
			<TextField
				value={itemName}
				onChange={(e) => setItemName(e.target.value)}
				variant="outlined"
				placeholder="Enter item name"
				sx={{ flex: 1, marginRight: 2 }}
				data-testid="add-input"
			/>
			<IconButton
				color="info"
				onClick={handleAdd}
				sx={{
					'&:hover': {
						color: 'success.main',
					},
				}}
				data-testid="add-button"
			>
				<AddIcon />
			</IconButton>
		</Box>
	)
}

export default ListItemAdd
