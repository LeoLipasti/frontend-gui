// the assumption is call response data is of one type
// if this is not the case for backend design, change this test.
import responses from '../../jest/responses/index'

// ./jest/responses
describe('given response data shares only one data type', () => {
  responses.forEach((response) => {
    let typesArray = [];
    response.data.forEach((importData) => {
      if (!typesArray.includes(importData.type)) {
        typesArray.push(importData.type);
      }
    })
    it('Data contains one type', () => {
      expect(
        typesArray.length
      ).toBe(
        1
      )
    })
  })
});