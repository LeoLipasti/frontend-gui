import sampleList from './sampleList';
import { typecheckList } from "../../tsutils/lists/list"

// use the NOOP function to test your ts file
// typescript should give you instant feedback
typecheckList(sampleList)

// export is used for tests
export default [sampleList];