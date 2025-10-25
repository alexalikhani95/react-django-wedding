import { expect, test } from "@playwright/test"
import { mockGuests } from "../src/routes/guests/mocks"

test.describe("Guests Page (renders correctly)", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/guests/list/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockGuests),
      }),
    )

    await page.goto("/guests")
  })

  test("renders correctly", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Guests", level: 1 }),
    ).toBeVisible()

    await expect(page.getByRole("heading", { name: "Add guest" })).toBeVisible()

    // Add guest Form
    await expect(page.getByLabel("Guest name")).toBeVisible()
    await expect(page.getByLabel("Bride")).toBeVisible()
    await expect(page.getByLabel("Groom")).toBeVisible()
    await expect(page.getByRole("button", { name: "Add guest" })).toBeVisible()

    // Bride/Groom guest Panels
    await expect(
      page.getByRole("heading", { name: "Bride Guests" }),
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { name: "Groom Guests" }),
    ).toBeVisible()

    // guest list names
    await expect(page.getByText("Alice")).toBeVisible()
    await expect(page.getByText("Bob")).toBeVisible()
  })
})
