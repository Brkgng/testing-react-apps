// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  const fakePosition = {coords: {latitude: 10, longitude: 20}}

  let setPosition, setError
  useCurrentPosition.mockImplementation(() => {
    const positionState = React.useState(null)
    const errorState = React.useState(false)

    setPosition = positionState[1]
    setError = errorState[1]

    return [positionState[0], errorState[0]]
  })

  render(<Location />)

  const spinnerWhileLoading = screen.getByLabelText(/loading/i)
  expect(spinnerWhileLoading).toBeInTheDocument()

  const errorMessage = 'position is not found'
  act(() => {
    setError({message: errorMessage})
  })

  expect(screen.getByRole('alert')).toHaveTextContent(errorMessage)

  act(() => {
    setError(false)
    setPosition(fakePosition)
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
