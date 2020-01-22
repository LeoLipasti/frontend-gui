// test to confirm models are in correct format
// only files from typechecks are imported
// typescript should also already error with ts files
// but this test is for the actual compiled js files
import forms from '../../models/forms/typechecks';
import lists from '../../models/lists/typechecks';
import tables from '../../models/tables/typechecks';

// ./Models
describe('given model data is in the assumed format', () => {

    let passes = '';
    let total = '';
    let passObjects = true;
    let passAttributes = true;

    it('model format is as expected for this app', () => {
      // is an object
      tables.forEach((table) => {
        if (table === null || typeof table !== 'object') {
          passObjects = false;
          passes += 'bad_table-';
          passes += table.header+'-';
          passes += table.type+'-';
        }
      })
      lists.forEach((list) => {
        if (list === null || typeof list !== 'object') {
          passObjects = false;
          passes += 'bad_list-';
          passes += list.type+'-';
        }
      })
      forms.forEach((form) => {
        if (form === null || typeof form !== 'object') {
          passObjects = false;
          passes += 'bad_form-';
          passes += form.header+'-';
        }
      })
      if (passObjects) {
        passes += 'objects-';
      }
      total += 'objects-';

      // Array of object tests
      passObjects = true;
      passAttributes = true;
      // form contains fields
      forms.forEach((form) => {
        if (!form.fields) {
          passAttributes = false;
          passes += 'bad_form-';
          passes += form.header+'-';
        }
      })
      // fields contains and Array of objects
      forms.forEach((form) => {
        if (Array.isArray(form.fields)) {
          form.fields.forEach((field) => {
            if (field === null || typeof field !== 'object') {
              passObjects = false;
              passes += 'bad_form-';
              passes += form.header+'-';
            }
          })
        } else {
          passObjects = false;
          passes += 'bad_form-';
          passes += form.header+'-';
        }
      })
      if (passObjects && passAttributes) {
        passes += 'fields-';
      }
      total += 'fields-';

      passObjects = true;
      passAttributes = true;
      // list contains items
      passObjects = true;
      lists.forEach((list) => {
        if (!list.items) {
          passObjects = false;
          passes += 'bad_list-';
          passes += list.type+'-';
        }
      })
      // items contains and Array of objects
      lists.forEach((list) => {
        if (Array.isArray(list.items)) {
          list.items.forEach((item) => {
            if (item === null || typeof item !== 'object') {
              passObjects = false;
              passes += 'bad_list-';
              passes += list.type+'-';
            }
          })
        } else {
          passObjects = false;
          passes += 'bad_list-';
          passes += list.type+'-';
        }
      })
      if (passObjects && passAttributes) {
        passes += 'items-';
      }
      total += 'items-';

      passObjects = true;
      passAttributes = true;
      // table contains columns
      passObjects = true;
      tables.forEach((table) => {
        if (!table.columns) {
          passObjects = false;
          passes += 'bad_table-';
          passes += table.header+'-';
          passes += table.type+'-';
        }
      })
      // columns contains and Array of objects
      tables.forEach((table) => {
        if (Array.isArray(table.columns)) {
          table.columns.forEach((column) => {
            if (column === null || typeof column !== 'object') {
              passObjects = false;
              passes += 'bad_table-';
              passes += table.header+'-';
              passes += table.type+'-';
            }
          })
        } else {
          passObjects = false;
          passes += 'bad_table-';
          passes += table.header+'-';
          passes += table.type+'-';
        }
      })
      if (passObjects && passAttributes) {
        passes += 'columns-';
      }
      total += 'columns-';

      // valid attributes:
      // if you change the rules change this test
      const validAttributes = {
        title: 'string',
        db: 'string',
        width: 'string%',
        placeholder: 'string|boolean',
        maxLength: 'string',
        type: 'string',
        action: 'string',
        required: 'string',
        header: 'string',
        alignment: 'string',
        color: 'string',
        bg_color: 'string',
        rows: 'string',
        cols: 'string',
        locked: 'string',
        name: 'string',
        min: 'number',
        max: 'number',
        image: 'string',
        message: 'string',
        offset1st: 'boolean',
        fillempty: 'boolean',
        options: 'array'
      };

      tables.forEach((table) => {
        table.columns.forEach((column) => {
          const keys = Object.keys(column);
          keys.forEach((key) => {
            if (validAttributes[key] === null) {
              passes += 'bad table-';
              passes += 'bad_attribute-';
              passes += key+'-';
            } else if (validAttributes[key] === 'array' && !Array.isArray(column[key])) {
              passes += 'bad table-';
              passes += 'not Array-';
              passes += key+'-';
            } else if (validAttributes[key] === 'boolean' && typeof column[key] !== "boolean") {
              passes += 'bad table-';
              passes += 'not bool-';
              passes += key+'-';
            } else if (validAttributes[key] === 'number' && typeof column[key] !== "number") {
              passes += 'bad table-';
              passes += 'not number-';
              passes += key+'-';
            } else if (validAttributes[key] === 'string' && typeof column[key] !== "string") {
              passes += 'bad table-';
              passes += 'not string-';
              passes += key+'-';
            } else if (validAttributes[key] === 'string|boolean') {
              if (typeof column[key] !== "string" && typeof column[key] !== "boolean") {
                passes += 'bad form-';
                passes += 'not string|boolean-';
                passes += key+'-';
              }
            } else if (validAttributes[key] === 'string%') {
              if (column[key].substr(column[key].length - 1) !== '%') {
                passes += 'bad table-';
                passes += 'not percentage-';
                passes += key+'-';
              }
              if (typeof column[key] !== "string") {
                passes += 'bad table-';
                passes += 'not string-';
                passes += key+'-';
              }
            }
          })
        })
      })
      lists.forEach((list) => {
        list.items.forEach((item) => {
          const keys = Object.keys(item);
          keys.forEach((key) => {
            if (validAttributes[key] === null) {
              passes += 'bad list-';
              passes += 'bad_attribute-';
              passes += key+'-';
            } else if (validAttributes[key] === 'array' && !Array.isArray(item[key])) {
              passes += 'bad list-';
              passes += 'not Array-';
              passes += key+'-';
            } else if (validAttributes[key] === 'boolean' && typeof item[key] !== "boolean") {
              passes += 'bad list-';
              passes += 'not bool-';
              passes += key+'-';
            } else if (validAttributes[key] === 'number' && typeof item[key] !== "number") {
              passes += 'bad list-';
              passes += 'not number-';
              passes += key+'-';
            } else if (validAttributes[key] === 'string' && typeof item[key] !== "string") {
              passes += 'bad list-';
              passes += 'not string-';
              passes += key+'-';
            } else if (validAttributes[key] === 'string|boolean') {
              if (typeof item[key] !== "string" && typeof item[key] !== "boolean") {
                passes += 'bad form-';
                passes += 'not string|boolean-';
                passes += key+'-';
              }
            } else if (validAttributes[key] === 'string%') {
              if (item[key].substr(item[key].length - 1) !== '%') {
                passes += 'bad list-';
                passes += 'not percentage-';
                passes += key+'-';
              }
              if (typeof item[key] !== "string") {
                passes += 'bad list-';
                passes += 'not string-';
                passes += key+'-';
              }
            }
          })
        })
      })
      forms.forEach((form) => {
        form.fields.forEach((field) => {
          const keys = Object.keys(field);
          keys.forEach((key) => {
            if (validAttributes[key] === null) {
              passes += 'bad form-';
              passes += 'bad_attribute-';
              passes += key+'-';
            } else if (validAttributes[key] === 'array' && !Array.isArray(field[key])) {
              passes += 'bad form-';
              passes += 'not Array-';
              passes += key+'-';
            } else if (validAttributes[key] === 'boolean' && typeof field[key] !== "boolean") {
              passes += 'bad form-';
              passes += 'not bool-';
              passes += key+'-';
            } else if (validAttributes[key] === 'number' && typeof field[key] !== "number") {
              passes += 'bad form-';
              passes += 'not number-';
              passes += key+'-';
            } else if (validAttributes[key] === 'string' && typeof field[key] !== "string") {
              passes += 'bad form-';
              passes += 'not string-';
              passes += key+'-';
            } else if (validAttributes[key] === 'string|boolean') {
              if (typeof field[key] !== "string" && typeof field[key] !== "boolean") {
                passes += 'bad form-';
                passes += 'not string|boolean-';
                passes += key+'-';
              }
            } else if (validAttributes[key] === 'string%') {
              if (field[key].substr(field[key].length - 1) !== '%') {
                passes += 'bad form-';
                passes += 'not percentage-';
                passes += key+'-';
              }
              if (typeof field[key] !== "string") {
                passes += 'bad form-';
                passes += 'not string-';
                passes += key+'-';
              }
            }
          })
        })
      })

      // on fail gives you helpful information
      expect(
        passes
      ).toBe(
        total
      )
    })
});