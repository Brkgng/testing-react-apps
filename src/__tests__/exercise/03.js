// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
import {screen, render, fireEvent} from '@testing-library/react'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />)

  const increment = screen.getByRole('button', {name: 'Increment'})
  const decrement = screen.getByRole('button', {name: 'Decrement'})
  const message = screen.getByText('Current count: 0')

  expect(message).toHaveTextContent('Current count: 0')
  fireEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  fireEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
