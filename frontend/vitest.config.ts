import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        exclude: [
          'src/main.ts',
          'src/App.vue',
          '.eslintrc.cjs',
          'postcss.config.js',
          'tailwind.config.js',
          'src/components/__tests__/shared/stores/mockStores.ts'
        ]
      }
    }
  })
)
