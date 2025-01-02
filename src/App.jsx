// src/App.jsx
import React, { useRef, useState, useEffect } from 'react';
import Navigation from './components/layout/Navigation';
import ProblemSection from './components/sections/ProblemSection';
import ProcessSection from './components/sections/ProcessSection';
import SolutionSection from './components/sections/SolutionSection';
import CTASection from './components/sections/CTASection';
import SupplierFormWrapper from './components/forms/SupplierFormWrapper';
import WhatsAppButton from './components/common/WhatsAppButton';
import { CSSTransition } from 'react-transition-group';
import './styles/index.css'; // Only import the main CSS file

const App = () => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Handle click outside modal
  const handleOverlayClick = (event) => {
    if (event.target === overlayRef.current) {
      handleCloseModal();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation onOpenModal={handleOpenModal} />
      <main className="pt-20">
        <ProblemSection onOpenModal={handleOpenModal} />
        <SolutionSection />
        <ProcessSection />
        <CTASection onOpenModal={handleOpenModal} />
      </main>
      
      <CSSTransition
  in={isModalOpen}
  timeout={300}
  classNames="modal"
  unmountOnExit
  nodeRef={modalRef}
>
  <div 
    ref={modalRef}
    className="fixed inset-0 z-50"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    {/* Overlay */}
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
      aria-hidden="true"
    />
    
    {/* Modal Content */}
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl">
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     dark:text-gray-300 dark:hover:text-gray-200"
            onClick={handleCloseModal}
            aria-label="Close modal"
          >
            <svg 
              className="h-6 w-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
          <SupplierFormWrapper onClose={handleCloseModal} />
        </div>
      </div>
    </div>
  </div>
</CSSTransition>
      
      <WhatsAppButton />
    </div>
  );
};

export default App;