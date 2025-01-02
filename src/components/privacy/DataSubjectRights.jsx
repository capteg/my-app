// src/components/privacy/DataSubjectRights.jsx
import React, { useState } from 'react';

const DataSubjectRights = () => {
  const [request, setRequest] = useState({
    type: '',
    email: '',
    details: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement secure handling of data subject requests
    // This should create a ticket in your system and notify DPO
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      <h2>Exercise Your Data Protection Rights</h2>
      
      <div>
        <label>Request Type</label>
        <select
          value={request.type}
          onChange={(e) => setRequest(prev => ({...prev, type: e.target.value}))}
          required
        >
          <option value="">Select request type</option>
          <option value="access">Access my data</option>
          <option value="rectification">Correct my data</option>
          <option value="erasure">Delete my data</option>
          <option value="restriction">Restrict processing</option>
          <option value="portability">Data portability</option>
          <option value="objection">Object to processing</option>
        </select>
      </div>

      {/* Add other form fields */}
    </form>
  );
};

export default DataSubjectRights;