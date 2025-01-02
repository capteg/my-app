// src/components/forms/SupplierFormWrapper.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SupplierForm from './SupplierForm';

const SupplierFormWrapper = ({ onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const storeConsentLog = async (consentData) => {
    try {
      // In your real implementation, replace with your actual API endpoint
      const response = await fetch('/api/consent-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consentData),
      });

      if (!response.ok) {
        throw new Error('Failed to store consent');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to log consent:', error);
      throw error;
    }
  };

  const handleSubmit = async (values) => {
    try {
      setIsProcessing(true);
      setError(null);

      // Create consent log with proper DSGVO compliance
      const consentLog = {
        userId: values.email,
        timestamp: new Date().toISOString(),
        consentVersion: '1.0',
        consents: {
          dataProcessing: true, // Required consent
          marketing: values.marketingConsent || false, // Optional consent
        },
        formData: {
          // Only include necessary data fields
          email: values.email,
          companyName: values.companyName,
          category: values.category,
          // Add other necessary fields from your form
        },
        technicalInfo: {
          ipAddress: 'ANONYMIZED', // For DSGVO compliance
          userAgent: navigator.userAgent,
          consentRequestId: crypto.randomUUID()
        }
      };

      // Store consent first
      await storeConsentLog(consentLog);

      // Your existing EmailJS or form submission logic here
      console.log('Form submission started', values);
      
      // Your actual form submission logic
      // await emailjs.send(...) or your API call

      console.log('Form submission successful');
      onClose();
      return true;

    } catch (error) {
      console.error('Form submission error:', error);
      setError(error.message || 'An unexpected error occurred');
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" 
          aria-hidden="true"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          <SupplierForm 
            onClose={onClose} 
            onSubmit={handleSubmit}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};

SupplierFormWrapper.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default SupplierFormWrapper;