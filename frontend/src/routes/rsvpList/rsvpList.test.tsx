import '@testing-library/jest-dom'
import { expect, test } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/utils/test-utils'
import { RsvpList } from '.'
test('RsvpList page renders', async () => {
  render(<RsvpList />)

  expect(await screen.findByText('Attending (1)')).toBeInTheDocument()
  expect(await screen.findByText('Not Attending (1)')).toBeInTheDocument()

  expect(await screen.findByText('Eze')).toBeInTheDocument()
  expect(await screen.findByText('Saka')).toBeInTheDocument()
})