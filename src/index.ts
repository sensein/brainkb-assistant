import BrainKBAssistant from './components/BrainKBAssistant';
import BrainKBAssistantWrapper, { BrainKBConfig } from './components/BrainKBAssistantWrapper';

// Main component export
export default BrainKBAssistant;

// Named exports
export { default as BrainKBAssistantWrapper } from './components/BrainKBAssistantWrapper';
export type { BrainKBConfig } from './components/BrainKBAssistantWrapper';

// Global initialization for CDN usage
if (typeof window !== 'undefined') {
  (window as any).BrainKBAssistant = {
    init: (config: BrainKBConfig) => {
      // This would initialize the assistant globally for static HTML
      console.log('BrainKB Assistant initialized with config:', config);
      
      // Create a container and render the component
      const container = document.createElement('div');
      container.id = 'brainkb-assistant-container';
      document.body.appendChild(container);
      
      // Note: In a real implementation, you'd need to render the React component here
      // This is a simplified version for demonstration
    }
  };
} 