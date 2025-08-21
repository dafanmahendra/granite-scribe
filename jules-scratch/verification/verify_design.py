import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the landing page and take a screenshot
        await page.goto("http://127.0.0.1:5173/")
        await page.wait_for_load_state("networkidle")
        await page.screenshot(path="jules-scratch/verification/landing-page.png")

        # Navigate to the assistant page
        await page.get_by_role("button", name="Launch App").click()

        # Wait for the main heading on the assistant page to be visible
        await expect(page.get_by_role("heading", name="AI Cover Letter")).to_be_visible()

        await page.screenshot(path="jules-scratch/verification/assistant-page.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
