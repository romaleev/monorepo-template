import { Box, CircularProgress, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useFetchItems } from '#client/api/itemApi.ts'
import ListItem from '#client/components/ListItem.tsx'
import { useUIStore } from '#client/stores/uiStore.ts'
import Notification from '#client/components/Notification.tsx'
import ListItemAdd from '#client/components/ListItemAdd.tsx'

const ItemPage = () => {
	const { data: items, isLoading, isError, error } = useFetchItems()
	const { setError } = useUIStore()
	const { t } = useTranslation()

	useEffect(() => {
		if (isError) setError(error.message)
	}, [isError])

	return (
		<Box
			sx={{
				display: 'flex',
				width: '100vw',
				height: '100vh',
				backgroundColor: 'background.default',
				color: 'text.primary',
				padding: 3,
				overflow: 'hidden',
				flexDirection: 'column',
			}}
		>
			<Typography variant="h4" align="center" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
				{t('itemPage.title')}
			</Typography>
			<Box sx={{ display: 'flex', flex: 1 }}>
				{/* Events List */}
				<Box sx={{ flex: 3, overflowY: 'auto', paddingRight: 3, height: '100%' }}>
					{/* Event Rows */}
					{isLoading ? (
						<CircularProgress sx={{ display: 'block', margin: 'auto' }} />
					) : (
						<>
							{items?.map((item, i) => <ListItem key={i} item={item} />)}
							<ListItemAdd />
						</>
					)}
				</Box>
			</Box>

			<Notification />
		</Box>
	)
}

export default ItemPage
