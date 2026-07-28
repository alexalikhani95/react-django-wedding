import "@testing-library/jest-dom"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, test } from "vitest"
import { render } from "@/utils/test-utils"
import { Costs } from "."

test("Costs page defaults to Not Fully Paid tab", async () => {
  render(<Costs />)

  expect(await screen.findByText("Catering")).toBeInTheDocument()
  expect(screen.queryByText("Venue")).not.toBeInTheDocument()
})

test("Costs page can switch to Paid tab", async () => {
  const user = userEvent.setup()
  render(<Costs />)

  await screen.findByText("Catering")
  await user.click(screen.getByRole("tab", { name: "Paid" }))

  await waitFor(() => {
    expect(screen.getByText("Venue")).toBeInTheDocument()
  })
  expect(screen.queryByText("Catering")).not.toBeInTheDocument()
})
