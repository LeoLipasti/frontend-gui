// Samples
import sampleAuth from './samples/forms/sampleAuth';
import sampleCard from './samples/forms/sampleCard';
import sampleList from './samples/lists/sampleList';
import sampleTable from './samples/tables/sampleTable';


// all object models used in the app, 
// even dev purpose ones (they are not large objects)
const models = {
  sampleAuth: sampleAuth,
  sampleCard: sampleCard,
  sampleList: sampleList,
  sampleTable: sampleTable
}

module.exports = models;