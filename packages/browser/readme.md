# @1mindai/browser

> Official 1mind AI SDK for browsers

[![Code Style](https://flat.badgen.net/badge/code%20style/prettier/ff69b4)](https://github.com/prettier/prettier)

## Setup

The following external dependencies are needed to perform the various tasks
defined within the package configuration files (package.json). Please follow the
installation instructions for each dependency to get started.

- [Node.js](https://nodejs.org/en/download)
- [Corepack](https://github.com/nodejs/corepack?tab=readme-ov-file#default-installs)
- [Yarn](https://yarnpkg.com/getting-started/install)

## Getting Started

Install the project dependencies:

```shell
yarn install
```

## Scripts

- `yarn build` — build artifacts and compiled output ([Rollup](https://rollupjs.org))
- `yarn clean` — remove artifacts, compiled output, and logs
- `yarn format` — perform stylization ([Prettier](https://prettier.io))
- `yarn lint` — perform static analysis ([ESLint](https://eslint.org) and [TypeScript](https://typescriptlang.org))
- `yarn refine` — perform stylization and static analysis
- `yarn test` — perform unit ([Vitest](https://vitest.dev)) tests

### Style

Edit unformatted files in-place:

```shell
yarn format --write
```

### Static Analysis

Automatically fix JavaScript problems:

```shell
yarn lint:javascript --fix
```

### Test

Start the unit test development server:

```shell
yarn test:unit --coverage --ui --watch
```
