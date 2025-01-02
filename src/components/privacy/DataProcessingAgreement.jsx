// src/components/privacy/DataProcessingAgreement.jsx
import React from 'react';
import PropTypes from 'prop-types';

const DataProcessingAgreement = ({ onAccept, onDecline, formData }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Data Processing Agreement</h3>
      
      <div className="prose prose-sm max-w-none mb-6">
        <p>By submitting this form, you agree that:</p>
        <ul>
          <li>Your personal data will be processed according to Art. 6(1)(b) GDPR for contract fulfillment.</li>
          <li>Data will be stored for {formData.marketingConsent ? '24 months' : '12 months'} and then automatically deleted.</li>
          <li>You have the right to:
            <ul>
              <li>Access your personal data (Art. 15 GDPR)</li>
              <li>Rectify incorrect data (Art. 16 GDPR)</li>
              <li>Request deletion (Art. 17 GDPR)</li>
              <li>Restrict processing (Art. 18 GDPR)</li>
              <li>Data portability (Art. 20 GDPR)</li>
              <li>Object to processing (Art. 21 GDPR)</li>
            </ul>
          </li>
          <li>You can contact our Data Protection Officer at dpo@example.com</li>
          <li>You have the right to file a complaint with the supervisory authority</li>
        </ul>
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="dataProcessingConsent"
            required
            className="mt-1"
          />
          <label htmlFor="dataProcessingConsent" className="ml-2 text-sm">
            I have read and agree to the data processing terms *
          </label>
        </div>

        {formData.marketingConsent && (
          <div className="flex items-start">
            <input
              type="checkbox"
              id="marketingConsent"
              className="mt-1"
            />
            <label htmlFor="marketingConsent" className="ml-2 text-sm">
              I agree to receive marketing communications (can be withdrawn at any time)
            </label>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={onDecline}
          className="px-4 py-2 border rounded text-sm"
        >
          Decline
        </button>
        <button
          onClick={onAccept}
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
        >
          Accept and Continue
        </button>
      </div>
    </div>
  );
};

const WithdrawConsentButton = () => {
    const handleWithdraw = async () => {
      // Must implement immediate stop of processing
      // Must provide confirmation of withdrawal
      // Must document withdrawal timestamp
    };
  };
  
DataProcessingAgreement.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired
};

export default DataProcessingAgreement;