// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '../../test/test-utils'
import EasyButton from '../../components/easy-button'

test('renders with the light styles for the light theme', () => {
  render(<EasyButton>Easy</EasyButton>, {theme: 'light'})

  const lightButton = screen.getByRole('button', {name: /easy/i})
  expect(lightButton).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

test('renders with the light styles for the light theme', () => {
  render(<EasyButton>Easy</EasyButton>, {theme: 'dark'})

  const darkButton = screen.getByRole('button', {name: /easy/i})
  expect(darkButton).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})
/* eslint no-unused-vars:0 */
