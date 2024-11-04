import { type RollupOptions, defineConfig } from 'rollup'
import { dts as dtsPlugin } from 'rollup-plugin-dts'
import esbuildPlugin from 'rollup-plugin-esbuild'
import { ModuleKind, ModuleResolutionKind, NewLineKind, ScriptTarget } from 'typescript'

function extendBaseRollupOptions({ output, ...restOptions }: RollupOptions) {
  const options: RollupOptions = {
    input: {
      index: 'src/index.ts',
    },
    output: {
      dir: 'dist',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      ...output,
    },
    ...restOptions,
  }

  return options
}

const config = defineConfig([
  extendBaseRollupOptions({
    plugins: [
      esbuildPlugin({
        target: 'es2022',
        platform: 'browser',
        tsconfig: false,
      }),
    ],
  }),
  extendBaseRollupOptions({
    plugins: [
      dtsPlugin({
        respectExternal: true,
        compilerOptions: {
          allowUnreachableCode: false,
          allowUnusedLabels: false,
          exactOptionalPropertyTypes: false,
          noFallthroughCasesInSwitch: true,
          noImplicitOverride: true,
          noImplicitReturns: true,
          noPropertyAccessFromIndexSignature: true,
          noUncheckedIndexedAccess: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          strict: true,
          allowImportingTsExtensions: true,
          baseUrl: '.',
          module: ModuleKind.ESNext,
          moduleResolution: ModuleResolutionKind.Bundler,
          rootDir: 'src',
          newLine: NewLineKind.LineFeed,
          isolatedModules: true,
          verbatimModuleSyntax: true,
          target: ScriptTarget.ES2022,
        },
      }),
    ],
  }),
])

export default config
