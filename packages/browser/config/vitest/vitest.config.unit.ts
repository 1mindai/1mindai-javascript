import path from 'node:path'
import { env } from 'node:process'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import { z } from 'zod'

const rootDirPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const srcDirPath = path.join(rootDirPath, 'src')

const booleanPattern = /^(1|true)$/i
const logMessageBlockPattern = /^()/i

function zeroValueStringToUndefined(value: string) {
  return value === '' ? undefined : value
}

function stringToBoolean(value: string) {
  return booleanPattern.test(value)
}

const isCiEnvironment = z
  .string()
  .transform(zeroValueStringToUndefined)
  .optional()
  .pipe(z.string().transform(stringToBoolean).default('false'))
  .parse(env.CI)

const config = defineConfig({
  root: rootDirPath,
  resolve: {
    alias: {
      '~': srcDirPath,
    },
  },
  test: {
    include: ['src/**/?(*.)unit.test.[jt]s'],
    reporters: [
      [isCiEnvironment ? 'github-actions' : 'default'],
      [
        'html',
        {
          outputFile: path.join(rootDirPath, 'test-reports', 'unit', 'index.html'),
        },
      ],
    ],
    environment: 'node',
    watch: false,
    root: rootDirPath,
    coverage: {
      include: ['src/**/*.[jt]s'],
      exclude: ['src/**/*.test.[jt]s'],
      all: true,
      reportsDirectory: 'test-reports',
      reporter: [
        [isCiEnvironment ? 'cobertura' : 'text'],
        [
          'html',
          {
            subdir: 'coverage',
          },
        ],
      ],
    },
    mockReset: true,
    resolveSnapshotPath(filePath, ext) {
      return `${filePath}${ext}`
    },
    onConsoleLog(message) {
      return logMessageBlockPattern.test(message) ? false : undefined
    },
  },
})

export default config
