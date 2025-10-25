import "@testing-library/jest-dom"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { HttpResponse, http } from "msw"
import { expect, test } from "vitest"
import { server } from "@/mocks/server"
import { render } from "@/utils/test-utils"
import { SeatingDesktop } from "./SeatingDesktop"

test("Seating Desktop page renders", async () => {
  render(<SeatingDesktop />)

  expect(screen.getByRole("heading", { name: "Seating" })).toBeInTheDocument()

  expect(screen.getByText("Add Table")).toBeInTheDocument()
  expect(
    screen.getByRole("textbox", { name: "Table name" }),
  ).toBeInTheDocument()
  expect(await screen.findByText("Guests")).toBeInTheDocument()
  expect(await screen.findByText("Saka")).toBeInTheDocument()

  expect(await screen.findByText("Table 1")).toBeInTheDocument()
  expect(
    screen.getByRole("button", { name: "Delete Table 1" }),
  ).toBeInTheDocument()
  expect(await screen.findByText("Table 2")).toBeInTheDocument()
  expect(
    screen.getByRole("button", { name: "Delete Table 2" }),
  ).toBeInTheDocument()
})

test("The Add table button remains disabled until a name is entered in the form", async () => {
  render(<SeatingDesktop />)

  const addTableBtn = screen.getByRole("button", { name: "Add" })

  expect(addTableBtn).toBeDisabled()

  await userEvent.type(
    screen.getByRole("textbox", { name: "Table name" }),
    "Test Table",
  )

  expect(addTableBtn).not.toBeDisabled()
})

test("filters guests by search term", async () => {
  render(<SeatingDesktop />)

  const searchBox = screen.getByRole("textbox", { name: "Search guest" })

  expect(await screen.findByText("Saka")).toBeInTheDocument()

  await userEvent.type(searchBox, "random text")

  await waitFor(() => {
    expect(screen.queryByText("Saka")).not.toBeInTheDocument()
    expect(
      screen.queryByText("No guests match your search."),
    ).toBeInTheDocument()
  })
})

test("shows correct text when no guests are returned", async () => {
  server.use(
    http.get(`${import.meta.env.VITE_API_URL}/api/guests/list/`, () => {
      return HttpResponse.json([])
    }),
  )
  render(<SeatingDesktop />)

  expect(await screen.findByText("No guests yet.")).toBeInTheDocument()
})
