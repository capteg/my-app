// src/services/email.ts
import emailjs from '@emailjs/browser';

interface ConsentData {
  dataProcessingConsent: boolean;
  marketingConsent: boolean;
  privacyPolicyAccepted: boolean;
}

interface ConsentRecord {
  timestamp: string;
  consent: ConsentData;
  formId: string;
}

interface FormSubmissionResult {
  success: boolean;
  consentId: string;
}

export const sendFormWithConsent = async (
  formData: Record<string, any>,
  consentData: ConsentData
): Promise<FormSubmissionResult> => {
  try {
    const consentRecord: ConsentRecord = {
      timestamp: new Date().toISOString(),
      consent: consentData,
      formId: crypto.randomUUID()
    };
    
    localStorage.setItem(`consent_${consentRecord.formId}`, JSON.stringify(consentRecord));

    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        ...formData,
        consentReference: consentRecord.formId,
        consentTimestamp: consentRecord.timestamp
      },
      'YOUR_PUBLIC_KEY'
    );

    return { success: true, consentId: consentRecord.formId };
  } catch (error) {
    console.error('Form submission error:', error);
    throw new Error('Failed to submit form');
  }
};