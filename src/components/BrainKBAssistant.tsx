'use client';

import React from 'react';
import BrainKBAssistantWrapper, { BrainKBConfig } from './BrainKBAssistantWrapper';

// Standalone BrainKB Assistant Component
export interface BrainKBAssistantProps {
  config?: BrainKBConfig;
  currentPage?: string;
  pageContext?: {
    title?: string;
    description?: string;
    keywords?: string[];
    entities?: string[];
  };
}

export const BrainKBAssistant: React.FC<BrainKBAssistantProps> = ({ 
  config = {},
  currentPage,
  pageContext
}) => {
  return (
    <BrainKBAssistantWrapper
      config={config}
      currentPage={currentPage}
      pageContext={pageContext}
    />
  );
};

// Default export for easy importing
export default BrainKBAssistant;

// Export types for external use
export type { BrainKBConfig }; 