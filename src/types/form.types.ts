// src/types/form.types.ts
import { FormikProps } from 'formik';

// Common form field props
export interface BaseFieldProps {
  label: string;
  name: string;
  required?: boolean;
}

// Input types supported by FormField
export type InputType = 'text' | 'email' | 'tel' | 'number' | 'date';

// FormField component props
export interface FormFieldProps extends BaseFieldProps {
  type: InputType;
  formik: FormikProps<any>;
  placeholder?: string;
  className?: string;
}

// ConsentCheckbox component props
export interface ConsentCheckboxProps extends BaseFieldProps {
  formik: FormikProps<any>;
}

// Form values interface
export interface SupplierFormValues {
  // Contact Info
  companyName: string;
  email: string;
  whatsappNumber: string;
  
  // DSGVO Consents
  dataProcessingConsent: boolean;
  marketingConsent: boolean;
  privacyPolicyAccepted: boolean;
  
  // Product Details
  productCategory: string;
  brandTier: string;
  expiryDate: string;
  quantity: string;
  unit: string;
  minPriceExpectation: string;
  
  // Documentation
  batchNumbers: string;
  storageConditions: string;
  currentLocation?: string;
  additionalNotes?: string;
  files: File[];
}

// Form submission response
export interface SubmissionResponse {
  success: boolean;
  message: string;
  data?: {
    formId: string;
    submissionDate: string;
  };
}

// Consent log type
export interface ConsentLog {
  formId: string;
  timestamp: string;
  userIdentifier: string;
  consents: {
    dataProcessing: boolean;
    marketing: boolean;
    privacyPolicy: boolean;
  };
  formType: 'supplier';
  formData: {
    email: string;
    companyName: string;
    category: string;
  };
}