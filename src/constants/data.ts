// src/constants/data.js

import { ProcessStep, Solution, SelectOption, TrustElement, CTAFeature } from '../types/constants';

// Process Steps (already defined)
export const PROCESS_STEPS: ProcessStep[] = [
    {
      title: "Submit Inventory",
      description: "Share your product details securely",
      time: "5 minutes",
      icon: "shield-alt"
    },
    {
      title: "Get Your Quote",
      description: "Receive our competitive purchase offer",
      time: "1-2 business days",
      icon: "comment-dollar"
    },
    {
      title: "Ship & Get Paid",
      description: "Accept offer, ship products, receive payment",
      time: "48 hours",
      icon: "truck"
    }
  ];
  
  // Solutions (already defined)
  export const SOLUTIONS: Solution[] = [
    {
      icon: "warehouse",
      title: "Free Up Space",
      description: "Quick inventory clearance to optimize your storage"
    },
    {
      icon: "money-check-alt",
      title: "Clear Terms",
      description: "Fixed price offer with secure payment process"
    },
    {
      icon: "truck-fast",
      title: "Flexible Shipping",
      description: "Use your carrier or our logistics network"
    }
  ];
  
  // Adding the missing exports
  export const PRODUCT_CATEGORIES: SelectOption[] = [
    { value: 'skincare', label: 'Skincare' },
    { value: 'hairCare', label: 'Hair Care' },
    { value: 'bodyCare', label: 'Body Care' },
    { value: 'sunCare', label: 'Sun Care' },
    { value: 'decorativeCosmetics', label: 'Decorative Cosmetics' }
  ];
  
  export const BRAND_TIERS: SelectOption[] = [
    { value: 'premium', label: 'Premium' },
    { value: 'midRange', label: 'Mid Range' },
    { value: 'budget', label: 'Budget' }
  ];
  
  export const UNITS: SelectOption[] = [
    { value: 'pieces', label: 'Pieces' }
  ];
  
  // File upload constants
  export const FILE_TYPES = {
    DOCUMENTS: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ],
    IMAGES: [
      'image/jpeg',
      'image/png',
      'image/gif'
    ]
  } as const;
  
  export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  export const MAX_FILES = 5;
  export const MIN_FILES = 1;
  
  // Trust elements (already defined)
  export const TRUST_ELEMENTS: TrustElement[] = [
    {
      title: "Fixed Price Offer",
      icon: "file-contract"    },
    {
      title: "Secure Payment",
      icon: "money-check-alt"
    },
    {
      title: "Professional Service",
      icon: "handshake"
    }
  ];
  
  // CTA Features (for the CTA section)
export const CTA_FEATURES: CTAFeature[] = [
  {
    icon: "clock",
    title: "2-Hour Response Time"
  },
  {
    icon: "money-bill-wave",
    title: "Payment within 48 Hours"
  },
  {
    icon: "shield-alt",
    title: "Secure Transaction"
  }
];