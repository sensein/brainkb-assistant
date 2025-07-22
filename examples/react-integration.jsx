import React from 'react';
import BrainKBAssistant, { BrainKBConfig } from '../components/BrainKBAssistant';

// Example React App with BrainKB Assistant Integration
const App = () => {
  // BrainKB Assistant Configuration
  const brainKBConfig: BrainKBConfig = {
    branding: {
      title: 'BrainKB Assistant',
      subtitle: 'Knowledge Base Helper',
      primaryColor: 'from-purple-600 to-blue-600',
      secondaryColor: 'purple-100',
      accentColor: 'purple-600'
    },
    features: {
      enableQuickActions: true,
      enableFileUpload: true,
      enableMessageEditing: true,
      enableCodeRendering: true,
      enableMarkdown: true,
      enableContextDetection: true,
      enableTypingIndicator: true,
      enableExpandableWindow: true,
      enableDragAndDrop: true,
      enableKeyboardShortcuts: true
    },
    api: {
      endpoint: 'https://api.brainkb.org/chat',
      type: 'rest',
      headers: {
        'Authorization': 'Bearer your-api-key',
        'Content-Type': 'application/json'
      },
      timeout: 30000,
      retryAttempts: 3
    },
    ui: {
      position: 'bottom-right',
      size: {
        width: '600px',
        height: '700px',
        expandedWidth: '1200px',
        expandedHeight: '900px'
      },
      theme: 'light',
      zIndex: 9999
    },
    quickActions: [
      {
        id: 'question',
        label: '❓ I have a question',
        icon: '❓',
        action: 'ask_question',
        description: 'Ask any question about the knowledge base'
      },
      {
        id: 'tell_more',
        label: '💡 Tell me more',
        icon: '💡',
        action: 'tell_more',
        description: 'Get more detailed information'
      },
      {
        id: 'about_knowledge',
        label: '📄 Tell me about Knowledge...',
        icon: '📄',
        action: 'about_knowledge',
        description: 'Learn about knowledge graphs and concepts'
      },
      {
        id: 'explain_knowledge',
        label: '🔍 Explain knowledge',
        icon: '🔍',
        action: 'explain_knowledge',
        description: 'Get explanations about knowledge concepts'
      },
      {
        id: 'show_entities',
        label: '📈 Show entities data',
        icon: '📈',
        action: 'show_entities',
        description: 'View entity data and relationships'
      },
      {
        id: 'evidence_assertions',
        label: '📊 Evidence & Assertions',
        icon: '📊',
        action: 'evidence_assertions',
        description: 'Explore evidence and assertions'
      },
      {
        id: 'explore_wiki',
        label: '🔎 Explore Wiki',
        icon: '🔎',
        action: 'explore_wiki',
        description: 'Browse the knowledge wiki'
      }
    ],
    contextDetection: {
      enabled: true,
      selectors: {
        title: 'h1, h2',
        description: 'meta[name="description"], p',
        keywords: 'meta[name="keywords"]'
      },
      autoDetect: true
    },
    customization: {
      welcomeMessage: 'Hello and welcome to BrainKB Assistant! 👋',
      placeholderText: 'Ask about Knowledge Graph or anything',
      errorMessage: 'Sorry, I encountered an error. Please try again.',
      loadingMessage: 'Thinking...'
    },
    callbacks: {
      onMessageSend: (message) => {
        console.log('Message sent:', message);
        // You can integrate with your analytics here
        analytics.track('brainkb_message_sent', { message });
      },
      onResponseReceived: (response) => {
        console.log('Response received:', response);
        // You can log responses or integrate with monitoring
        analytics.track('brainkb_response_received', { response });
      },
      onError: (error) => {
        console.error('Error:', error);
        // You can send errors to your error tracking service
        errorTracking.captureException(error);
      },
      onFileUpload: (file) => {
        console.log('File uploaded:', file);
        // You can handle file uploads to your backend
        uploadFileToServer(file);
      },
      onQuickAction: (action) => {
        console.log('Quick action:', action);
        // You can track user interactions
        analytics.track('brainkb_quick_action', { action });
      }
    }
  };

  // Page context for the current page
  const pageContext = {
    title: 'React Integration Example',
    description: 'Example of BrainKB Assistant integration in a React application',
    keywords: ['brainKB', 'assistant', 'integration', 'react', 'javascript'],
    entities: ['knowledge', 'graph', 'data', 'information', 'react']
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Your React App Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          React App with BrainKB Assistant
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Configurable branding and colors</li>
              <li>• MCP server integration</li>
              <li>• REST API support</li>
              <li>• File upload capabilities</li>
              <li>• Context-aware responses</li>
              <li>• Custom callbacks for analytics</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
            <p className="text-gray-600 mb-4">
              The assistant is fully configurable and can be easily integrated into any React application.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Quick Setup:</h3>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Install the BrainKB Assistant package</li>
                <li>2. Import the component</li>
                <li>3. Configure your settings</li>
                <li>4. Add to your app</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* BrainKB Assistant Integration */}
      <BrainKBAssistant 
        config={brainKBConfig}
        pageContext={pageContext}
      />
    </div>
  );
};

// Example analytics and error tracking (mock implementations)
const analytics = {
  track: (event, data) => {
    console.log(`Analytics: ${event}`, data);
    // Integrate with your analytics service (Google Analytics, Mixpanel, etc.)
  }
};

const errorTracking = {
  captureException: (error) => {
    console.error('Error tracking:', error);
    // Integrate with your error tracking service (Sentry, LogRocket, etc.)
  }
};

const uploadFileToServer = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    console.log('File uploaded successfully:', result);
  } catch (error) {
    console.error('File upload failed:', error);
  }
};

export default App; 