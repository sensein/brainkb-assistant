import { SetupConfig, InstallationGuide, BrainKBConfig } from '../types';

export class BrainKBSetup {
  private config: SetupConfig;

  constructor(config: SetupConfig) {
    this.config = config;
  }

  // Generate installation code for any website
  generateInstallationCode(): string {
    const config = this.generateConfig();
    
    return `
<!-- BrainKB Assistant Installation -->
<script type="module">
  import { BrainKBChatWidget } from 'https://unpkg.com/brainkb-assistant@latest/dist/index.esm.js';
  
  // Initialize BrainKB Assistant
  const assistant = new BrainKBChatWidget(${JSON.stringify(config, null, 2)});
  
  // Mount to page
  document.body.appendChild(assistant);
</script>

<!-- Alternative: CDN Installation -->
<script src="https://unpkg.com/brainkb-assistant@latest/dist/index.js"></script>
<script>
  window.BrainKBAssistant.init(${JSON.stringify(config, null, 2)});
</script>
`;
  }

  // Generate React component installation
  generateReactInstallation(): string {
    const config = this.generateConfig();
    
    return `
// Install the package
npm install brainkb-assistant

// In your React component
import { BrainKBChatWidget } from 'brainkb-assistant';

function App() {
  return (
    <div>
      <BrainKBChatWidget 
        config={${JSON.stringify(config, null, 2)}}
      />
    </div>
  );
}
`;
  }

  // Generate Next.js installation
  generateNextJSInstallation(): string {
    const config = this.generateConfig();
    
    return `
// Install the package
npm install brainkb-assistant

// In your layout.tsx or page component
'use client';
import { BrainKBChatWidget } from 'brainkb-assistant';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <BrainKBChatWidget 
          config={${JSON.stringify(config, null, 2)}}
        />
      </body>
    </html>
  );
}
`;
  }

  // Generate WordPress installation
  generateWordPressInstallation(): string {
    const config = this.generateConfig();
    
    return `
// Add to your WordPress theme's footer.php
<script type="module">
  import { BrainKBChatWidget } from 'https://unpkg.com/brainkb-assistant@latest/dist/index.esm.js';
  
  const assistant = new BrainKBChatWidget(${JSON.stringify(config, null, 2)});
  document.body.appendChild(assistant);
</script>
`;
  }

  // Generate configuration object
  private generateConfig(): BrainKBConfig {
    return {
      branding: {
        title: this.config.branding?.title || 'BrainKB Assistant',
        subtitle: this.config.branding?.subtitle || 'Knowledge Base Helper',
        logo: this.config.branding?.logo
      },
      theme: {
        primaryColor: 'from-blue-600 to-purple-600',
        secondaryColor: 'from-blue-700 to-purple-700',
        backgroundColor: 'bg-white',
        textColor: 'text-gray-800'
      },
      position: {
        bottom: 6,
        right: 6
      },
      features: {
        enableQuickActions: true,
        enableContactInfo: true,
        enableTypingIndicator: true,
        enableSizeControls: true,
        enableResponsiveDesign: true,
        enableFileUpload: this.config.features?.fileUpload ?? true,
        enableCodeRendering: this.config.features?.codeRendering ?? true,
        enableContentEditing: this.config.features?.contentEditing ?? true,
        enableMCPIntegration: this.config.features?.mcpIntegration ?? false
      },
      size: {
        width: 384,
        height: 500,
        minWidth: 320,
        minHeight: 400,
        maxWidth: 800,
        maxHeight: 600,
        expandedWidth: 800,
        expandedHeight: 600
      },
      responsive: {
        mobileBreakpoint: 768,
        tabletBreakpoint: 1024,
        desktopBreakpoint: 1280,
        mobileSize: { width: 320, height: 400 },
        tabletSize: { width: 384, height: 500 },
        desktopSize: { width: 450, height: 550 }
      },
      mcp: this.config.mcpEnabled ? {
        enabled: true,
        serverUrl: this.config.mcpServerUrl,
        apiKey: this.config.mcpApiKey,
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000
      } : undefined,
      backend: this.config.backendEnabled ? {
        enabled: true,
        apiUrl: this.config.backendUrl,
        apiKey: this.config.backendApiKey,
        endpoints: {
          chat: '/api/chat',
          upload: '/api/upload',
          search: '/api/search',
          analytics: '/api/analytics'
        }
      } : undefined
    };
  }

  // Generate complete installation guide
  generateInstallationGuide(): InstallationGuide {
    return {
      steps: [
        '1. Choose your installation method (CDN, NPM, or direct script)',
        '2. Copy the generated code to your website',
        '3. Configure your API keys and endpoints',
        '4. Customize branding and features as needed',
        '5. Test the assistant on your website'
      ],
      codeSnippet: this.generateInstallationCode(),
      configuration: this.generateConfig(),
      troubleshooting: {
        'Assistant not appearing': 'Check if the script is loaded and no console errors',
        'API errors': 'Verify your API keys and endpoints are correct',
        'Styling issues': 'Ensure Tailwind CSS is loaded or add custom styles',
        'MCP not working': 'Check MCP server URL and API key configuration',
        'File upload failing': 'Verify backend endpoints and CORS settings'
      }
    };
  }

  // Generate one-click setup script
  generateOneClickSetup(): string {
    return `
// One-click BrainKB Assistant setup
(function() {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/brainkb-assistant@latest/dist/index.js';
  script.onload = function() {
    window.BrainKBAssistant.init({
      branding: {
        title: '${this.config.branding?.title || 'BrainKB Assistant'}',
        subtitle: '${this.config.branding?.subtitle || 'Knowledge Base Helper'}'
      },
      features: {
        enableFileUpload: ${this.config.features?.fileUpload ?? true},
        enableCodeRendering: ${this.config.features?.codeRendering ?? true},
        enableContentEditing: ${this.config.features?.contentEditing ?? true},
        enableMCPIntegration: ${this.config.features?.mcpIntegration ?? false}
      },
      mcp: ${this.config.mcpEnabled ? `{
        enabled: true,
        serverUrl: '${this.config.mcpServerUrl}',
        apiKey: '${this.config.mcpApiKey}'
      }` : 'undefined'},
      backend: ${this.config.backendEnabled ? `{
        enabled: true,
        apiUrl: '${this.config.backendUrl}',
        apiKey: '${this.config.backendApiKey}'
      }` : 'undefined'}
    });
  };
  document.head.appendChild(script);
})();
`;
  }
}

// Quick setup functions for common frameworks
export const quickSetup = {
  // Vanilla JavaScript/HTML
  vanilla: (config: SetupConfig) => {
    const setup = new BrainKBSetup(config);
    return setup.generateInstallationCode();
  },

  // React
  react: (config: SetupConfig) => {
    const setup = new BrainKBSetup(config);
    return setup.generateReactInstallation();
  },

  // Next.js
  nextjs: (config: SetupConfig) => {
    const setup = new BrainKBSetup(config);
    return setup.generateNextJSInstallation();
  },

  // WordPress
  wordpress: (config: SetupConfig) => {
    const setup = new BrainKBSetup(config);
    return setup.generateWordPressInstallation();
  },

  // One-click setup
  oneClick: (config: SetupConfig) => {
    const setup = new BrainKBSetup(config);
    return setup.generateOneClickSetup();
  }
}; 