import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import solid from '@astrojs/solid-js'

// https://astro.build/config
export default defineConfig({
  // Enable Solid to support Solid JSX components.
  integrations: [solid()],
  output: 'server',
  adapter: cloudflare(),
})
