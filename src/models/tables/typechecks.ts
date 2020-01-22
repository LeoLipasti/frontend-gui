import testTable from './sampleTable';
import { typecheckTable } from "./table"

// use the NOOP function to test your ts file
// typescript should give you instant feedback
typecheckTable(testTable)

// export is used for tests
export default [testTable];