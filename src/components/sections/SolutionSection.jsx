// src/components/sections/SolutionSection.jsx
import React from 'react';
import { SOLUTIONS } from '../../constants/data';

const SolutionSection = () => {
  return (
    <section id="solution" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Solution</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {SOLUTIONS.map((solution, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <i className={`fas fa-${solution.icon} text-blue-900 text-xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
              <p className="text-gray-600">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;