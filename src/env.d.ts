/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly TOKEN: string
  readonly ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
