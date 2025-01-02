// src/components/forms/SupplierForm.tsx
import React, { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import { supplierFormSchema } from '../../validation/supplierFormSchema';
import { PRODUCT_CATEGORIES, BRAND_TIERS, UNITS } from '../../constants/data';
import BulkUpload from '../upload/BulkUpload';
import { FormField } from './FormField';
import { ConsentCheckbox } from './ConsentCheckbox';
import { SupplierFormValues, ConsentLog } from '../types/form.types';

interface SupplierFormProps {
  onClose: () => void;
  onSubmit: (values: SupplierFormValues) => Promise<void>;
  isProcessing?: boolean;
}

const SupplierForm: React.FC<SupplierFormProps> = ({
  onClose, 
  onSubmit, 
  isProcessing = false 
}) => {
  const [step, setStep] = useState<number>(1);
  const [files, setFiles] = useState<File[]>([]);
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [consentError, setConsentError] = useState<string | null>(null);

  const formik = useFormik<SupplierFormValues>({
    initialValues: {
      companyName: '',
      email: '',
      whatsappNumber: '',
      dataProcessingConsent: false,
      marketingConsent: false,
      privacyPolicyAccepted: false,
      productCategory: '',
      brandTier: '',
      expiryDate: '',
      quantity: '',
      unit: '',
      minPriceExpectation: '',
      batchNumbers: '',
      storageConditions: '',
      currentLocation: '',
      additionalNotes: '',
      files: [] as File[]
    },
    validationSchema: supplierFormSchema,
    onSubmit: async (values: SupplierFormValues) => { 
      if (isSubmitting) return;
      
      try {
        setIsSubmitting(true);
        setConsentError(null);

        // 1. Log consent first
        const consentLog = {
          formId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          userIdentifier: values.email,
          consents: {
            dataProcessing: values.dataProcessingConsent,
            marketing: values.marketingConsent,
            privacyPolicy: values.privacyPolicyAccepted
          },
          formType: 'supplier',
          formData: {
            email: values.email,
            companyName: values.companyName,
            category: values.productCategory
          }
        };

        const consentResponse = await fetch('/api/consent-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(consentLog)
        });

        if (!consentResponse.ok) {
          throw new Error('Failed to store consent: ' + await consentResponse.text());
        }

        // 2. Submit form with consent reference
        const formData = {
          ...values,
          files,
          consentId: consentLog.formId
        };

        await onSubmit(formData);
        setIsFormComplete(true);

        setTimeout(() => {
          setIsFormComplete(false);
          formik.resetForm();
          setFiles([]);
          setStep(1);
          onClose();
        }, 3000);
      } catch (error: unknown) {
        console.error('Form submission error:', error);
        setConsentError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const handleFileChange = useCallback((newFiles) => {
    setFiles(newFiles);
    formik.setFieldValue('files', newFiles);
  }, [formik]);

  // Add this debug helper function
const debugValidation = (stepNumber: number) => {
  console.log('=== Detailed Step Validation Debug ===');
  const values = formik.values;
  const fields = {
    2: ['productCategory', 'brandTier', 'expiryDate', 'quantity', 'unit', 'minPriceExpectation']
  }[stepNumber];

  fields?.forEach(field => {
    console.log(`\nField: ${field}`);
    console.log('Value:', values[field]);
    console.log('Touched:', formik.touched[field]);
    console.log('Error:', formik.errors[field]);
    try {
      supplierFormSchema.fields[field].validateSync(values[field]);
      console.log('✅ Validation passed');
    } catch (error) {
      console.log('❌ Validation failed:', error.message);
    }
  });
};

const validateStep = (currentStep: number) => {
  if (currentStep === 2) {
    // Check required fields for Step 2
    const requiredFields = [
      'productCategory',
      'brandTier',
      'expiryDate',
      'quantity',
      'unit',
      'minPriceExpectation'
    ];

    let isValid = true;
    requiredFields.forEach(field => {
      if (!formik.values[field]) {
        formik.setFieldError(field, `${field} is required`);
        formik.setFieldTouched(field, true);
        isValid = false;
      }
    });

    return isValid;
  }
  return true;
};

const handleNext = () => {
  console.log('Next clicked');
  console.log('Current step:', step);
  console.log('Form values:', formik.values);

  const isValid = validateStep(step);  // Pass the step parameter
  console.log('Step validation result:', isValid);

  if (isValid) {
    setStep(step + 1);
  } else {
    // Show validation errors
    const fields = step === 2 ? [
      'productCategory',
      'brandTier',
      'expiryDate',
      'quantity',
      'unit',
      'minPriceExpectation'
    ] : [];
    
    fields.forEach(field => {
      formik.setFieldTouched(field, true);
    });
    console.log('Validation failed. Current errors:', formik.errors);
  }
};

  // Render the form steps
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            {/* Contact Info Fields */}
            <div className="space-y-4">
              {/* Company Name */}
              <FormField
                label="Company Name"
                name="companyName"
                type="text"
                required
                formik={formik}
              />

              {/* Email */}
              <FormField
                label="Email"
                name="email"
                type="email"
                required
                formik={formik}
              />

              {/* WhatsApp */}
              <FormField
                label="WhatsApp Business Number"
                name="whatsappNumber"
                type="tel"
                required
                formik={formik}
              />
            </div>

            {/* DSGVO Consent Section */}
            <div className="mt-6 border-t pt-4 space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Data Protection</h3>

              {/* Data Processing Consent */}
              <ConsentCheckbox
                name="dataProcessingConsent"
                formik={formik}
                required
                label="I consent to the processing of my personal data"
              />

              {/* Marketing Consent */}
              <ConsentCheckbox
                name="marketingConsent"
                formik={formik}
                label="I would like to receive marketing communications (optional)"
              />

              {/* Privacy Policy */}
              <ConsentCheckbox
                name="privacyPolicyAccepted"
                formik={formik}
                required
                label="I confirm that I have read and understood the privacy policy"
                />

                {/* Add the debug button */}
              <button 
                type="button" 
                onClick={() => {
                  console.log('=== Debug Form State ===');
                  console.log('Current form values:', formik.values);
                  console.log('Required consents:', {
                    dataProcessing: formik.values.dataProcessingConsent,
                    privacy: formik.values.privacyPolicyAccepted
                  });
                  console.log('Form errors:', formik.errors);
                  console.log('Form touched:', formik.touched);
                }}
                className="text-sm text-blue-500 mt-2"
              >
                Debug Form State
              </button>
            </div>
            </div>
          );

          case 2:
            return (
              <div className="space-y-4">
                {/* Product Category */}
                <div className="form-group">
                  <label htmlFor="productCategory" className="form-label">
                    Product Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="productCategory"
                    name="productCategory"
                    value={formik.values.productCategory}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-select w-full rounded-md border-gray-300 shadow-sm ${
                      formik.touched.productCategory && formik.errors.productCategory 
                        ? 'border-red-500' 
                        : ''
                    }`}
                  >
                    <option value="">Select a category</option>
                    {PRODUCT_CATEGORIES.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {formik.touched.productCategory && formik.errors.productCategory && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.productCategory}</div>
                  )}
                </div>
          
                {/* Brand Tier */}
                <div className="form-group">
                  <label htmlFor="brandTier" className="form-label">
                    Brand Tier <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="brandTier"
                    name="brandTier"
                    value={formik.values.brandTier}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-select w-full rounded-md border-gray-300 shadow-sm ${
                      formik.touched.brandTier && formik.errors.brandTier 
                        ? 'border-red-500' 
                        : ''
                    }`}
                  >
                    <option value="">Select a tier</option>
                    {BRAND_TIERS.map(tier => (
                      <option key={tier.value} value={tier.value}>
                        {tier.label}
                      </option>
                    ))}
                  </select>
                  {formik.touched.brandTier && formik.errors.brandTier && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.brandTier}</div>
                  )}
                </div>
          
                {/* Expiry Date */}
                <FormField
                  label="Expiry Date"
                  name="expiryDate"
                  type="text"
                  required
                  formik={formik}
                  placeholder="DD.MM.YYYY"
                  onChange={(e) => {
                    const value = e.target.value;
                    const formatted = value
                      .replace(/\D/g, '')
                      .replace(/(\d{2})(\d{2})(\d{4})/, '\$1.\$2.\$3')
                      .substr(0, 10);
                    formik.setFieldValue('expiryDate', formatted);
                  }}
                />
          
                {/* Quantity and Unit */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    required
                    formik={formik}
                    min="1"
                  />
          
                  <div className="form-group">
                    <label htmlFor="unit" className="form-label">
                      Unit <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="unit"
                      name="unit"
                      value={formik.values.unit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-select w-full rounded-md border-gray-300 shadow-sm ${
                        formik.touched.unit && formik.errors.unit 
                          ? 'border-red-500' 
                          : ''
                      }`}
                    >
                      <option value="">Select unit</option>
                      {UNITS.map(unit => (
                        <option key={unit.value} value={unit.value}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                    {formik.touched.unit && formik.errors.unit && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.unit}</div>
                    )}
                  </div>
                </div>
          
                {/* Minimum Price Expectation */}
                <FormField
                  label="Minimum Price Expectation"
                  name="minPriceExpectation"
                  type="text"
                  required
                  formik={formik}
                  placeholder="€ XX,XX"
                  onChange={(e) => {
                    const value = e.target.value;
                    const formatted = value
                      .replace(/[^0-9,]/g, '')
                      .replace(/^/, '€ ')
                      .replace(/(\d+),?(\d{0,2}).*/, '\$1,\$2');
                    formik.setFieldValue('minPriceExpectation', formatted);
                  }}
                />
              </div>
            );

        case 3:
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Upload Documents
                  <span className="text-red-500">*</span>
                </h3>
                <BulkUpload
                  onFilesSelected={(newFiles) => {
                    handleFileChange(newFiles);
                    formik.setFieldValue('files', newFiles);
                  }}
                  currentFiles={files} // Use the files state instead of formik.values.files
                  error={formik.touched.files && formik.errors.files}
                  isFormComplete={isFormComplete}
                />
              </div>
  
              <div className="space-y-4">
                <div>
                  <label htmlFor="batchNumbers" className="form-label">
                    Batch Numbers
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="batchNumbers"
                    name="batchNumbers"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.batchNumbers}
                    className={`form-input ${
                      formik.touched.batchNumbers && formik.errors.batchNumbers ? 'error' : ''
                    }`}
                  />
                  {formik.touched.batchNumbers && formik.errors.batchNumbers && (
                    <p className="error-message">{formik.errors.batchNumbers}</p>
                  )}
                </div>
  
                <div>
                  <label htmlFor="storageConditions" className="form-label">
                    Storage Conditions
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="storageConditions"
                    name="storageConditions"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.storageConditions}
                    className={`form-textarea ${
                      formik.touched.storageConditions && formik.errors.storageConditions ? 'error' : ''
                    }`}
                    rows={3}
                  />
                  {formik.touched.storageConditions && formik.errors.storageConditions && (
                    <p className="error-message">{formik.errors.storageConditions}</p>
                  )}
                </div>
  
                <div>
                  <label htmlFor="currentLocation" className="form-label">
                    Current Storage Location
                  </label>
                  <input
                    id="currentLocation"
                    name="currentLocation"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.currentLocation}
                    className="form-input"
                  />
                </div>
  
                <div>
                  <label htmlFor="additionalNotes" className="form-label">
                    Additional Notes
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.additionalNotes}
                    className="form-textarea"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    };
  
    return (
      <div className="bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
        {/* Header with steps */}
        <div className="border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-8">
              {['Contact', 'Product Details', 'Documentation'].map((label, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index + 1 === step ? 'text-blue-600' : 'text-gray-400'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                      ${index + 1 === step ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}
                  >
                    {index + 1}
                  </div>
                  <span className="ml-2">{label}</span>
                </div>
              ))}
            </div>
            <button
              onClick={onClose}
              className={`text-gray-400 hover:text-gray-600 ${
                isSubmitting || isFormComplete ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              type="button"
              disabled={isSubmitting || isFormComplete}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
    
        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="p-6">
          {renderStep()}
          
          {/* Success Message */}
          {isFormComplete && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md animate-fade-in">
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Form submitted successfully! Thank you for your submission.</span>
              </div>
            </div>
          )}
    
          {/* Form Buttons */}
          <div className="flex justify-between mt-6">
            {step === 1 ? (
              <button
                type="button"
                onClick={onClose}
                className={`btn-secondary ${isSubmitting || isFormComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting || isFormComplete}
              >
                Cancel
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className={`btn-secondary ${isSubmitting || isFormComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting || isFormComplete}
              >
                Back
              </button>
            )}
    
            {step === 3 ? (
              <button
                type="submit"
                className={`btn-primary ${isSubmitting || isFormComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting || isFormComplete}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className={`btn-primary ${isSubmitting || isFormComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting || isFormComplete}
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    );
  };

  export default SupplierForm;