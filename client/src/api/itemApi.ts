import ky from 'ky'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Item } from '#common/types'

export const API_URL = '/api/items'

const api = ky.create({
	prefixUrl: API_URL,
	throwHttpErrors: true,
})

/**
 * ✅ Fetch all items (R - Read)
 */
export const useFetchItems = () => {
	return useQuery<Item[]>({
		queryKey: ['items'],
		queryFn: async () => {
			try {
				return await api.get('').json<Item[]>() // Ky auto-parses JSON
			} catch (error) {
				console.error('❌ Error fetching items:', error)
				throw error
			}
		},
		staleTime: 1000 * 60 * 5, // 5 min cache
		retry: false, // Disable retry if needed
	})
}

/**
 * ✅ Create item (C - Create)
 */
export const useCreateItem = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (newItem: Omit<Item, 'item_id'>) => {
			return await api.post('', { json: newItem }).json<Item>()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['items'] }) // Refresh list after adding
		},
		onError: (error) => {
			console.error('❌ Error creating item:', error)
		},
	})
}

/**
 * ✅ Update item (U - Update)
 */
export const useUpdateItem = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (updatedItem: Item) => {
			return await api.put(`${updatedItem.item_id}`, { json: updatedItem }).json<Item>()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['items'] }) // Refresh list after update
		},
		onError: (error) => {
			console.error('❌ Error updating item:', error)
		},
	})
}

/**
 * ✅ Delete item (D - Delete)
 */
export const useDeleteItem = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (id: string) => {
			return await api.delete(id).json<{ message: string }>()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['items'] }) // Refresh list after deletion
		},
		onError: (error) => {
			console.error('❌ Error deleting item:', error)
		},
	})
}
