import BrainKBAssistant from './components/BrainKBAssistant';
import BrainKBAssistantWrapper, { BrainKBConfig } from './components/BrainKBAssistantWrapper';
import React from 'react';
import ReactDOM from 'react-dom';

// Main component export
export default BrainKBAssistant;

// Named exports
export { default as BrainKBAssistantWrapper } from './components/BrainKBAssistantWrapper';
export type { BrainKBConfig } from './components/BrainKBAssistantWrapper';

// Global initialization for CDN usage
if (typeof window !== 'undefined') {
  (window as any).BrainKBAssistant = {
    init: (options: { config: BrainKBConfig; container?: string }) => {
      console.log('BrainKB Assistant initialized with config:', options.config);
      
      // Get the container element
      const containerSelector = options.container || 'body';
      const container = document.querySelector(containerSelector);
      
      if (!container) {
        console.error(`Container "${containerSelector}" not found`);
        return;
      }
      
      // Create a wrapper div for the assistant
      const assistantContainer = document.createElement('div');
      assistantContainer.id = 'brainkb-assistant-root';
      container.appendChild(assistantContainer);
      
      // Render the React component
      ReactDOM.render(
        React.createElement(BrainKBAssistantWrapper, {
          config: options.config,
          currentPage: window.location.pathname,
          pageContext: {
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
          }
        }),
        assistantContainer
      );
      
      console.log('BrainKB Assistant rendered successfully');
    }
  };
} 