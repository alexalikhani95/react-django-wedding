import "@testing-library/jest-dom"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, test } from "vitest"
import { render } from "@/utils/test-utils"
import { Guests } from "."

test("Guests page renders", async () => {
  render(<Guests />)

  expect(screen.getByRole("heading", { name: "Guests" })).toBeInTheDocument()

  expect(screen.getByRole("button", { name: "Add guest" })).toBeInTheDocument()

  expect(screen.getByPlaceholderText("Search guest...")).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText("Alice")).toBeInTheDocument()
    expect(screen.getByText("Bob")).toBeInTheDocument()
  })
})

test("The Add guest button remains disabled until a name is entered in the form", async () => {
  render(<Guests />)

  const addGuestsBtn = screen.getByRole("button", { name: "Add guest" })

  expect(addGuestsBtn).toBeDisabled()

  await userEvent.type(
    screen.getByRole("textbox", { name: "Guest name" }),
    "Test name",
  )

  expect(addGuestsBtn).not.toBeDisabled()
})

test("filters guests by search term", async () => {
  render(<Guests />)

  const searchBox = screen.getByRole("textbox", { name: "Search guest" })

  await userEvent.type(searchBox, "Alice")

  await waitFor(() => {
    expect(screen.getByText("Alice")).toBeInTheDocument()
    expect(screen.queryByText("Bob")).not.toBeInTheDocument()
  })
})
