
import fieldWidths from '../../../style/bootstrap/fieldWidths';
import classNames from '../../../style/bootstrap/classNames';
import referenceSizes from '../../../style/bootstrap/referenceSizes';

/**
 * If no widths are defined automated sizing
 * 
 * @param {String} type
 * @param {Array} sizingComparisonGroup
 * @param {Number} fieldIndex
 * 
 */
export function AutomatedSizingGroup(sizingComparisonGroup, fieldIndex) {
  let mintotal = 0;
  for (var i = 0; i < sizingComparisonGroup.length; i++) {
    // date-time local needs string replace
    let size = fieldWidths[sizingComparisonGroup[i].type.replace("-","")];
    mintotal += referenceSizes[size.minWidth];
    // case of radiobuttons next to each other
    // preferably stay in one line so breaking early
    if (sizingComparisonGroup[i].type === "radio" && i !== 0) {
      // latest input must not be radiobutton to cause line break
      if (sizingComparisonGroup[i-1].type !== "radio") {
        return "BREAK LAST";
      }
    }

    // minimum widths reached
    if (mintotal > 1) {
      if (i === fieldIndex) {
        return "BREAK LAST";
      } else if (i > fieldIndex) {
        return "BREAK HERE";
      }
    }
  }
  return;
}

/**
 * If no widths are defined automated sizing
 * By no means perfect but makes sure result 
 * is not awful without manually written groups.
 * 
 * @param {Array} modelArray
 * 
 */
export function AutomatedSizingFields(modelArray){
  // case when there's only one input
  if (modelArray.length === 1) {
    return [ Object.assign({}, modelArray[0], {width: classNames.md12}) ];
  }

  let newModels = modelArray.slice();
  let minvalues = [];
  let maxvalues = [];
  let definedValues = false;

  // date-time local needs string replace
  for (var i = 0; i < modelArray.length; i++) {
    minvalues.push(fieldWidths[modelArray[i].type.replace("-","")].minWidth);
    maxvalues.push(fieldWidths[modelArray[i].type.replace("-","")].maxWidth);
    // developer assigned values must be followed blindly
    if (!!modelArray[i].width){
      definedValues = true;
    }
  }
  if (!definedValues) {
    // case with 2 fields
    if (modelArray.length === 2) {
      if (minvalues[0] === minvalues[1]) {
        // 50% 50%
        newModels[0].width = classNames.md6;
        newModels[1].width = classNames.md6;
      } else if (referenceSizes[minvalues[0]] < referenceSizes[minvalues[1]]) {
        newModels = case2(0,1,newModels,minvalues,maxvalues);
      } else if (referenceSizes[minvalues[1]] < referenceSizes[minvalues[0]]) {
        newModels = case2(1,0,newModels,minvalues,maxvalues);
      } else {
        // safe fallback to 50% 50%
        newModels[1].width = classNames.md6;
        newModels[0].width = classNames.md6;
      }
    } else if (modelArray.length === 3) {
      // case with 3 fields
      if (minvalues[0] === "1/2") {
        newModels = case3(0,1,2,newModels,minvalues,maxvalues);
      } else if (minvalues[1] === "1/2") {
        newModels = case3(1,0,2,newModels,minvalues,maxvalues);
      } else if (minvalues[2] === "1/2") {
        newModels = case3(2,1,0,newModels,minvalues,maxvalues);
      } else if (referenceSizes[minvalues[0]] < referenceSizes[minvalues[1]] && minvalues[1] === minvalues[2] && referenceSizes[maxvalues[1]] > 1/3) {
        newModels[0].width = classNames.md2;
        newModels[1].width = classNames.md5;
        newModels[2].width = classNames.md5;
      } else if (referenceSizes[minvalues[1]] < referenceSizes[minvalues[2]] && minvalues[0] === minvalues[2] && referenceSizes[maxvalues[2]] > 1/3) {
        newModels[0].width = classNames.md5;
        newModels[1].width = classNames.md2;
        newModels[2].width = classNames.md5;
      } else if (referenceSizes[minvalues[2]] < referenceSizes[minvalues[0]] && minvalues[0] === minvalues[1] && referenceSizes[maxvalues[0]] > 1/3) {
        newModels[0].width = classNames.md5;
        newModels[1].width = classNames.md5;
        newModels[2].width = classNames.md2;
      } else if (referenceSizes[minvalues[0]] > referenceSizes[minvalues[1]] && referenceSizes[minvalues[0]] > referenceSizes[minvalues[2]]) {
        newModels[0].width = classNames.md6;
        newModels[1].width = classNames.md3;
        newModels[2].width = classNames.md3;
      } else if (referenceSizes[minvalues[1]] > referenceSizes[minvalues[0]] && referenceSizes[minvalues[1]] > referenceSizes[minvalues[2]]) {
        newModels[0].width = classNames.md3;
        newModels[1].width = classNames.md6;
        newModels[2].width = classNames.md3;
      } else if (referenceSizes[minvalues[2]] > referenceSizes[minvalues[0]] && referenceSizes[minvalues[2]] > referenceSizes[minvalues[1]]) {
        newModels[0].width = classNames.md3;
        newModels[1].width = classNames.md3;
        newModels[2].width = classNames.md6;
      } else {
        // fallback 33...% 33...% 33...%
        newModels[0].width = classNames.md4;
        newModels[1].width = classNames.md4;
        newModels[2].width = classNames.md4;
      }
    } else if (modelArray.length === 4) {
      // case with 4 fields
      if (referenceSizes[minvalues[0]] < 1/2) {
        newModels = case4(0,1,2,3,newModels,minvalues);
      } else if (referenceSizes[minvalues[1]] < 1/2) {
        newModels = case4(1,0,2,3,newModels,minvalues);
      } else if (referenceSizes[minvalues[2]] < 1/2) {
        newModels = case4(2,0,1,3,newModels,minvalues);
      } else if (referenceSizes[minvalues[3]] < 1/2) {
        newModels = case4(3,0,1,2,newModels,minvalues);
      } else {
        // fallback 25% 25% 25% 25%
        newModels[0].width = classNames.md3;
        newModels[1].width = classNames.md3;
        newModels[2].width = classNames.md3;
        newModels[3].width = classNames.md3;
      }
    } else if (modelArray.length === 5) {
      // case with 5 fields
      if (referenceSizes[minvalues[0]] + referenceSizes[minvalues[1]] + referenceSizes[minvalues[2]] + referenceSizes[minvalues[3]] + referenceSizes[minvalues[4]] === 1){
        newModels[0].width = classNames.auto;
        newModels[1].width = classNames.auto;
        newModels[2].width = classNames.auto;
        newModels[3].width = classNames.auto;
        newModels[4].width = classNames.auto;
      } else if (referenceSizes[minvalues[0]] < 1/2) {
        newModels = case5(0,1,2,3,4,newModels,minvalues);
      } else if (referenceSizes[minvalues[1]] < 1/2) {
        newModels = case5(1,0,2,3,4,newModels,minvalues);
      } else if (referenceSizes[minvalues[2]] < 1/2) {
        newModels = case5(2,0,1,3,4,newModels,minvalues);
      } else if (referenceSizes[minvalues[3]] < 1/2) {
        newModels = case5(3,0,1,2,4,newModels,minvalues);
      } else if (referenceSizes[minvalues[4]] < 1/2) {
        newModels = case5(4,0,1,2,3,newModels,minvalues);
      } else {
        // fallback
        newModels[0].width = classNames.auto;
        newModels[1].width = classNames.auto;
        newModels[2].width = classNames.auto;
        newModels[3].width = classNames.auto;
        newModels[4].width = classNames.auto;
      }
    } else if (modelArray.length === 6) {
      // case with 6 or more fields
      // fields are getting tight
      newModels[0].width = classNames.md2;
      newModels[1].width = classNames.md2;
      newModels[2].width = classNames.md2;
      newModels[3].width = classNames.md2;
      newModels[4].width = classNames.md2;
      newModels[5].width = classNames.md2;
    } else if (modelArray.length > 6) {
      // case with 7 or more fields
      // should never happen
      for (var u = 0; u < modelArray.length; u++) {
        newModels[u].width = classNames.auto;
      }
    }
  }
  return newModels;
}

/**
 * Always returns classnames so that they fill 100%
 * 
 * @param {Number} value1
 * @param {Number} value2
 * @param {Array} newModels
 * @param {Array} minvalues
 * 
 */
function case2(value1,value2,newModels,minvalues,maxvalues) {
  if (minvalues[value1] === "1/3" && maxvalues[1] !== "1/2") {
    newModels[value1].width = classNames.md4;
    newModels[value2].width = classNames.md8;
  } else if (minvalues[value1] === "1/4" && maxvalues[value2] !== "1/2") {
    newModels[value1].width = classNames.md3;
    newModels[value2].width = classNames.md9;
  } else if (minvalues[value1] === "1/5" && maxvalues[value2] !== "1/2") {
    newModels[value1].width = classNames.md3;
    newModels[value2].width = classNames.md9;
  } else if (minvalues[value1] === "1/6" && maxvalues[value2] !== "1/2") {
    newModels[value1].width = classNames.md2;
    newModels[value2].width = classNames.md10;
  } else if (minvalues[value1] === "1/7" && maxvalues[value2] !== "1/2") {
    newModels[value1].width = classNames.md2;
    newModels[value2].width = classNames.md10;
  } else if (minvalues[value1] === "1/8" && maxvalues[value2] !== "1/2") {
    newModels[value1].width = classNames.md1;
    newModels[value2].width = classNames.md11;
  } else {
    // safe fallback to half half
    newModels[value1].width = classNames.md6;
    newModels[value2].width = classNames.md6;
  }

  return newModels;
}

/**
 * Always returns classnames so that they fill 100%
 * 
 * @param {Number} value1
 * @param {Number} value2
 * @param {Number} value3
 * @param {Array} newModels
 * @param {Array} minvalues
 * 
 */
function case3(value1,value2,value3,newModels,minvalues,maxvalues) {

  if (minvalues[0] === minvalues[1] && minvalues[0] === minvalues[2]){
    newModels[0].width = classNames.md4;
    newModels[1].width = classNames.md4;
    newModels[2].width = classNames.md4;
  } else if (minvalues[0] === "1/2" && minvalues[1] === minvalues[2]){
    newModels[0].width = classNames.md6;
    newModels[1].width = classNames.md3;
    newModels[2].width = classNames.md3;
  } else if (minvalues[1] === "1/2" && minvalues[0] === minvalues[2]){
    newModels[0].width = classNames.md3;
    newModels[1].width = classNames.md6;
    newModels[2].width = classNames.md3;
  } else if (minvalues[2] === "1/2" && minvalues[1] === minvalues[0]){
    newModels[0].width = classNames.md3;
    newModels[1].width = classNames.md3;
    newModels[2].width = classNames.md6;
  } else if (minvalues[0] === "1/2" && referenceSizes[minvalues[1]] < referenceSizes[minvalues[2]]){
    newModels[0].width = classNames.md6;
    newModels[1].width = classNames.md2;
    newModels[2].width = classNames.md4;
  } else if (minvalues[0] === "1/2" && referenceSizes[minvalues[2]] < referenceSizes[minvalues[1]]){
    newModels[0].width = classNames.md6;
    newModels[1].width = classNames.md4;
    newModels[2].width = classNames.md2;
  } else if (minvalues[1] === "1/2" && referenceSizes[minvalues[0]] < referenceSizes[minvalues[2]]){
    newModels[0].width = classNames.md2;
    newModels[1].width = classNames.md6;
    newModels[2].width = classNames.md4;
  } else if (minvalues[1] === "1/2" && referenceSizes[minvalues[2]] < referenceSizes[minvalues[0]]){
    newModels[0].width = classNames.md4;
    newModels[1].width = classNames.md6;
    newModels[2].width = classNames.md2;
  } else if (minvalues[2] === "1/2" && referenceSizes[minvalues[1]] < referenceSizes[minvalues[0]]){
    newModels[0].width = classNames.md4;
    newModels[1].width = classNames.md2;
    newModels[2].width = classNames.md6;
  } else if (minvalues[2] === "1/2" && referenceSizes[minvalues[0]] < referenceSizes[minvalues[1]]){
    newModels[0].width = classNames.md2;
    newModels[1].width = classNames.md4;
    newModels[2].width = classNames.md6;
  } else {
    // safe fallback to half half
    newModels[value1].width = classNames.md4;
    newModels[value2].width = classNames.md4;
    newModels[value3].width = classNames.md4;
  }

  return newModels;
}

/**
 * Always returns classnames so that they fill 100%
 * 
 * @param {Number} value1
 * @param {Number} value2
 * @param {Number} value3
 * @param {Number} value4
 * @param {Array} newModels
 * @param {Array} minvalues
 * 
 */
function case4(value1,value2,value3,value4,newModels,minvalues) {
  let leftoverAmount = 1;
  if (minvalues[value1] === "1/3") {
    newModels[value1].width = classNames.md4;
    leftoverAmount = 1-1/3;
  } else if (minvalues[value1] === "1/4") {
    newModels[value1].width = classNames.md3;
    leftoverAmount = 1-1/4;
  } else if (minvalues[value1] === "1/5") {
    newModels[value1].width = classNames.md2;
    leftoverAmount = 1-1/4;
  } else {
    // 1/6 and 1/7 and 1/8
    newModels[value1].width = classNames.md1;
    leftoverAmount = 1-1/12;
  }
  if (referenceSizes[minvalues[value2]] < 1/2) {
    if (minvalues[value2] === "1/3") {
      newModels[value2].width = classNames.md4;
      leftoverAmount -= 1/3;
    } else if (minvalues[value2] === "1/4") {
      newModels[value2].width = classNames.md3;
      leftoverAmount -= 1/4;
    } else if (minvalues[value2] === "1/5") {
      newModels[value2].width = classNames.md2;
      leftoverAmount -= 1/4;
    } else {
      // 1/6 and 1/7 and 1/8
      newModels[value1].width = classNames.md1;
      leftoverAmount -= 1/12;
    }
    if (leftoverAmount >= 1/2 && minvalues[value3] === minvalues[value4]) {
      newModels[value3].width = classNames.auto;
      newModels[value4].width = classNames.auto;
    } else if (leftoverAmount >= 1/2 && referenceSizes[minvalues[value3]] < referenceSizes[minvalues[value4]]) {
      if (minvalues[value4] === "1/2") {
        newModels[value4].width = classNames.md6;
      } else {
        newModels[value4].width = classNames.md4;
      }
      newModels[value3].width = classNames.auto;
    } else if (leftoverAmount >= 1/2 && referenceSizes[minvalues[value4]] < referenceSizes[minvalues[value3]]) {
      if (minvalues[value3] === "1/2") {
        newModels[value3].width = classNames.md6;
      } else {
        newModels[value3].width = classNames.md4;
      }
      newModels[value4].width = classNames.auto;
    } else if (leftoverAmount === 1/2 && minvalues[value3] === minvalues[value4]) {
      newModels[value3].width = classNames.md3;
      newModels[value4].width = classNames.md3;
    } else if (leftoverAmount === 1/2 && referenceSizes[minvalues[value3]] < referenceSizes[minvalues[value4]]) {
      newModels[value3].width = classNames.md2;
      newModels[value4].width = classNames.md4;
    } else if (leftoverAmount === 1/3) {
      newModels[value3].width = classNames.md2;
      newModels[value4].width = classNames.md2;
    } else if (leftoverAmount === 1/4 && referenceSizes[minvalues[value3]] < referenceSizes[minvalues[value4]]) {
      newModels[value3].width = classNames.auto;
      newModels[value4].width = classNames.md2;
    } else if (leftoverAmount === 1/4 && referenceSizes[minvalues[value4]] < referenceSizes[minvalues[value3]]) {
      newModels[value3].width = classNames.md2;
      newModels[value4].width = classNames.auto;
    } else {
      // fallback
      newModels[value3].width = classNames.auto;
      newModels[value4].width = classNames.auto;
    }
  } else {
    newModels[value2].width = classNames.md6;
    newModels[value3].width = classNames.auto;
    newModels[value4].width = classNames.auto;
  }

  // due to complexity making sure nothing unassigned passes this point
  if (!newModels[value1].width) {
    newModels[value1].width = classNames.auto;
  }
  if (!newModels[value2].width) {
    newModels[value2].width = classNames.auto;
  }
  if (!newModels[value3].width) {
    newModels[value3].width = classNames.auto;
  }
  if (!newModels[value4].width) {
    newModels[value4].width = classNames.auto;
  }

  return newModels;
}

/**
 * Always returns classnames so that they fill 100%
 * 
 * @param {Number} value1
 * @param {Number} value2
 * @param {Number} value3
 * @param {Number} value4
 * @param {Number} value5
 * @param {Array} newModels
 * @param {Array} minvalues
 * 
 */
function case5(value1,value2,value3,value4,value5,newModels,minvalues) {
  let leftoverAmount = 1;
  if (minvalues[value1] === "1/3") {
    newModels[value1].width = classNames.md4;
    leftoverAmount = 1-1/3;
  } else if (minvalues[value1] === "1/4") {
    newModels[value1].width = classNames.md3;
    leftoverAmount = 1-1/4;
  } else if (minvalues[value1] === "1/5") {
    newModels[value1].width = classNames.md2;
    leftoverAmount = 1-1/4;
  } else {
    // 1/6 and 1/7 and 1/8
    newModels[value1].width = classNames.md1;
    leftoverAmount = 1-1/12;
  }
  if (referenceSizes[minvalues[value2]] < 1/2) {
    if (minvalues[value2] === "1/3") {
      newModels[value2].width = classNames.md4;
      leftoverAmount -= 1/3;
    } else if (minvalues[value2] === "1/4") {
      newModels[value2].width = classNames.md3;
      leftoverAmount -= 1/4;
    } else if (minvalues[value2] === "1/5") {
      newModels[value2].width = classNames.md2;
      leftoverAmount -= 1/4;
    } else {
      // 1/6 and 1/7 and 1/8
      newModels[value1].width = classNames.md1;
      leftoverAmount -= 1/12;
    }
    if (leftoverAmount >= 1/2 && minvalues[value3] === minvalues[value4] && minvalues[value3] === minvalues[value5]) {
      newModels[value3].width = classNames.auto;
      newModels[value4].width = classNames.auto;
      newModels[value5].width = classNames.auto;
    } else if (leftoverAmount >= 1/2 && referenceSizes[minvalues[value3]] < referenceSizes[minvalues[value4]] && referenceSizes[minvalues[value3]] < referenceSizes[minvalues[value5]]) {
      if (minvalues[value4] === minvalues[value5]) {
        newModels[value4].width = classNames.md3;
        newModels[value5].width = classNames.md3;
        newModels[value3].width = classNames.auto;
      } else if (referenceSizes[minvalues[value4]] < referenceSizes[minvalues[value5]]) {
        newModels[value4].width = classNames.md2;
        newModels[value5].width = classNames.md4;
        newModels[value3].width = classNames.auto;
      } else if (referenceSizes[minvalues[value5]] < referenceSizes[minvalues[value4]]) {
        newModels[value4].width = classNames.md4;
        newModels[value5].width = classNames.md2;
        newModels[value3].width = classNames.auto;
      } else {
        // fallback
        newModels[value3].width = classNames.auto;
        newModels[value4].width = classNames.auto;
        newModels[value5].width = classNames.auto;
      }
    } else if (leftoverAmount >= 1/2 && referenceSizes[minvalues[value4]] < referenceSizes[minvalues[value3]] && referenceSizes[minvalues[value4]] < referenceSizes[minvalues[value5]]) {
      if (minvalues[value3] === minvalues[value5]) {
        newModels[value3].width = classNames.md3;
        newModels[value5].width = classNames.md3;
        newModels[value4].width = classNames.auto;
      } else if (referenceSizes[minvalues[value3]] < referenceSizes[minvalues[value5]]) {
        newModels[value3].width = classNames.md2;
        newModels[value5].width = classNames.md4;
        newModels[value4].width = classNames.auto;
      } else if (referenceSizes[minvalues[value5]] < referenceSizes[minvalues[value3]]) {
        newModels[value3].width = classNames.md4;
        newModels[value5].width = classNames.md2;
        newModels[value4].width = classNames.auto;
      } else {
        // fallback
        newModels[value3].width = classNames.auto;
        newModels[value4].width = classNames.auto;
        newModels[value5].width = classNames.auto;
      }
    } else if (leftoverAmount >= 1/2 && referenceSizes[minvalues[value5]] < referenceSizes[minvalues[value4]] && referenceSizes[minvalues[value5]] < referenceSizes[minvalues[value3]]) {
      if (minvalues[value4] === minvalues[value3]) {
        newModels[value4].width = classNames.md3;
        newModels[value3].width = classNames.md3;
        newModels[value5].width = classNames.auto;
      } else if (referenceSizes[minvalues[value4]] < referenceSizes[minvalues[value3]]) {
        newModels[value4].width = classNames.md2;
        newModels[value3].width = classNames.md4;
        newModels[value5].width = classNames.auto;
      } else if (referenceSizes[minvalues[value3]] < referenceSizes[minvalues[value4]]) {
        newModels[value4].width = classNames.md4;
        newModels[value3].width = classNames.md2;
        newModels[value5].width = classNames.auto;
      } else {
        // fallback
        newModels[value3].width = classNames.auto;
        newModels[value4].width = classNames.auto;
        newModels[value5].width = classNames.auto;
      }
    }
  } else {
    newModels[value2].width = classNames.md6;
    newModels[value3].width = classNames.auto;
    newModels[value4].width = classNames.auto;
    newModels[value5].width = classNames.auto;
  }

  // due to complexity making sure nothing unassigned passes this point
  if (!newModels[value1].width) {
    newModels[value1].width = classNames.auto;
  }
  if (!newModels[value2].width) {
    newModels[value2].width = classNames.auto;
  }
  if (!newModels[value3].width) {
    newModels[value3].width = classNames.auto;
  }
  if (!newModels[value4].width) {
    newModels[value4].width = classNames.auto;
  }
  if (!newModels[value5].width) {
    newModels[value5].width = classNames.auto;
  }

  return newModels;
}
