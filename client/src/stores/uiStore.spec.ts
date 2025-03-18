import { act } from '@testing-library/react'
import { useUIStore } from '#client/stores/uiStore'

describe('UI Store', () => {
	beforeEach(() => {
		// Reset Zustand store before each test
		act(() => {
			useUIStore.setState({
				loading: false,
				notification: '',
			})
		})
	})

	test('should initialize with default values', () => {
		const state = useUIStore.getState()
		expect(state.loading).toBe(false)
		expect(state.notification).toBe('')
	})

	test('should set loading state correctly', () => {
		act(() => {
			useUIStore.getState().setLoading(true)
		})
		expect(useUIStore.getState().loading).toBe(true)
	})

	test('should update notification text correctly', () => {
		act(() => {
			useUIStore.getState().setNotification('An error occurred')
		})
		expect(useUIStore.getState().notification).toBe('An error occurred')
	})
})
