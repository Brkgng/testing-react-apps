// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {handlers} from 'test/server-handlers'
import Login from '../../components/login-submission'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)

  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  const loading = screen.getByLabelText('loading...')
  await waitForElementToBeRemoved(loading)

  const userName = screen.getByText(username)
  expect(userName).toBeInTheDocument()
})

test('logging in displays the error message when password is not provided', async () => {
  render(<Login />)

  const {username} = buildLoginForm()

  const usernameInput = screen.getByLabelText(/username/i)
  await userEvent.type(usernameInput, username)

  const submit = screen.getByText(/submit/i)
  await userEvent.click(submit)

  const loading = screen.getByLabelText('loading...')
  await waitForElementToBeRemoved(loading)

  const error = screen.getByRole('alert')
  expect(error).toBeInTheDocument()
})

test('logging in displays the error message when server is down', async () => {
  server.resetHandlers()
  server.use(rest.post('https://'))
  render(<Login />)
})
