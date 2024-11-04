import { baseConfig, prettierConfig, typescriptConfig } from '../../eslint.config.js' // eslint-disable-line import-x/namespace

/**
 * @type {import('eslint').Linter.Config[]}
 */
const config = [
  {
    name: 'ignore',
    ignores: [
      // Miscellaneous
      '!**/.*',

      // Artifacts and Compiled Output
      '.turbo',
      'dist',

      // Dependencies
      'node_modules',
    ],
  },
  {
    ...baseConfig,
    files: ['**/*.[jt]s'],
  },
  {
    ...typescriptConfig,
    files: ['**/*.ts'],
  },
  {
    ...prettierConfig,
    files: ['**/*.[jt]s'],
  },
]

export default config
