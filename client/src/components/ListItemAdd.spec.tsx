import { vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ListItemAdd from '#client/components/ListItemAdd.tsx'

// **Mock API Hooks Properly**
const createMock = vi.fn()

vi.mock('#client/api/itemApi.ts', () => ({
	useCreateItem: vi.fn(() => ({
		mutate: createMock,
		isLoading: false,
		isError: false,
		error: null,
		data: null,
	})),
}))

// **Mock UI Store**
vi.mock('#client/stores/uiStore.ts', () => ({
	useUIStore: vi.fn(() => ({
		setNotification: vi.fn(),
		setError: vi.fn(),
	})),
}))

describe('ListItemAdd Component', () => {
	beforeEach(() => {
		vi.clearAllMocks() // Clears all previous calls & resets mock states
	})

	it('renders input and add button', () => {
		render(<ListItemAdd />)

		expect(screen.getByTestId('add-input')).toBeInTheDocument()
		expect(screen.getByTestId('add-button')).toBeInTheDocument()
	})

	it('updates input field correctly', () => {
		render(<ListItemAdd />)

		const inputField = screen.getByTestId('add-input').querySelector('input') as HTMLInputElement
		expect(inputField).not.toBeNull()

		fireEvent.change(inputField, { target: { value: 'New Item' } })
		expect(inputField.value).toBe('New Item')
	})

	it('calls create function when add button is clicked', async () => {
		render(<ListItemAdd />)

		const inputField = screen.getByTestId('add-input').querySelector('input') as HTMLInputElement
		fireEvent.change(inputField, { target: { value: 'New Item' } })

		fireEvent.click(screen.getByTestId('add-button'))

		// Ensure mutation was called with correct data
		await waitFor(() => {
			expect(createMock).toHaveBeenCalledWith({ item_name: 'New Item' }, expect.any(Object))
		})
	})

	it('does not call create function if input is invalid', () => {
		render(<ListItemAdd />)

		const inputField = screen.getByTestId('add-input').querySelector('input') as HTMLInputElement
		fireEvent.change(inputField, { target: { value: 'a' } }) // Too short

		fireEvent.click(screen.getByTestId('add-button'))

		// Expect createItem NOT to be called
		expect(createMock).not.toHaveBeenCalled()
	})
})
