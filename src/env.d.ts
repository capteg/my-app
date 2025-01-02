/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WHATSAPP_PHONE_NUMBER_ID: string;
    readonly VITE_WHATSAPP_ACCESS_TOKEN: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }