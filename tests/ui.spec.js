import { test, expect } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('ziyaratour.lang', 'uz'))
})
async function fillLead(page) {
  await page.getByLabel('F.I.SH.').fill('Ali Test')
  await page.getByLabel('Telefon / WhatsApp').fill('+998 90 123 45 67')
  await page.getByRole('checkbox').check()
}
async function screenshotHome(page, name) {
  await mkdir('artifacts', { recursive: true })
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 650) { await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y); await page.waitForTimeout(120) }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForTimeout(800)
  await page.screenshot({ path: `artifacts/${name}-viewport.png` })
  await page.screenshot({ path: `artifacts/${name}.png`, fullPage: true })
}
test('desktop home loads its 3D scene and leads to the form', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('Sayohatingiz')
  await expect(page.locator('.travel-globe canvas')).toBeVisible({ timeout: 15000 })
  await expect(page.locator('.journey-card')).toHaveCount(3)
  await page.locator('.hero-actions a').first().click()
  await expect(page.getByLabel('F.I.SH.')).toBeInViewport()
  await screenshotHome(page, 'home-desktop')
  expect(errors).toEqual([])
})
test('mobile menu, lead form and layout fit a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Menyu' }).click()
  await expect(page.locator('#mobile-navigation')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('#mobile-navigation')).toHaveCount(0)
  await screenshotHome(page, 'home-mobile')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})
test('all four languages and narrow layouts remain usable', async ({ page }) => {
  for (const lang of ['uz', 'uzc', 'ru', 'en']) {
    await page.goto('/')
    await page.evaluate(lang => localStorage.setItem('ziyaratour.lang', lang), lang)
    // beforeEach's init script only applies on document creation; switch through the UI.
    await page.getByRole('button', { name: 'Language', exact: true }).click()
    const labels = { uz: "O'zbekcha", uzc: 'Ўзбекча', ru: 'Русский', en: 'English' }
    await page.getByRole('button', { name: new RegExp(labels[lang]) }).click()
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 950 })
      const overflow = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, outside: [...document.querySelectorAll('body *')].filter(el => el.getBoundingClientRect().right > innerWidth + 1).slice(0, 10).map(el => ({ tag: el.tagName, class: el.className, text: el.textContent?.slice(0, 70) })) }))
      expect(overflow.width, `${lang} at ${width}: ${JSON.stringify(overflow.outside)}`).toBeLessThanOrEqual(width)
    }
    await expect(page.locator('html')).toHaveAttribute('lang', lang === 'uzc' ? 'uz-Cyrl' : lang)
  }
})
test('validation, actual payload, pending state and confirmed success', async ({ page }) => {
  await page.goto('/book?tour=tour-package-7-days')
  await expect(page.locator('select[name="tour"]')).toHaveValue('tour-package-7-days')
  await fillLead(page)
  await page.getByLabel('Telefon / WhatsApp').fill('+998 90')
  await page.getByRole('button', { name: 'Maslahat olish', exact: true }).click()
  await expect(page.getByText('Telefon raqamini xalqaro formatda to‘liq kiriting.')).toBeVisible()
  await page.getByLabel('Telefon / WhatsApp').fill('+998 90 123 45 67')
  await page.locator('input[name="date"]').fill('2027-04-15')
  await page.locator('input[name="guests"]').fill('3')
  let payload, release
  const pending = new Promise(resolve => { release = resolve })
  await page.route('**/api/lead', async route => { payload = route.request().postDataJSON(); await pending; await route.fulfill({ json: { ok: true } }) })
  await page.getByRole('button', { name: 'Maslahat olish', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Yuborilmoqda…' })).toBeDisabled()
  await expect.poll(() => payload?.name).toBe('Ali Test')
  expect(payload.guests).toBe('3')
  expect(payload.date).toBe('2027-04-15')
  expect(payload.tour).toBeTruthy()
  expect(payload.consent).toBe(true)
  release()
  await expect(page.getByRole('status')).toContainText('Arizangiz qabul qilindi!')
})
test('failed delivery keeps entered details and displays direct contact', async ({ page }) => {
  await page.route('**/api/lead', route => route.fulfill({ status: 502, json: { ok: false, reason: 'delivery-failed' } }))
  await page.goto('/book')
  await fillLead(page)
  await page.getByRole('button', { name: 'Maslahat olish', exact: true }).click()
  await expect(page.getByRole('alert')).toBeVisible()
  await expect(page.getByRole('alert').getByRole('link', { name: 'Telegram' })).toBeVisible()
  await expect(page.getByLabel('F.I.SH.')).toHaveValue('Ali Test')
  await expect(page.getByRole('status')).toHaveCount(0)
})
test('catalogue filters and every main route render without errors', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/tours')
  await page.getByLabel('Muddat').selectOption('4-6')
  await expect(page.locator('.journey-card')).toHaveCount(1)
  await page.getByRole('button', { name: 'Filtrlarni tozalash' }).click()
  await expect(page.locator('.journey-card')).toHaveCount(3)
  for (const path of ['/tours/tour-package-7-days', '/destinations', '/about', '/contact', '/book']) {
    await page.goto(path)
    await expect(page.locator('h1')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await page.setViewportSize({ width: 390, height: 844 })
  for (const path of ['/tours/tour-package-7-days', '/contact', '/book']) {
    await page.goto(path)
    await expect(page.locator('h1')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  expect(errors).toEqual([])
})
test('local API is mounted and rejects unsupported or invalid requests', async ({ request }) => {
  const method = await request.get('/api/lead')
  expect(method.status()).toBe(405)
  expect(await method.json()).toEqual({ ok: false, reason: 'method-not-allowed' })
  const invalid = await request.post('/api/lead', { data: { name: 'x' } })
  expect(invalid.status()).toBe(400)
})
test('reduced motion keeps content visible and a static globe', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.travel-globe canvas')).toBeVisible({ timeout: 15000 })
  await expect(page.locator('.lead-form-card')).toHaveCSS('opacity', '1')
  await expect(page.locator('.floating-ticket')).toHaveCSS('animation-name', 'none')
})
