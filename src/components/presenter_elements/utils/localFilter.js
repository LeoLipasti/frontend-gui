export default function localFilter(results, filters, reduxID) {

  // not done yet. has many issues

  let allFilterResults = results.slice();

  Object.keys(filters).forEach(filter => {
    const filterlength = filters[filter].length;
    allFilterResults = allFilterResults.filter(function(entry) {
      return entry.attributes[filter].toString().substring(0,filterlength).toLowerCase() === filters[filter].toString().toLowerCase();
    })
  });


  return allFilterResults;
}
