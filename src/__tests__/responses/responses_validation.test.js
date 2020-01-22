// the assumption is call response data contains data: [ objects, ... attributes ]
// if this is not the case for backend design, change this test and frontend.
import responses from '../../jest/responses/index'

// ./jest/responses
describe('given response data is in the assumed format', () => {

  responses.forEach((response) => {

    let passes = '';
    let total = '';

    // contains data
    if (!!response.data) {
      passes += '-data-';
    }
    total += '-data-';

    // data is an array
    if (Array.isArray(response.data)) {
      passes += 'array-';
    }
    total += 'array-';

    // element in data is an object
    let passObjects = true;
    response.data.forEach((importData) => {
      if (importData === null || typeof importData !== 'object') {
        passObjects = false;
      }
    })
    if (passObjects) {
      passes += 'objects-';
    }
    total += 'objects-';

    // contains attributes
    let passAttributes = true;
    response.data.forEach((importData) => {
      if (!importData.attributes) {
        passAttributes = false;
      }
    })
    if (passAttributes) {
      passes += 'attributes-';
    }
    total += 'attributes-';

    // on fail gives you helpful information
    it('Data is in JSON format and as expected for this app', () => {
      expect(
        passes
      ).toBe(
        total
      )
    })
  })
});