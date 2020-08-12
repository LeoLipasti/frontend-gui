// each model has been given a reference response
import responses from '../../jest/responses/index'

import forms from '../../models/samples/forms/typechecks';
import lists from '../../models/samples/lists/typechecks';
import tables from '../../models/samples/tables/typechecks';

// ../responses compared with ./Models
describe('Models have been given a sample response to test', () => {
  test('Model type exists in responses', () => {
    let responseArray = [];
    let modelArray = [];

    responses.forEach((response) => {
      if (response.data[0].type && !responseArray.includes(response.data[0].type)) {
        responseArray.push(response.data[0].type);
      }
    })
      
    tables.forEach((table) => {
      if (!!table.type && !modelArray.includes(table.type)) {
        modelArray.push(table.type);
      }
    })

    lists.forEach((list) => {
      if (!!lists.type && !modelArray.includes(lists.type)) {
        modelArray.push(lists.type);
      }
    })

    forms.forEach((form) => {
      if (!!form.type && !modelArray.includes(form.type)) {
        modelArray.push(form.type);
      }
    })

    expect(
      responseArray.sort().join(', ')
    ).toBe(
      modelArray.sort().join(', ')
    )

  })
})