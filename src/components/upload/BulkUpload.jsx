// src/components/upload/BulkUpload.jsx
import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FILE_TYPES, MAX_FILE_SIZE } from '../../constants/data';

// Utility functions
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const validateFileType = (file, allowedTypes) => {
  if (!allowedTypes || !allowedTypes.DOCUMENTS || !allowedTypes.IMAGES) {
    console.error('Invalid allowedTypes structure:', allowedTypes);
    return false;
  }

  const allAllowedTypes = [
    ...(Array.isArray(allowedTypes.DOCUMENTS) ? allowedTypes.DOCUMENTS : []),
    ...(Array.isArray(allowedTypes.IMAGES) ? allowedTypes.IMAGES : [])
  ];
  
  return allAllowedTypes.includes(file.type);
};

const validateFileSize = (file, maxSize) => {
  return file.size <= maxSize;
};

const BulkUpload = ({ onFilesSelected, currentFiles, error, isFormComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const simulateUploadProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Add useEffect to handle form completion
  useEffect(() => {
    console.log('isFormComplete changed:', isFormComplete);
    if (isFormComplete) {
      setSuccessMessage('Form submitted successfully! Thank you for your submission.');
      console.log('Success message set');
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }
  }, [isFormComplete]);

  const validateAndProcessFiles = useCallback(async (newFiles) => {
  console.log('Starting file validation process');
  setIsProcessing(true);
  setSuccessMessage(''); // Clear any existing success message
  simulateUploadProgress();
  
  try {
    console.log('FILE_TYPES structure:', FILE_TYPES);
    console.log('Files to validate:', newFiles);
    const validationResults = await Promise.all(
      Array.from(newFiles).map(async (file) => {
        const errors = [];

        if (!validateFileSize(file, MAX_FILE_SIZE)) {
          errors.push(`File "${file.name}" exceeds ${formatBytes(MAX_FILE_SIZE)}`);
        }

        if (!validateFileType(file, FILE_TYPES)) {
          errors.push(`File "${file.name}" has unsupported format`);
        }

        return { file, errors };
      })
    );

    const errors = validationResults
      .filter(result => result.errors.length > 0)
      .map(result => result.errors)
      .flat();

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    const validFiles = validationResults
      .filter(result => result.errors.length === 0)
      .map(result => result.file);

      if (validFiles.length > 0) {
        console.log('Valid files processed:', validFiles);
        onFilesSelected([...currentFiles, ...validFiles]);
        const message = `Successfully uploaded ${validFiles.length} file${validFiles.length > 1 ? 's' : ''}`;
        console.log('Setting success message:', message);
        setSuccessMessage(message);
      }
    } catch (error) {
      console.error('File processing error:', error);
      alert('Error processing files. Please try again.');
    } finally {
      console.log('File processing complete');
      setTimeout(() => {
        setIsProcessing(false);
        setUploadProgress(0);
      }, 2000);
    }
  }, [currentFiles, onFilesSelected]);

  const renderProgressBar = () => (
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
      <div 
        className="h-full bg-blue-500 transition-all duration-300 ease-out"
        style={{ width: `${uploadProgress}%` }}
      />
    </div>
  );

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    validateAndProcessFiles(droppedFiles);
  }, [validateAndProcessFiles]);

  const handleFileInput = useCallback((e) => {
    const selectedFiles = Array.from(e.target.files);
    validateAndProcessFiles(selectedFiles);
  }, [validateAndProcessFiles]);

  const handleRemoveFile = useCallback((indexToRemove) => {
    const newFiles = currentFiles.filter((_, index) => index !== indexToRemove);
    onFilesSelected(newFiles);
  }, [currentFiles, onFilesSelected]);

  const renderFilePreview = useCallback((file) => {
    if (file.type.startsWith('image/')) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="h-16 w-16 object-cover rounded"
          onLoad={(e) => URL.revokeObjectURL(e.target.src)}
        />
      );
    }

    const getFileIcon = () => {
      switch (file.type) {
        case 'application/pdf':
          return 'pdf';
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        case 'application/vnd.ms-excel':
        case 'text/csv':
          return 'spreadsheet';
        default:
          return 'document';
      }
    };

    const iconTypes = {
      pdf: (
        <svg className="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
        </svg>
      ),
      spreadsheet: (
        <svg className="h-8 w-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
        </svg>
      ),
      document: (
        <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
        </svg>
      )
    };
  
    return (
      <div className="h-16 w-16 flex items-center justify-center bg-gray-100 rounded">
        {iconTypes[getFileIcon()]}
      </div>
    );
  }, []);

  

  const styles = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in {
      animation: fadeIn 0.3s ease-out;
    }
  `;

  return (
    <div className="space-y-4">
      <style>{styles}</style>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
        }`}
      >
        {isProcessing && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-2">
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm font-medium text-blue-500">
                Processing files... {uploadProgress}%
              </span>
            </div>
          </div>
        )}
        {renderProgressBar()}

        <input
          type="file"
          multiple
          onChange={handleFileInput}
          accept={[...FILE_TYPES.DOCUMENTS, ...FILE_TYPES.IMAGES].join(',')}
          className="hidden"
          id="file-upload"
          disabled={isProcessing}
        />
        <label
          htmlFor="file-upload"
          className={`cursor-pointer text-blue-600 hover:text-blue-500 ${isProcessing ? 'pointer-events-none' : ''}`}
        >
          <div className="space-y-2">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Click to upload</span> or drag and drop
            </div>
            <p className="text-xs text-gray-500">
              Upload at least one file (max {formatBytes(MAX_FILE_SIZE)} per file)
            </p>
            <p className="text-xs text-gray-500">
              Supported formats: PDF, Excel, CSV, Images
            </p>
          </div>
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {(successMessage || isFormComplete) && (
  <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 p-3 rounded-md animate-fade-in">
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
    <span>{successMessage || 'Form submitted successfully!'}</span>
  </div>
)}
      {currentFiles.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {currentFiles.map((file, index) => (
            <div key={index} className="relative group">
              {renderFilePreview(file)}
              <button
                onClick={() => handleRemoveFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove ${file.name}`}
                disabled={isProcessing}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <p className="text-xs mt-1 truncate" title={file.name}>{file.name}</p>
              <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

BulkUpload.propTypes = {
  onFilesSelected: PropTypes.func.isRequired,
  currentFiles: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
  error: PropTypes.string,
  isFormComplete: PropTypes.bool
};

BulkUpload.defaultProps = {
  error: null,
  isFormComplete: false,
  currentFiles: []
};

export default BulkUpload;