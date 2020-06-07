import React from 'react'
import { fireEvent, waitFor, screen } from '@testing-library/react'
import {render} from "../../../test-utils"
import {TestPage, includedInTag, getTestCards} from "../test.page"
import '@testing-library/jest-dom/extend-expect'

test('Selects cards with proper tags for test', () => {
    const test =  ["subject", "okay"];
    const cards = [
          {
            "name": "test",
            "summary": "test",
            "tags": [
              "test",
              "subject"
            ]
          },
          {
            "name": "test",
            "summary": "test",
            "tags": [
              "test",
              "duh"
            ]
          },
        ];
    
    const isCardIncludedInTest = includedInTag(test);
    const result =  getTestCards(cards, isCardIncludedInTest);
    expect(result).toStrictEqual([{...cards[0]}])
})

// test('loads and displays first card', async () => {
//     render(<TestPage />)

//     await waitFor(() => screen.getByRole('heading'))

//     expect(axiosMock.get).toHaveBeenCalledTimes(1)
// })