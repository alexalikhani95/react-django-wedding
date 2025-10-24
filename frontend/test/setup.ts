
import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from '../src/mocks/server'


// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Reset handlers after each test (so tests are isolated).
afterEach(() => server.resetHandlers())

// Clean up once the tests are done.
afterAll(() => server.close())