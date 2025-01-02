import React from 'react';
import { TRUST_ELEMENTS } from '../../constants/data';

const CTASection = ({ onOpenModal }) => {
  console.log('Component rendering');
  console.log('Import path:', '../../constants/data');
  console.log('TRUST_ELEMENTS:', TRUST_ELEMENTS);
  
  if (!TRUST_ELEMENTS) {
    console.error('TRUST_ELEMENTS is undefined');
    return null;
  }

  return (
    <section key="cta-section" className="bg-[#2A3B8F] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-2xl mb-12">List your stock now and get paid within 48 hours</p>
        <button
          onClick={onOpenModal}
          className="bg-white text-[#2A3B8F] px-12 py-4 rounded-full text-xl font-semibold hover:bg-gray-100 transition-colors mb-16"
        >
          List Your Stock
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRUST_ELEMENTS.map((element, index) => (
            <div key={index} className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <i className={`fas fa-${element.icon} text-2xl`}></i>
              </div>
              <span className="text-xl">{element.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;