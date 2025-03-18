import { test, expect, Page } from '@playwright/test'
import i18n from '#common/i18n'

const { t } = i18n

declare global {
	interface Window {
		testData: {
			itemId: string
			itemName: string
		}
	}
}

type TestData = {
	itemId: string
	itemName: string
}

const setPageData = async (page: Page, testData: TestData) => {
	await page.evaluate((testData: TestData) => {
		Object.assign(window, { testData })
	}, testData)
}

const getPageData = async (page: Page) => {
	return await page.evaluate(() => window.testData)
}

/**
 * Utility function to add a new item
 */
const addItem = async (page: Page, itemName: string): Promise<string> => {
	await page.waitForSelector(`[data-testid="add-input"] input`)
	await page.locator(`[data-testid="add-input"] input`).fill(itemName)
	await page.locator(`[data-testid="add-button"]`).click()

	// Wait for UI update
	await expect(page.locator(`[data-testid="notification-message"]`)).toHaveText(
		t('itemList.addSuccess', { itemName }),
	)

	// Locate the newly added item by its text content
	const newItem = page.locator(`[data-testid^="list-item-"]`, { hasText: itemName })

	// Ensure the item is present before extracting the ID
	await expect(newItem).toBeVisible()

	const notification = page.locator(`[data-testid="notification-message"]`)
	await expect(notification).toBeHidden()

	// Extract test ID
	const testId = await newItem.getAttribute('data-testid')

	// Extract only the numeric ID
	return testId?.replace('list-item-', '') ?? ''
}

/**
 * Utility function to update an existing item
 */
const updateItem = async (page: Page, itemId: string, newName: string) => {
	await page.waitForSelector(`[data-testid="edit-button-${itemId}"]`)
	await page.locator(`[data-testid="edit-button-${itemId}"]`).click()

	const input = page.locator(`[data-testid="edit-input-${itemId}"] input`)
	await input.waitFor()
	await input.fill(newName)
	await page.locator(`[data-testid="save-button-${itemId}"]`).click()

	const notification = page.locator(`[data-testid="notification-message"]`)
	// Wait for confirmation
	await expect(notification).toHaveText(t('itemList.updateSuccess', { itemName: newName }))
	await expect(notification).toBeHidden()
}

/**
 * Utility function to delete an item
 */
const deleteItem = async (page: Page, itemId: string, itemName: string) => {
	if (!itemName) return

	await page.waitForSelector(`[data-testid="delete-button-${itemId}"]`)
	await page.locator(`[data-testid="delete-button-${itemId}"]`).click()

	// Wait for confirmation
	// const notification = page.locator(`[data-testid="notification-message"]`)
	// await expect(notification).toHaveText(t('itemList.deleteSuccess', { itemName }))
	// await expect(notification).toBeHidden()
}

test.describe('🛠️ Item Management E2E', () => {
	test.beforeEach(async ({ page }, testInfo) => {
		if (testInfo.title === 'should display error when API fails') return

		await page.goto('/')
		await page.waitForLoadState('domcontentloaded')

		const itemName = `Test Item ${Date.now()}`
		const itemId = await addItem(page, itemName)

		await setPageData(page, { itemId, itemName })
	})

	test.afterEach(async ({ page }, testInfo) => {
		if (testInfo.title === 'should display error when API fails') return

		const { itemId, itemName } = await getPageData(page)

		await deleteItem(page, itemId, itemName)
	})

	/**
	 * ✅ Test: Create a new item
	 */
	test('should allow creating a new item', async ({ page }) => {
		// Ensure item appears in the list
		const { itemId } = await getPageData(page)
		await expect(page.locator(`[data-testid="list-item-${itemId}"]`)).toBeVisible()
	})

	/**
	 * ✅ Test: Update an existing item
	 */
	test('should allow editing an existing item', async ({ page }) => {
		const { itemId, itemName } = await getPageData(page)
		const itemNameNew = `Updated ${itemName}`
		await setPageData(page, { itemId, itemName: itemNameNew })
		await updateItem(page, itemId, itemNameNew)

		// Ensure UI updates correctly
		await expect(page.locator(`[data-testid="list-item-${itemId}"]`)).toContainText(itemNameNew)
	})

	/**
	 * ✅ Test: Delete an item
	 */
	test('should allow deleting an item', async ({ page }) => {
		const { itemId, itemName } = await getPageData(page)

		await deleteItem(page, itemId, itemName)

		await setPageData(page, { itemId, itemName: '' })

		// Ensure item disappears
		await expect(page.locator(`[data-testid="list-item-${itemId}"]`)).not.toBeVisible()
	})

	/**
	 * ❌ Test: Show error on failed item fetch
	 */
	test('should display error when API fails', async ({ page }) => {
		// Mock API Failure: Return 500 error for fetching items
		await page.route('**/api/items/**', async (route) => {
			console.log(`Intercepting: ${route.request().url()}`)
			await route.fulfill({
				status: 500,
				body: JSON.stringify({ error: 'Internal Server Error' }),
			})
		})

		await page.goto('/')

		// Wait for error notification
		await expect(page.locator(`[data-testid="notification-message"]`)).toContainText(
			'Internal Server Error',
		)
	})

	/**
	 * ❌ Test: Show error on invalid input
	 */
	test('should prevent adding an invalid item', async ({ page }) => {
		await page.waitForSelector(`[data-testid="add-input"]`)
		await page.locator(`[data-testid="add-input"] input`).fill('a') // Too short
		await page.locator(`[data-testid="add-button"]`).click()

		// Ensure validation error appears
		await expect(page.locator(`[data-testid="notification-message"]`)).toHaveText(
			'String must contain at least 3 character(s)',
		)
	})
})
