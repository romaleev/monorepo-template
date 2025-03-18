import { Alert, Snackbar } from '@mui/material'
import { useUIStore } from '#client/stores/uiStore.ts'

const Notification = () => {
	const { notification, setNotification, error, setError } = useUIStore()

	const message = notification || error

	return (
		<Snackbar
			open={!!message}
			autoHideDuration={3000}
			onClose={() => {
				if (error) {
					setError('')
				} else {
					setNotification('')
				}
			}}
			message={message}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
		>
			<Alert
				data-testid="notification-message"
				severity={error ? 'error' : 'success'}
				sx={{
					backgroundColor: 'white',
					color: 'black',
					fontWeight: 'bold',
					textAlign: 'center',
					width: '100%',
					minWidth: '300px',
					boxShadow: 4,
					borderRadius: 2,
					opacity: message ? 1 : 0,
				}}
			>
				{message}
			</Alert>
		</Snackbar>
	)
}

export default Notification
