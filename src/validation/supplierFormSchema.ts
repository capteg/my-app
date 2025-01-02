// src/validation/supplierFormSchema.ts
import * as yup from 'yup';

export const supplierFormSchema = yup.object().shape({
  // Step 1 fields
  companyName: yup
    .string()
    .required('Company name is required'),
  
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  
  whatsappNumber: yup
    .string()
    .required('WhatsApp number is required'),
  
  dataProcessingConsent: yup
    .boolean()
    .oneOf([true], 'Data processing consent is required'),
  
  marketingConsent: yup
    .boolean(),
  
  privacyPolicyAccepted: yup
    .boolean()
    .oneOf([true], 'Privacy policy must be accepted'),

  // Step 2 fields
  productCategory: yup
    .string()
    .required('Product category is required'),
  
  brandTier: yup
    .string()
    .required('Brand tier is required'),
  
  expiryDate: yup
    .string()
    .required('Expiry date is required')
    .matches(/^\d{2}\.\d{2}\.\d{4}$/, 'Invalid date format (DD.MM.YYYY)'),
  
  quantity: yup
    .number()
    .required('Quantity is required')
    .positive('Quantity must be positive'),
  
  unit: yup
    .string()
    .required('Unit is required'),
  
  minPriceExpectation: yup
    .string()
    .required('Minimum price expectation is required'),

  // Step 3 fields
  files: yup
    .array()
    .min(1, 'At least one file is required')
    .required('At least one file is required'),
  
  batchNumbers: yup
    .string()
    .required('Batch numbers are required'),
  
  storageConditions: yup
    .string()
    .required('Storage conditions are required'),
  
  currentLocation: yup
    .string(),
  
  additionalNotes: yup
    .string()
});