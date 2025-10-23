import { expect, test } from 'vitest'
import {screen} from '@testing-library/react'
import { render } from '@/utils/test-utils'
import { Guests } from '.'

test('Guests page', () => {
    render(<Guests />)

    expect(screen.getByRole('heading', {name: 'Guests'})).toBeInTheDocument()
})