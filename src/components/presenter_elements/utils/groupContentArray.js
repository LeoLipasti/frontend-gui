import { FieldType } from '../../../models/tsutils/forms/card';

import { AutomatedSizingGroup, AutomatedSizingFields } from './automatedSizing';

/**
 * Row groups if defined in model
 * if not uses automated sizing
 * 
 * @param {Array} contentArray
 * 
 */
export default function groupContentArray(contentArray){
  const groupArray = [];
  let definedGroup = [];
  let autoGroup = [];
  let cutArray = false;

  for (var i = 0; i < contentArray.length; i++) {
    if (!!contentArray[i].type){
      // type is required.
      if (contentArray[i].type === FieldType.RowStart || contentArray[i].type === FieldType.RowEnd) {
        // Row Start or Row End
        cutArray = !cutArray;
        if (definedGroup.length > 0) {
          // push developer defined group items
          groupArray.push(AutomatedSizingFields(definedGroup));
          definedGroup = [];
        } else if (autoGroup.length > 0) {
          // push automated group items
          groupArray.push(AutomatedSizingFields(autoGroup));
          autoGroup = [];
        }
      }
      else if (cutArray) {
        // developer defined group items
        definedGroup.push(contentArray[i]);
      }
      else if (!cutArray) {
        // automated group items
        let sizingComparisonGroup = autoGroup.slice();
        let fieldIndex = sizingComparisonGroup.length;
        sizingComparisonGroup.push(contentArray[i]);
        if (contentArray.length + 1 < i) {
          sizingComparisonGroup.push(contentArray[i + 1]);
        }
        switch (AutomatedSizingGroup(
          sizingComparisonGroup,
          fieldIndex
        )) {
          case "BREAK LAST":
            groupArray.push(AutomatedSizingFields(autoGroup));
            autoGroup = [];
            autoGroup.push(contentArray[i]);
            break;
          case "BREAK HERE":
            autoGroup.push(contentArray[i]);
            groupArray.push(AutomatedSizingFields(autoGroup));
            autoGroup = [];
            break;
          default:
            autoGroup.push(contentArray[i]);
        }
      }
    }
  }

  // remaining fields - what is left of autogroup array
  if (autoGroup.length > 0) {
    groupArray.push(autoGroup);
  }

  return groupArray;
}