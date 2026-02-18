import { test, expect } from '@playwright/test'
import fs from 'fs'

const path = 'tests/stories.json'
// test.beforeAll(async ({ request }) => {
//   const response = await request.get('http://localhost:6006/index.json')

//   const body = await response.json()
//   const stories = Object.keys(body.entries).filter(
//     (str) => !str.includes('docs')
//   )

//   const jsonData = JSON.stringify(stories, null, 2)
//   fs.writeFileSync(path, jsonData)
// })

const fileContent = fs.readFileSync(path, 'utf8')
const stories = JSON.parse(fileContent)

for (const story of stories)
  test(`visual ${story}`, async ({ page, request }) => {
    await page.addInitScript(() => {
      const remove = () => {
        const el = document.querySelector('[href*="whats-new"]')
        if (el) el.remove()
      }

      // Remove immediately
      remove()

      // Remove if it appears later
      const observer = new MutationObserver(remove)
      observer.observe(document.body, { childList: true, subtree: true })
    })

    await page.goto(`http://localhost:6006/?path=/story/${story}`)

    const locator = page
      .frameLocator('#storybook-preview-iframe')
      .locator('#storybook-root')

    await expect(locator).toHaveScreenshot()
  })
