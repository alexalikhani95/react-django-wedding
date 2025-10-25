import '@testing-library/jest-dom'
import { expect, test } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { render } from '@/utils/test-utils'
import { SeatingMobile } from './SeatingMobile'
import userEvent from '@testing-library/user-event'

test('Seating Mobile page renders', async () => {
    render(<SeatingMobile />)

    expect(screen.getByRole('heading', { name: 'Seating' })).toBeInTheDocument()

    expect(screen.getByText('Add Table')).toBeInTheDocument()
    expect(await screen.findByRole('textbox', { name: 'Table name' })).toBeInTheDocument()

    // Unassigned guests
    expect(await screen.findByText('Unassigned Guests (2)')).toBeInTheDocument()
    expect(await screen.findByText('Saka')).toBeInTheDocument()
    expect(await screen.findByText('William Saliba')).toBeInTheDocument()

    expect(await screen.findByText('Table 1')).toBeInTheDocument()
    // expect(screen.getByRole('button', { name: 'Delete Table 1' })).toBeInTheDocument()
    expect(await screen.findByText('Table 2')).toBeInTheDocument()
    // expect(screen.getByRole('button', { name: 'Delete Table 2' })).toBeInTheDocument()
})

test('The Add table button remains disabled until a name is entered in the form', async () => {
    render(<SeatingMobile />)

    const addTableBtn = screen.getByRole('button', { name: 'Add' })

    expect(addTableBtn).toBeDisabled()

    await userEvent.type(screen.getByRole('textbox', { name: 'Table name' }), 'Test Table')

    expect(addTableBtn).not.toBeDisabled()
})

test('filters guests by search term', async () => {
    render(<SeatingMobile />)

    const searchBox = screen.getByRole('textbox', { name: "Search guest" })

    expect(await screen.findByText('Saka')).toBeInTheDocument()
    expect(await screen.findByText('William Saliba')).toBeInTheDocument()


    await userEvent.type(searchBox, 'William Saliba')

    await waitFor(() => {
        expect(screen.queryByText('Saka')).not.toBeInTheDocument()
        expect(screen.queryByText('William Saliba')).toBeInTheDocument()
    })
})