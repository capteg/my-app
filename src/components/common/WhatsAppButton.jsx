// src/components/common/WhatsAppButton.jsx
const WhatsAppButton = () => {
    const phoneNumberId = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID;
    
    // Using direct WhatsApp link since we're just opening the chat
    const handleWhatsAppClick = () => {
      // Using wa.me format which works for both WhatsApp Business and regular accounts
      window.open(`https://wa.me/${phoneNumberId}`, '_blank');
    };
  
    return (
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors z-50 flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <i className="fab fa-whatsapp text-3xl"></i>
      </button>
    );
  };
  
  export default WhatsAppButton;