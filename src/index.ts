import { BrainKBChatWidget } from './components/BrainKBChatWidget';
import { BrainKBAPI } from './utils/api';
import { MCPService } from './utils/mcp';
import { BrainKBSetup, quickSetup } from './utils/setup';

// Types
export type {
  BrainKBConfig,
  BrainKBRequest,
  BrainKBResponse,
  ChatMessage,
  QuickAction,
  PageContext,
  MCPTool,
  MCPRequest,
  MCPResponse,
  SetupConfig,
  InstallationGuide
} from './types';

// Named exports
export { BrainKBChatWidget } from './components/BrainKBChatWidget';
export { BrainKBAPI } from './utils/api';
export { MCPService } from './utils/mcp';
export { BrainKBSetup, quickSetup } from './utils/setup';

// Global initialization for CDN usage
if (typeof window !== 'undefined') {
  (window as any).BrainKBAssistant = {
    init: (config: any) => {
      // This would initialize the assistant globally
      console.log('BrainKB Assistant initialized with config:', config);
    }
  };
} 