import '@testing-library/jest-dom'
import { expect, test } from 'vitest'
import {screen, waitFor} from '@testing-library/react'
import { render } from '@/utils/test-utils'
import { Guests } from '.'

test('Guests page renders', async () => {
    render(<Guests />)

    expect(screen.getByRole('heading', {name: 'Guests'})).toBeInTheDocument()

    expect(screen.getByRole('button', {name: 'Add guest'})).toBeInTheDocument()

    expect(screen.getByPlaceholderText('Search guest...')).toBeInTheDocument()

    await waitFor(() => {
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })
})