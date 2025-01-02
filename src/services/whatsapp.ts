// src/services/whatsapp.ts
interface WhatsAppConfig {
    WHATSAPP_PHONE_NUMBER_ID: string;
    WHATSAPP_ACCESS_TOKEN: string;
  }
  
  const config: WhatsAppConfig = {
    WHATSAPP_PHONE_NUMBER_ID: import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID as string,
    WHATSAPP_ACCESS_TOKEN: import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN as string
  };
  
  export { config };