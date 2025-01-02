// src/components/sections/ProcessSection.jsx
import React from 'react';
import { PROCESS_STEPS } from '../../constants/data';

const ProcessSection = () => {
  return (
    <section id="process" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold text-center mb-16">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {PROCESS_STEPS.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-[#2A3B8F] rounded-full flex items-center justify-center mb-6">
                <i className={`fas fa-${step.icon} text-white text-3xl`}></i>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600 mb-4">{step.description}</p>
              
              <div className="bg-[#E6EAFF] text-[#2A3B8F] px-4 py-2 rounded-full">
                {step.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;