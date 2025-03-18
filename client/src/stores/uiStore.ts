import { create } from 'zustand'

interface UIStore {
	loading: boolean
	setLoading: (loading: boolean) => void
	notification: string
	setNotification: (notification: string) => void
	error: string
	setError: (error: string) => void
}

export const useUIStore = create<UIStore>((set) => ({
	loading: false,
	setLoading: (loading) => set({ loading: loading }),
	notification: '',
	setNotification: (notification) => set({ notification }),
	error: '',
	setError: (error) => set({ error }),
}))
