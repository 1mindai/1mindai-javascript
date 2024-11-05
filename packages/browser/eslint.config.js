import vitestPlugin from '@vitest/eslint-plugin'

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

      // Test and Code Coverage
      'test-reports',
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
    name: 'vitest',
    files: ['**/?(*.)unit.test.[jt]s'],
    plugins: {
      ...vitestPlugin.configs.recommended.plugins,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      'vitest/no-alias-methods': 'error',
      'vitest/no-conditional-expect': 'error',
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-done-callback': 'error',
      'vitest/no-focused-tests': 'error',
      'vitest/no-interpolation-in-snapshots': 'error',
      'vitest/no-mocks-import': 'error',
      'vitest/no-standalone-expect': 'error',
      'vitest/no-test-prefixes': 'error',
      'vitest/prefer-to-be-falsy': 'error',
      'vitest/prefer-to-be-object': 'error',
      'vitest/prefer-to-be-truthy': 'error',
      'vitest/prefer-to-contain': 'error',
      'vitest/prefer-to-have-length': 'error',
    },
  },
  {
    ...prettierConfig,
    files: ['**/*.[jt]s'],
  },
]

export default config
