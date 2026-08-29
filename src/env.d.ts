/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly META_PAGE_ID: string;
  readonly META_PAGE_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
