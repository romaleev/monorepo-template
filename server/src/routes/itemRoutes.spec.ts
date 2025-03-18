import request from 'supertest'
import app from '#server/app'
import { itemsApi } from '#server/common/env'
import { v4 } from 'uuid'
import i18n from '#common/i18n'

const { t } = i18n

describe('🎯 Items API Tests', () => {
	let testItemId: string

	/**
	 * ✅ Test: Create an item
	 */
	it('should create a new item and return its ID', async () => {
		const res = await request(app).post(itemsApi).send({ item_name: 'Test Item' })

		expect(res.status).toBe(201)
		expect(res.body).toEqual({
			status: 'created',
			item_id: expect.any(String),
		})

		testItemId = res.body.item_id
	})

	/**
	 * ✅ Test: Fetch all items
	 */
	it('should fetch all items', async () => {
		const res = await request(app).get(itemsApi)
		expect(res.status).toBe(200)
		expect(Array.isArray(res.body)).toBeTruthy()
		expect(res.body.some((item: { item_id: string }) => item.item_id === testItemId)).toBeTruthy()
	})

	/**
	 * ✅ Test: Update an item
	 */
	it('should update an existing item', async () => {
		const res = await request(app)
			.put(`${itemsApi}/${testItemId}`)
			.send({ item_name: 'Updated Test Item' })

		expect(res.status).toBe(200)
		expect(res.body).toEqual({ status: 'updated', item_id: testItemId })

		// Verify update
		const fetchRes = await request(app).get(itemsApi)
		expect(
			fetchRes.body.some(
				(item: { item_id: string; item_name: string }) =>
					item.item_id === testItemId && item.item_name === 'Updated Test Item',
			),
		).toBeTruthy()
	})

	/**
	 * ✅ Test: Delete an item
	 */
	it('should delete an item', async () => {
		const res = await request(app).delete(`${itemsApi}/${testItemId}`)
		expect(res.status).toBe(200)
		expect(res.body).toEqual({ status: 'deleted', event_id: testItemId })

		// Verify deletion
		const fetchRes = await request(app).get(itemsApi)
		expect(
			fetchRes.body.some((item: { item_id: string }) => item.item_id === testItemId),
		).toBeFalsy()
	})

	/**
	 * ❌ Test: Handle deleting a non-existent item
	 */
	it('should return 404 for deleting a non-existent item', async () => {
		const fakeId = v4()
		const res = await request(app).delete(`${itemsApi}/${fakeId}`)
		expect(res.status).toBe(404)
		expect(res.body).toEqual({ error: t('api.notFound') })
	})

	/**
	 * ❌ Test: Validation for missing item_name in POST
	 */
	it('should return 400 when item_name is missing in POST', async () => {
		const res = await request(app).post(itemsApi).send({})

		expect(res.status).toBe(400)
		expect(res.body).toHaveProperty('error.fieldErrors.item_name', ['Required'])
	})

	/**
	 * ❌ Test: Validation for missing item_name in PUT
	 */
	it('should return 400 when item_name is missing in PUT', async () => {
		const res = await request(app).put(`${itemsApi}/${testItemId}`).send({})

		expect(res.status).toBe(400)
		expect(res.body).toHaveProperty('error.fieldErrors.item_name', ['Required'])
	})

	/**
	 * ❌ Test: Validation for invalid UUID format in DELETE
	 */
	it('should return 400 for invalid UUID format in DELETE', async () => {
		const invalidId = 'invalid-uuid'
		const res = await request(app).delete(`${itemsApi}/${invalidId}`)
		expect(res.status).toBe(400)
		expect(res.body).toHaveProperty('error.fieldErrors.id', [t('itemSchema.invalidId')])
	})

	it('should return 400 when item_name is too short', async () => {
		const res = await request(app).post(itemsApi).send({ item_name: 'ab' })

		expect(res.status).toBe(400)
		expect(res.body).toHaveProperty('error.fieldErrors.item_name', [t('itemSchema.invalidName')])
	})
})
