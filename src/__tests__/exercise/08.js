// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, renderHook} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

const Wrapper = ({initialCount, step}) => {
  const {count, increment, decrement} = useCounter({initialCount, step})

  return (
    <>
      <div>Count: {count}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  )
}

test('initialCount and step', async () => {
  render(<Wrapper initialCount={3} step={2} />)

  const count = screen.getByText(/count/i)
  const incrementBtn = screen.getByRole('button', {name: /increment/i})
  const decrementBtn = screen.getByRole('button', {name: /decrement/i})

  expect(count).toHaveTextContent('Count: 3')

  await userEvent.click(incrementBtn)
  expect(count).toHaveTextContent('Count: 5')

  await userEvent.click(incrementBtn)
  expect(count).toHaveTextContent('Count: 7')

  await userEvent.click(decrementBtn)
  expect(count).toHaveTextContent('Count: 5')
})

test('exposes the count and increment/decrement functions', async () => {
  render(<Wrapper />)

  const count = screen.getByText(/count/i)
  const incrementBtn = screen.getByRole('button', {name: /increment/i})
  const decrementBtn = screen.getByRole('button', {name: /decrement/i})

  expect(count).toHaveTextContent('Count: 0')

  await userEvent.click(incrementBtn)
  expect(count).toHaveTextContent('Count: 1')

  await userEvent.click(incrementBtn)
  expect(count).toHaveTextContent('Count: 2')

  await userEvent.click(decrementBtn)
  expect(count).toHaveTextContent('Count: 1')
})

/* eslint no-unused-vars:0 */
