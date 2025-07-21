import React from 'react';
import { BrainKBChatWidget } from 'brainkb-assistant';

// Example configuration with backend integration and size controls
const config = {
  // Backend API configuration
  apiEndpoint: 'https://api.brainkb.org/chat',
  apiKey: process.env.REACT_APP_BRAINKB_API_KEY,
  
  // Custom branding
  branding: {
    title: 'BrainKB Assistant',
    subtitle: 'Neuroscience Knowledge Helper'
  },
  
  // Custom theme
  theme: {
    primaryColor: 'from-blue-600 to-purple-600',
    secondaryColor: 'from-blue-700 to-purple-700',
    backgroundColor: 'bg-white',
    textColor: 'text-gray-800'
  },
  
  // Feature configuration
  features: {
    enableQuickActions: true,
    enableContactInfo: true,
    enableTypingIndicator: true,
    enableSizeControls: true,
    enableResponsiveDesign: true
  },
  
  // Position configuration
  position: {
    bottom: 6,
    right: 6
  },
  
  // Size configuration with responsive design
  size: {
    width: 384, // Default width
    height: 500, // Default height
    minWidth: 320, // Minimum width
    minHeight: 400, // Minimum height
    maxWidth: 800, // Maximum width
    maxHeight: 600, // Maximum height
    expandedWidth: 800, // Expanded width
    expandedHeight: 600 // Expanded height
  },
  
  // Responsive design configuration
  responsive: {
    mobileBreakpoint: 768,
    tabletBreakpoint: 1024,
    desktopBreakpoint: 1280,
    mobileSize: {
      width: 320,
      height: 400
    },
    tabletSize: {
      width: 384,
      height: 500
    },
    desktopSize: {
      width: 450,
      height: 550
    }
  }
};

// Example page context for different pages
const getPageContext = (currentPath) => {
  switch (currentPath) {
    case '/evidence':
      return {
        title: 'Evidence Assertion Ontology',
        description: 'Explore research evidence and scientific assertions in neuroscience',
        keywords: ['evidence', 'assertion', 'research', 'ontology'],
        entities: ['research_study', 'clinical_trial', 'meta_analysis']
      };
    case '/genome':
      return {
        title: 'Genome Annotation Schema',
        description: 'Access genetic annotations and genomic data',
        keywords: ['genome', 'annotation', 'dna', 'gene'],
        entities: ['gene_annotation', 'protein_expression', 'genetic_variants']
      };
    case '/anatomy':
      return {
        title: 'Anatomical Structure Schema',
        description: 'Explore brain regions and neural pathways',
        keywords: ['anatomical', 'structure', 'brain', 'neural'],
        entities: ['brain_regions', 'neural_pathways', 'cell_types']
      };
    case '/libraries':
      return {
        title: 'Library Generation Schema',
        description: 'Access multimodal genomic data and samples',
        keywords: ['library', 'sample', 'multimodal', 'data'],
        entities: ['genomic_libraries', 'sample_collections', 'multimodal_data']
      };
    default:
      return {
        title: 'BrainKB Knowledge Base',
        description: 'Explore neuroscience knowledge with our interactive assistant',
        keywords: ['neuroscience', 'knowledge', 'brain', 'research'],
        entities: ['evidence', 'genome', 'anatomy', 'libraries']
      };
  }
};

// Example App component
function App() {
  const [currentPath, setCurrentPath] = React.useState('/');
  const pageContext = getPageContext(currentPath);

  const handleMessageSend = (message) => {
    console.log('User sent message:', message);
    console.log('Current page context:', pageContext);
    // Track analytics, user behavior, etc.
  };

  const handleResponseReceived = (response) => {
    console.log('Assistant responded:', response);
    // Track responses, update UI, etc.
  };

  const handleNavigation = (path) => {
    setCurrentPath(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              BrainKB Knowledge Base
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => handleNavigation('/')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPath === '/' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation('/evidence')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPath === '/evidence' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Evidence
              </button>
              <button
                onClick={() => handleNavigation('/genome')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPath === '/genome' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Genome
              </button>
              <button
                onClick={() => handleNavigation('/anatomy')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPath === '/anatomy' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Anatomy
              </button>
              <button
                onClick={() => handleNavigation('/libraries')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPath === '/libraries' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Libraries
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">
            {pageContext.title}
          </h2>
          
          <p className="text-gray-700 mb-6">
            {pageContext.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {pageContext.keywords.map((keyword, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">
                Related Entities
              </h3>
              <div className="flex flex-wrap gap-2">
                {pageContext.entities.map((entity, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                    {entity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">
              💡 Try asking the assistant about:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• "Tell me about {pageContext.title}"</li>
              <li>• "Explain {pageContext.keywords[0]}"</li>
              <li>• "Show {pageContext.entities[0]} data"</li>
              <li>• "What evidence is available?"</li>
              <li>• "How can I explore this data?"</li>
            </ul>
          </div>

          {/* Size Controls Info */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">
              🎛️ Size Controls
            </h3>
            <p className="text-sm text-green-700 mb-2">
              The chat widget now includes size controls for better readability:
            </p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• <strong>Maximize/Minimize:</strong> Click the expand button to toggle between compact and full-size views</li>
              <li>• <strong>Responsive Design:</strong> Automatically adjusts to screen size</li>
              <li>• <strong>Better Readability:</strong> Larger text and more space in expanded mode</li>
              <li>• <strong>Mobile Friendly:</strong> Optimized for touch devices</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* BrainKB Assistant Widget with Page Context */}
      <BrainKBChatWidget
        config={config}
        currentPage={currentPath}
        pageContext={pageContext}
        onMessageSend={handleMessageSend}
        onResponseReceived={handleResponseReceived}
      />
    </div>
  );
}

export default App; 