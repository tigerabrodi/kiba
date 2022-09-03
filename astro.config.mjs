import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/serverless'
import solid from '@astrojs/solid-js'

// https://astro.build/config
export default defineConfig({
  // Enable Solid to support Solid JSX components.
  integrations: [solid()],
  output: 'server',
  adapter: vercel(),
})
