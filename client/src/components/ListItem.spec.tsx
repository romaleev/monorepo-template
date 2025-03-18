import { vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ListItem from '#client/components/ListItem.tsx'
import { Item } from '#common/types.ts'

// Mock API hooks properly
const deleteMock = vi.fn()
const updateMock = vi.fn()

vi.mock('#client/api/itemApi.ts', () => ({
	useDeleteItem: vi.fn(() => ({
		mutate: deleteMock,
		isLoading: false,
		isError: false,
		error: null,
		data: null,
	})),
	useUpdateItem: vi.fn(() => ({
		mutate: updateMock,
		isLoading: false,
		isError: false,
		error: null,
		data: null,
	})),
}))

// Mock UI store
vi.mock('#client/stores/uiStore.ts', () => ({
	useUIStore: vi.fn(() => ({
		setNotification: vi.fn(),
		setError: vi.fn(),
	})),
}))

describe('ListItem Component', () => {
	const mockItem: Item = { item_id: '1', item_name: 'Test Item' }

	it('renders item name correctly', () => {
		render(<ListItem item={mockItem} />)
		expect(screen.getByText('Test Item')).toBeInTheDocument()
	})

	it('calls delete function when delete button is clicked', () => {
		render(<ListItem item={mockItem} />)
		const deleteButton = screen.getByTestId('delete-button-1')
		fireEvent.click(deleteButton)
		expect(deleteMock).toHaveBeenCalledWith('1', expect.any(Object))
	})

	it('switches to edit mode when edit button is clicked', () => {
		render(<ListItem item={mockItem} />)
		const editButton = screen.getByTestId('edit-button-1')
		fireEvent.click(editButton)
		expect(screen.getByTestId('edit-input-1')).toBeInTheDocument()
	})

	it('saves changes when save button is clicked', async () => {
		render(<ListItem item={mockItem} />)
		fireEvent.click(screen.getByTestId('edit-button-1'))

		// 🔹 Ensure input exists and change its value
		const inputField = screen.getByTestId('edit-input-1').querySelector('input') as HTMLInputElement
		expect(inputField).not.toBeNull()

		fireEvent.change(inputField, { target: { value: 'Updated Item' } })
		expect(inputField.value).toBe('Updated Item')

		fireEvent.click(screen.getByTestId('save-button-1'))

		// 🔹 Ensure mutation was called
		await waitFor(() => {
			expect(updateMock).toHaveBeenCalledWith(
				{ item_id: '1', item_name: 'Updated Item' },
				expect.any(Object),
			)
		})
	})

	it('cancels edit mode when cancel button is clicked', () => {
		render(<ListItem item={mockItem} />)
		fireEvent.click(screen.getByTestId('edit-button-1'))

		// 🔹 Ensure input exists and change its value
		const inputField = screen.getByTestId('edit-input-1').querySelector('input') as HTMLInputElement
		expect(inputField).not.toBeNull()

		fireEvent.change(inputField, { target: { value: 'Updated Item' } })
		fireEvent.click(screen.getByTestId('cancel-button-1'))

		expect(screen.queryByTestId('edit-input-1')).not.toBeInTheDocument()
		expect(screen.getByText('Test Item')).toBeInTheDocument()
	})
})
