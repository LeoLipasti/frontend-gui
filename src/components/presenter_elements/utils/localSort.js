export default function localSort(results, sorter, desc) {

  const sortResults = [];
  
  results.forEach(entry => {

    const entrySorter = entry.attributes[sorter];

    if (sortResults.length === 0) {

      // first entry so push it

      sortResults.push({sorter: entrySorter, original: entry});

    } else {

      // all following entries

      for (var i = sortResults.length; i > 0; i--) {

        // strings
  
        if (typeof entrySorter === 'string' && typeof sortResults[i-1]['sorter'] === 'string') {

          if (sortResults[i-1]['sorter'].toLowerCase().localeCompare(entrySorter.toLowerCase()) === 1) {
            sortResults.splice(i, 0, {sorter: entrySorter, original: entry});
            break;
          }
          // i === 1 which is last in loop.
          // because if condition above did not fullfill and break loop,
          // this entrySorter has to be then smallest
          if (i === 1) {
            sortResults.unshift({sorter: entrySorter, original: entry});
          }
  
        // numbers, booleans, mixed
  
        } else {
          if (sortResults[i-1]['sorter'] < entrySorter) {
            sortResults.splice(i, 0, {sorter: entrySorter, original: entry});
            break;
          }
          // i === 1 which is last in loop.
          // because if condition above did not fullfill and break loop,
          // this entrySorter has to be then smallest
          if (i === 1) {
            sortResults.unshift({sorter: entrySorter, original: entry});
          }
        }
      }

    }
  });

  const sortedArray = [];

  sortResults.forEach(element => {
    sortedArray.push(element.original);
  });

  if (!!desc) {
    sortedArray.reverse();
  }

  return sortedArray;
}
