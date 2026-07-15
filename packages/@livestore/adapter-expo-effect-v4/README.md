# `@livestore/adapter-expo-effect-v4`

LiveStore Expo/React Native adapter with **Effect 4** support. Source-compatible
sibling of [`@livestore/adapter-expo`][upstream] (which is Effect-3-only).

```
┌────────────────────────────────┐    ┌──────────────────────────────────┐
│ @livestore/adapter-expo (0.4.x) │    │ @livestore/adapter-expo-effect-v4│
│ • effect@^3.21.2              │    │ • effect@>=4.0.0-beta.83        │
│ • pinned to repos/livestore via │    │ • pinned to npm:@livestore/*@    │
│   genie link:                  │    │   0.0.0-snapshot-31d1eb…        │
│                                │    │                                  │
│ → mainline dev cycle           │    │ → Effect-4 ecosystem             │
└────────────────────────────────┘    └──────────────────────────────────┘
```

The Effect-3 adapter and this package share source structure verbatim; only the
peer-dependency floor (`effect`), the dependency pins (the `31d1eb…` snapshot of
`@livestore/{common,utils,webmesh}`), and the snapshotted Effect-4 install line
differ.

[upstream]: https://github.com/livestorejs/livestore-contrib/tree/main/packages/@livestore/adapter-expo

## Why a separate package

`@livestore/common`, `@livestore/utils`, and `@livestore/webmesh` carry a runtime
peer of either Effect 3 or Effect 4 depending on which branch of the LiveStore
snapshot series you resolve. Patching the upstream `@livestore/adapter-expo`
to depend on the Effect-4 snapshot would force a transitive peer change on
_every_ consumer of the contrib package, including the Effect-3 mainline.
Splitting into a sibling package keeps the mainline release flow clean.

## Install

```bash
npm install @livestore/adapter-expo-effect-v4 effect@^4 expo-sqlite expo-application
```

Or with Bun (matching this repo):

```bash
bun add @livestore/adapter-expo-effect-v4
```

## Usage

```ts
import { makePersistedAdapter } from '@livestore/adapter-expo-effect-v4'
import { makeWsSync } from '@livestore/sync-cf/client'

const adapter = makePersistedAdapter({
  sync: {
    backend: makeWsSync({ url: 'wss://api.example.com/sync' }),
  },
  storage: { subDirectory: 'my-app' },
})
```

`makePersistedAdapter` and the rest of the surface are the same as upstream
`@livestore/adapter-expo@0.4.0` — see the [upstream README][upstream] for the
full API.

## Caveats

- The `effect@>=4.0.0-beta.83` floor pins apps to the **Effect 4 beta
  channel**. Don't ship without a stable lock — pin `effect@4.0.x` once
  Effect ships the 4.0 stable.
- The Expo devtools URL defaults to `ws://0.0.0.0:4242`. Override via
  `process.env.EXPO_PUBLIC_LIVESTORE_DEVTOOLS_URL` when running on a
  physical device or Android emulator (the upstream caveat applies
  identically).

## Building the contrib monorepo

This package ships as a sibling in `packages/@livestore/`. To regenerate
the committed artifacts from their genie sources:

```bash
devenv tasks run genie:check --mode before
```

The `package.json` + `tsconfig.json` committed in this directory are
hand-written (the genie emulator requires `repos/livestore` to be
materialised first, which is the same constraint that prevents a
pristine local install). Hand-written sources line up with the genie
expectations modulo `references: []` (empty), which is the intentional
deviation since this package resolves via npm-installation rather
than the megarepo `link:`.

## License

Apache-2.0 (matches upstream).
