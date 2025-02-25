/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Puedes agregar más variables aquí si las necesitas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
