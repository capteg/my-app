// src/utils/formValidation.js

import { FILE_TYPES, MAX_FILE_SIZE } from '../constants/data';

/**
 * General form field validation
 */
export const validateRequired = (value, fieldName) => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return `${fieldName} is required`;
  }
  return '';
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email format';
  return '';
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  if (!phone) return 'Phone number is required';
  if (!phoneRegex.test(phone)) return 'Invalid phone number format';
  return '';
};

/**
 * File validation utilities
 */
export const validateFiles = (files, options = {}) => {
  const {
    maxSize = MAX_FILE_SIZE,
    allowedTypes = FILE_TYPES,
    maxFiles = 5,
    minFiles = 1
  } = options;

  const errors = [];
  
  // Validate file count
  if (!files || files.length === 0) {
    errors.push('Please upload at least one file');
    return { isValid: false, errors };
  }

  if (files.length < minFiles) {
    errors.push(`Please upload at least ${minFiles} file${minFiles > 1 ? 's' : ''}`);
  }

  if (files.length > maxFiles) {
    errors.push(`Maximum ${maxFiles} files allowed`);
  }

  // Validate each file
  const allAllowedTypes = [...allowedTypes.DOCUMENTS, ...allowedTypes.IMAGES];
  
  files.forEach(file => {
    // Size validation
    if (file.size > maxSize) {
      errors.push(`File "${file.name}" exceeds ${formatBytes(maxSize)}`);
    }

    // Type validation
    if (!allAllowedTypes.includes(file.type)) {
      errors.push(`File "${file.name}" has unsupported format`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Date validation utilities
 */
export const validateDate = (date, options = {}) => {
  const { 
    minDate = null, 
    maxDate = null, 
    required = true 
  } = options;

  if (!date && required) {
    return 'Date is required';
  }

  const dateValue = new Date(date);

  if (minDate && dateValue < new Date(minDate)) {
    return `Date must be after ${new Date(minDate).toLocaleDateString()}`;
  }

  if (maxDate && dateValue > new Date(maxDate)) {
    return `Date must be before ${new Date(maxDate).toLocaleDateString()}`;
  }

  return '';
};

/**
 * Number validation utilities
 */
export const validateNumber = (value, options = {}) => {
  const { 
    min = null, 
    max = null, 
    required = true,
    integer = false 
  } = options;

  if (!value && required) {
    return 'Number is required';
  }

  const num = Number(value);

  if (isNaN(num)) {
    return 'Must be a valid number';
  }

  if (integer && !Number.isInteger(num)) {
    return 'Must be a whole number';
  }

  if (min !== null && num < min) {
    return `Must be at least ${min}`;
  }

  if (max !== null && num > max) {
    return `Must be no more than ${max}`;
  }

  return '';
};

/**
 * Utility function to format bytes
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Form-wide validation
 */
export const validateForm = (values, schema) => {
  const errors = {};
  
  Object.keys(schema).forEach(field => {
    const value = values[field];
    const fieldSchema = schema[field];
    
    if (fieldSchema.required && !value) {
      errors[field] = `${fieldSchema.label || field} is required`;
    }
    
    if (fieldSchema.validate) {
      const error = fieldSchema.validate(value);
      if (error) {
        errors[field] = error;
      }
    }
  });
  
  return errors;
};