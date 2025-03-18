import { Box, IconButton, Typography, TextField } from '@mui/material'
import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	Save as SaveIcon,
	Cancel as CancelIcon,
} from '@mui/icons-material'
import { useState } from 'react'
import { Item } from '#common/types.ts'
import { useUIStore } from '#client/stores/uiStore.ts'
import { useDeleteItem, useUpdateItem } from '#client/api/itemApi.ts'
import { itemSchema } from '#common/validation/schemas.ts'
import i18n from '#common/i18n'

const { t } = i18n

const ListItem = ({ item }: { item: Item }) => {
	const { setNotification, setError } = useUIStore()
	const deleteItem = useDeleteItem()
	const updateItem = useUpdateItem()
	const [isEditing, setIsEditing] = useState(false)
	const [itemName, setItemName] = useState(item.item_name)

	const handleRemove = () => {
		deleteItem.mutate(item.item_id, {
			onSuccess: () => setNotification(t('itemList.deleteSuccess', { itemName })),
			onError: (error) => setError(error.message),
		})
	}

	const handleEdit = () => {
		setIsEditing(true)
	}

	const handleSave = () => {
		if (itemName === item.item_name) {
			setIsEditing(false)
			return
		}

		const newItem = { item_name: itemName }

		const result = itemSchema.safeParse(newItem)
		if (!result.success) {
			const error = result.error?.issues?.[0]?.message
			console.log(`validation error: ${error}`)
			setError(error)
			return
		}

		updateItem.mutate(
			{ ...item, item_name: itemName },
			{
				onSuccess: () => {
					setNotification(t('itemList.updateSuccess', { itemName }))
					setIsEditing(false)
				},
				onError: (error) => setError(error.message),
			},
		)
	}

	const handleCancel = () => {
		setItemName(item.item_name)
		setIsEditing(false)
	}

	return (
		<Box
			data-testid={`list-item-${item.item_id}`}
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
			{isEditing ? (
				<TextField
					value={itemName}
					onChange={(e) => setItemName(e.target.value)}
					variant="outlined"
					fullWidth
					sx={{ flex: 1, marginRight: 2 }}
					data-testid={`edit-input-${item.item_id}`}
				/>
			) : (
				<Typography variant="body1" sx={{ flex: 1, fontWeight: 'medium' }}>
					{item.item_name}
				</Typography>
			)}

			{isEditing ? (
				<>
					<IconButton
						color="success"
						onClick={handleSave}
						data-testid={`save-button-${item.item_id}`}
					>
						<SaveIcon />
					</IconButton>
					<IconButton
						color="info"
						onClick={handleCancel}
						data-testid={`cancel-button-${item.item_id}`}
					>
						<CancelIcon />
					</IconButton>
				</>
			) : (
				<>
					<IconButton color="info" onClick={handleEdit} data-testid={`edit-button-${item.item_id}`}>
						<EditIcon />
					</IconButton>
					<IconButton
						color="error"
						onClick={handleRemove}
						data-testid={`delete-button-${item.item_id}`}
					>
						<DeleteIcon />
					</IconButton>
				</>
			)}
		</Box>
	)
}

export default ListItem
