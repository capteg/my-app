import React from 'react';
import { ConsentCheckboxProps } from '../types/form.types';

export const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({
  name,
  formik,
  required,
  label
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`Checkbox ${name} changed:`, e.target.checked); // Debug log
    formik.setFieldValue(name, e.target.checked);
  };

  return (
    <div className="flex items-start">
      <input
        id={name}
        name={name}
        type="checkbox"
        onChange={handleChange}
        onBlur={formik.handleBlur}
        checked={formik.values[name] as boolean}
        className={`mt-1 h-4 w-4 rounded border-gray-300 ${
          formik.touched[name] && formik.errors[name] ? 'border-red-500' : ''
        }`}
        required={required}
      />
      <label htmlFor={name} className="ml-2 text-sm text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {formik.touched[name] && formik.errors[name] && (
        <p className="error-message ml-6 mt-1 text-sm text-red-600">
          {formik.errors[name] as string}
        </p>
      )}
    </div>
  );
};