import { test, expect } from '@playwright/test'
import fs from 'fs'

const path = 'tests/stories.json'
const fileContent = fs.readFileSync(path, 'utf8')
const stories = JSON.parse(fileContent)

for (const story of stories)
  test(`visual ${story}`, async ({ page, request }) => {
    await page.goto(`http://localhost:6006/?path=/story/${story}`)

    await page.addStyleTag({
      content: `
      [href*="whats-new"] {
        visibility: hidden !important;
      }
    `,
    })

    const locator = page
      .frameLocator('#storybook-preview-iframe')
      .locator('#storybook-root')

    await expect(locator).toHaveScreenshot()
  })
