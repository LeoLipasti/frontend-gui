import testCard from './sampleCard';
import authCard from './sampleAuth';
import { typecheckCard } from "./card"

// use the NOOP function to test your ts file
// typescript should give you instant feedback
typecheckCard(testCard)
typecheckCard(authCard)

// export is used for tests
export default [testCard,authCard];