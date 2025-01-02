// src/components/privacy/CookieManager.jsx
import React, { useState, useEffect } from 'react';

const COOKIE_CATEGORIES = {
  necessary: {
    name: 'Necessary',
    description: 'Essential for the website to function properly',
    required: true
  },
  functional: {
    name: 'Functional',
    description: 'Enhanced website functionality and personalization',
    required: false
  },
  analytics: {
    name: 'Analytics',
    description: 'Help us understand how visitors interact with the website',
    required: false
  },
  marketing: {
    name: 'Marketing',
    description: 'Used for marketing and retargeting purposes',
    required: false
  }
};

const CookieManager = () => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false
  });
  const [showDetails, setShowDetails] = useState(false);
  
  const handleSave = () => {
    // Save to localStorage with timestamp
    const consentData = {
      preferences,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    
    // Implement or remove cookies based on preferences
    updateCookies(preferences);
  };

  const updateCookies = (newPreferences) => {
    // Remove non-consented cookies
    Object.keys(newPreferences).forEach(category => {
      if (!newPreferences[category]) {
        removeCookiesByCategory(category);
      }
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-start">
            <div className="prose">
              <h3>Privacy Settings</h3>
              <p className="text-sm">
                We value your privacy. You can choose which cookies you want to allow.
                Detailed information can be found in our{' '}
                <a href="/privacy-policy" className="underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-sm underline"
              >
                {showDetails ? 'Hide Details' : 'Show Details'}
              </button>
            </div>
          </div>

          {showDetails && (
            <div className="space-y-4">
              {Object.entries(COOKIE_CATEGORIES).map(([key, category]) => (
                <div key={key} className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    id={key}
                    checked={preferences[key]}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      [key]: e.target.checked
                    }))}
                    disabled={category.required}
                    className="mt-1"
                  />
                  <div>
                    <label htmlFor={key} className="font-medium">
                      {category.name}
                      {category.required && ' (Required)'}
                    </label>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                setPreferences({
                  necessary: true,
                  functional: false,
                  analytics: false,
                  marketing: false
                });
                handleSave();
              }}
              className="px-4 py-2 text-sm border rounded"
            >
              Accept Necessary Only
            </button>
            <button
              onClick={() => {
                setPreferences({
                  necessary: true,
                  functional: true,
                  analytics: true,
                  marketing: true
                });
                handleSave();
              }}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
            >
              Accept All
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm bg-green-600 text-white rounded"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieManager;