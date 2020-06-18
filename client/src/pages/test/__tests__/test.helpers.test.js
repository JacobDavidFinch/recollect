import {includedInTag, getTestCards} from "../test.helpers"

// UNIT - JS Functions
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