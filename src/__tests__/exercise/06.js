// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'

window.navigator.geolocation = {getCurrentPosition: jest.fn()}

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const fakePosition = {coords: {latitude: 10, longitude: 20}}

  const {promise, resolve} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    (successCb, errorCb) => {
      promise.then(() => successCb(fakePosition)).catch(() => errorCb())
    },
  )

  render(<Location />)

  const spinnerWhileLoading = screen.getByLabelText(/loading/i)
  expect(spinnerWhileLoading).toBeInTheDocument()

  await act(async () => {
    resolve()
    await promise
  })

  const spinnerAfterLoading = screen.queryByLabelText(/loading/i)
  expect(spinnerAfterLoading).not.toBeInTheDocument()

  const latitude = screen.getByText('Latitude: 10')
  expect(latitude).toBeInTheDocument()

  const longitude = screen.getByText('Longitude: 20')
  expect(longitude).toBeInTheDocument()
})

/*
eslint
  no-unused-vars: "off",
*/
