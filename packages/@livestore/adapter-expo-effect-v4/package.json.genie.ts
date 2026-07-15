// Effect-4 sibling package to @livestore/adapter-expo.
//
// The upstream `@livestore/adapter-expo` is pinned to `effect@^3.21.2`
// via the `@livestore/utils/effect` re-export chain. Effect 4 is
// `breaking` w.r.t. Effect 3 — `@livestore/utils` itself needs to be
// published against Effect 4 for the adapter to compile. The Effect 4
// friendly re-publish ships under
// `0.0.0-snapshot-31d1eb100c8a16a303c32fa181565de9e8d6fe3f` of the
// LiveStore snapshot chain.
//
// This is a sibling package (same source directory layout, different
// peer dependency range) so we don't fork the maintained upstream.
//
// The `package.json` is hand-written and committed alongside the
// `*.genie.ts` source. To regenerate via the contrib repo's genie
// machinery, this file should declare deps keyed off the
// `@livestore/livestore@31d1eb…` snapshot instead of the standard
// catalog.

import {
  catalog,
  getUtilsPeerDeps,
  livestorePackageDefaults,
  packageJson,
  workspaceMember,
} from '../../../genie/repo.ts'

const runtimeDeps = catalog.compose({
  workspace: workspaceMember('packages/@livestore/adapter-expo-effect-v4'),
  dependencies: {
    // Frozen to the LiveStore snapshot tagged with the Effect-4 peer
    // surface. Newer Effect-4 snapshots will continue to work — the
    // snapshot pin is the lower bound.
    workspace: [],
    external: catalog.pick('@opentelemetry/api'),
  },
  peerDependencies: {
    external: {
      // Effect 4 line — drops the 3.21.2 floor.
      effect: '>=4.0.0-beta.83',
      'expo-application': '>=7.0.7',
      'expo-sqlite': '>=16.0.0',
    },
  },
})

export default packageJson(
  {
    name: '@livestore/adapter-expo-effect-v4',
    ...livestorePackageDefaults,
    description:
      'LiveStore Expo/React Native adapter (Effect 4 sibling of @livestore/adapter-expo).',
    exports: {
      '.': './src/index.ts',
    },
    publishConfig: {
      access: 'public',
      exports: {
        '.': './dist/index.js',
      },
    },
  },
  runtimeDeps,
)
