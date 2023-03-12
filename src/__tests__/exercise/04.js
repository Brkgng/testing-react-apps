// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'

function buildLoginForm() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  const {username, password} = buildLoginForm()
  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameInput = screen.getByLabelText(/username/i)
  await userEvent.type(usernameInput, username)

  const passwordInput = screen.getByLabelText(/password/i)
  await userEvent.type(passwordInput, password)

  await userEvent.click(screen.getByText(/submit/i))

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
