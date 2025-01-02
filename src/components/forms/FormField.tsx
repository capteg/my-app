import React from 'react';
import { FormFieldProps } from '../types/form.types';

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  required,
  formik,
  placeholder,
  className
}) => {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        placeholder={placeholder}
        className={`form-input ${className} ${
          formik.touched[name] && formik.errors[name] ? 'error' : ''
        }`}
        autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : undefined}
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="error-message">{formik.errors[name] as string}</p>
      )}
    </div>
  );
};