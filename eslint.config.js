import eslint from '@eslint/js'
import importXPlugin from 'eslint-plugin-import-x'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import promisePlugin from 'eslint-plugin-promise'
import unicornPlugin from 'eslint-plugin-unicorn'
import { configs as typescriptConfigs, parser as typescriptParser } from 'typescript-eslint'

/**
 * @type {import('eslint').Linter.Config}
 */
export const baseConfig = {
  name: 'base',
  files: [],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  // @ts-expect-error TS2322
  plugins: {
    ...importXPlugin.flatConfigs.recommended.plugins,
    ...promisePlugin.configs['flat/recommended'].plugins,
    ...unicornPlugin.configs['flat/recommended'].plugins,
  },
  rules: {
    ...eslint.configs.recommended.rules,
    ...importXPlugin.flatConfigs.recommended.rules,
    ...promisePlugin.configs['flat/recommended'].rules,
    ...unicornPlugin.configs['flat/recommended'].rules,
    'func-style': [
      'error',
      'declaration',
      {
        allowArrowFunctions: true,
      },
    ],
    'no-console': 'error',
    'no-param-reassign': [
      'error',
      {
        props: true,
      },
    ],
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],
    'import-x/extensions': ['error', 'ignorePackages'],
    'import-x/first': 'error',
    'import-x/newline-after-import': 'error',
    'import-x/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index', 'unknown'],
        ],
        pathGroups: [
          {
            pattern: '~/**',
            group: 'internal',
            position: 'before',
          },
        ],
        distinctGroup: false,
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          orderImportKind: 'asc',
        },
      },
    ],
    'unicorn/prevent-abbreviations': 'off',
  },
  settings: {
    'import-x/extensions': ['.js', '.ts'],
    'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
    'import-x/internal-regex': '^~',
    'import-x/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import-x/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: 'config/typescript/tsconfig.!(base).json',
      },
    },
  },
}

/**
 * @type {import('eslint').Linter.Config}
 */
export const typescriptConfig = {
  name: 'typescript',
  files: [],
  languageOptions: {
    // @ts-expect-error TS2322
    parser: typescriptParser,
    parserOptions: {
      project: 'config/typescript/tsconfig.!(base).json',
    },
  },
  // @ts-expect-error TS2322
  plugins: {
    ...typescriptConfigs.base.plugins,
    ...importXPlugin.flatConfigs.recommended.plugins,
  },
  rules: {
    ...typescriptConfigs.eslintRecommended.rules,
    ...typescriptConfigs.strictTypeChecked.at(-1)?.rules,
    ...typescriptConfigs.stylisticTypeChecked.at(-1)?.rules,
    ...importXPlugin.flatConfigs.typescript.rules,
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': {
          descriptionFormat: String.raw`^ TS\d{4,5}.*$`,
        },
        'ts-ignore': true,
        'ts-nocheck': true,
        'ts-check': false,
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowAny: false,
        allowArray: false,
        allowBoolean: true,
        allowNever: false,
        allowNullish: true,
        allowNumber: true,
        allowRegExp: true,
      },
    ],
    'import-x/no-duplicates': [
      'warn',
      {
        'prefer-inline': true,
      },
    ],
  },
}

/**
 * @type {import('eslint').Linter.Config}
 */
export const prettierConfig = {
  name: 'prettier',
  files: [],
  plugins: {
    ...prettierPlugin.plugins,
  },
  rules: {
    ...prettierPlugin.rules,
  },
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
}

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

      // Dependencies
      '.yarn',
      'node_modules',

      // Editors and IDEs
      '.idea',
      '.vscode',

      // Version Control
      '.git',

      // Workspaces
      'packages',
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
