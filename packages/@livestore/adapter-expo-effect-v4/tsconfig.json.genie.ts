// tsconfig.json.genie.ts — source for the genie-emitted tsconfig.
// `references` block intentionally omitted: this package resolves
// `@livestore/*` from npm (snapshot pin), so there are no upstream
// package references to declare.

import { tsconfig } from '../../../genie/repo.ts'

export default tsconfig({
  references: [],
})
