import "@testing-library/jest-dom"
import { screen } from "@testing-library/react"
import { expect, test } from "vitest"
import { render } from "@/utils/test-utils"
import { RsvpList } from "."

test("RsvpList page renders", async () => {
  render(<RsvpList />)

  expect(await screen.findByText("Wedding Day — Attending")).toBeInTheDocument()
  expect(
    await screen.findByText("Wedding Day — Not Attending"),
  ).toBeInTheDocument()
  expect(await screen.findByText(/Ebereche Eze/)).toBeInTheDocument()
  expect(await screen.findByText(/Bukayo Saka/)).toBeInTheDocument()
})
