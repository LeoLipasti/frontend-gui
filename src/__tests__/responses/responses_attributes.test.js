// Comparing created models with sample response and 
// a check to see if it has valid attributes
import responses from '../../jest/responses/index'

import lists from '../../models/lists/typechecks';
import tables from '../../models/tables/typechecks';

// ../responses compared with ./Models
// Comparing response data with model where response type and model type match
describe('Model doesnt have incorrect attributes', () => {
  test('Models that use this type match with given response', () => {
    let pass = '';

    responses.forEach((response) => {
      tables.forEach((table) => {
        if (!!table.type && response.data[0].type === table.type) {
          table.columns.forEach((column) => {
            if (column.db && !response.data[0].attributes.hasOwnProperty(column.db)) {
              pass = pass + ' invalid attribute: ' + column.db;
            }
          })
        }
      })

      lists.forEach((list) => {
        if (!!list.type && response.data[0].type === list.type) {
          list.items.forEach((item) => {
            if (item.db && !response.data[0].attributes.hasOwnProperty(item.db)) {
              pass = pass + ' invalid attribute: ' + item.db;
            }
          })
        }
      })
    })

    expect(
      pass
    ).toBe(
      ''
    )
  });
});

