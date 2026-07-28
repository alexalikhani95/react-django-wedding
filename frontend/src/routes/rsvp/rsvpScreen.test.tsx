import "@testing-library/jest-dom"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { HttpResponse, http } from "msw"
import { expect, test } from "vitest"
import { server } from "@/mocks/server"
import { render } from "@/utils/test-utils"
import RsvpScreen from "./RsvpScreen"

const API_URL = import.meta.env.VITE_API_URL

test("weddingDayNoMeals access hides the meal choices but keeps allergies", async () => {
  render(<RsvpScreen access="weddingDayNoMeals" />)

  await userEvent.type(screen.getByLabelText("FIRST NAME"), "Test")
  await userEvent.type(screen.getByLabelText("LAST NAME"), "Guest")
  await userEvent.click(screen.getByRole("radio", { name: "Joyfully Accepts" }))

  expect(
    await screen.findByText("Allergies and Intolerances"),
  ).toBeInTheDocument()
  expect(screen.queryByText("The Menu")).not.toBeInTheDocument()
})

test("weddingDayNoMeals randomly picks a meal combination on submit", async () => {
  let capturedBody: Record<string, unknown> | null = null
  server.use(
    http.post(`${API_URL}/api/rsvp/create/`, async ({ request }) => {
      capturedBody = (await request.json()) as Record<string, unknown>
      return HttpResponse.json({})
    }),
  )

  render(<RsvpScreen access="weddingDayNoMeals" />)

  await userEvent.type(screen.getByLabelText("FIRST NAME"), "Test")
  await userEvent.type(screen.getByLabelText("LAST NAME"), "Guest")
  await userEvent.click(screen.getByRole("radio", { name: "Joyfully Accepts" }))
  await userEvent.click(
    screen.getByRole("radio", { name: "None / Not applicable" }),
  )
  await userEvent.click(
    screen.getByRole("button", { name: /submit your rsvp/i }),
  )

  const body = await waitFor(() => {
    if (!capturedBody) throw new Error("RSVP was not submitted yet")
    return capturedBody
  })

  expect(["tomato", "antipasti"]).toContain(body.starter)
  expect(["croute", "risotto"]).toContain(body.main)
  expect(["tart", "jelly"]).toContain(body.dessert)
})
