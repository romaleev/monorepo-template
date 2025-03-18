import { vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Notification from '#client/components/Notification.tsx'
import { useUIStore } from '#client/stores/uiStore'

// Mock the useUIStore hook
vi.mock('#client/stores/uiStore.ts', () => ({
	useUIStore: vi.fn(() => ({
		notification: 'Test Notification Message',
		setNotification: vi.fn(),
		error: '',
		setError: vi.fn(),
	})),
}))

describe('Notification Component', () => {
	it('renders Notification with the correct notification message', () => {
		render(<Notification />)
		expect(screen.getByText('Test Notification Message')).toBeInTheDocument()
	})

	it('renders Notification with success styling when notification is present', () => {
		vi.mocked(useUIStore).mockReturnValueOnce({
			notification: 'Success Message',
			setNotification: vi.fn(),
			error: '',
			setError: vi.fn(),
		})

		render(<Notification />)
		const alert = screen.getByRole('alert')
		expect(alert).toHaveClass('MuiAlert-standardSuccess')
	})

	it('renders Notification with error styling when error is present', () => {
		vi.mocked(useUIStore).mockReturnValueOnce({
			notification: '',
			setNotification: vi.fn(),
			error: 'Error Message',
			setError: vi.fn(),
		})

		render(<Notification />)
		const alert = screen.getByRole('alert')
		expect(alert).toHaveClass('MuiAlert-standardError')
	})

	it('closes Notification and resets notification state after autoHideDuration', async () => {
		const setNotificationMock = vi.fn()
		const setErrorMock = vi.fn()
		vi.mocked(useUIStore).mockReturnValueOnce({
			notification: 'Closing Message',
			setNotification: setNotificationMock,
			error: '',
			setError: setErrorMock,
		})

		render(<Notification />)
		await waitFor(
			() => {
				expect(setNotificationMock).toHaveBeenCalledWith('')
			},
			{ timeout: 3500 },
		)
	})

	it('closes Notification and resets error state when error is present', async () => {
		const setNotificationMock = vi.fn()
		const setErrorMock = vi.fn()
		vi.mocked(useUIStore).mockReturnValueOnce({
			notification: '',
			setNotification: setNotificationMock,
			error: 'Error Closing Message',
			setError: setErrorMock,
		})

		render(<Notification />)
		await waitFor(
			() => {
				expect(setErrorMock).toHaveBeenCalledWith('')
			},
			{ timeout: 3500 },
		)
	})
})
