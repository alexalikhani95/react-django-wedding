import "@testing-library/jest-dom"
import { afterAll, afterEach, beforeAll } from "vitest"
import { server } from "../src/mocks/server"

// jsdom has no ResizeObserver; Radix primitives (e.g. RadioGroup) need one.
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// jsdom doesn't implement scrollIntoView.
Element.prototype.scrollIntoView = () => {}

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }))

// Reset handlers after each test (so tests are isolated).
afterEach(() => server.resetHandlers())

// Clean up once the tests are done.
afterAll(() => server.close())
