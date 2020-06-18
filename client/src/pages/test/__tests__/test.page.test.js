import React from 'react'
import { fireEvent, waitFor, screen } from '@testing-library/react'
import {render} from "../../../test-utils"
import {TestPage} from "../test.page"
import '@testing-library/jest-dom/extend-expect'

// UNIT - React Render

test('Displays the current count and how many cards are left', () => {
  
})

test('Displays percent correct and last time you answered', () => {

})

test('Handles test view', () => {

})

test('Final view selection', () => {

})



// INTEGRATED - React Render

// test('loads and displays first card', async () => {
//     render(<TestPage />)

//     await waitFor(() => screen.getByRole('heading'))

//     expect(axiosMock.get).toHaveBeenCalledTimes(1)
// })