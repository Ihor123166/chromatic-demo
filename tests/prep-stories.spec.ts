import { test, expect } from '@playwright/test'
import fs from 'fs'

test(`prep stories`, async ({ page, request }) => {
  const response = await page.request.get('http://localhost:6006/index.json')

  const body = await response.json()
  const stories = Object.keys(body.entries).filter((str) => !str.includes('docs'))

  const jsonData = JSON.stringify(stories, null, 2);
  fs.writeFileSync('tests/stories.json', jsonData)
})
