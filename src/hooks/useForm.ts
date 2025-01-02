// src/hooks/useForm.ts
import { useState, ChangeEvent } from 'react';

interface FormErrors {
  [key: string]: string;
}

interface UseFormReturn<T> {
  values: T;
  errors: FormErrors;
  isSubmitting: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void>) => Promise<void>;
  resetForm: () => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}

export const useForm = <T extends Record<string, any>>(initialValues: T): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate required fields
    Object.keys(values).forEach(key => {
      if (!values[key] && values[key] !== 0) {
        newErrors[key] = 'This field is required';
      }
    });

    // Validate email format
    if ('email' in values && values.email && !/\S+@\S+\.\S+/.test(values.email as string)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (onSubmit: (values: T) => Promise<void>) => {
    setIsSubmitting(true);
    
    try {
      if (validateForm()) {
        await onSubmit(values);
        resetForm();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors(prev => ({ ...prev, submit: error instanceof Error ? error.message : 'An error occurred' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors
  };
};