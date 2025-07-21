# BrainKB Assistant

A powerful, intelligent chat assistant for BrainKB knowledge base integration with MCP (Model Context Protocol) support and agentic capabilities.

## 🚀 Features

- **🧠 MCP Integration**: Full support for Model Context Protocol with agentic capabilities
- **📁 File Upload**: Drag & drop support for JSON, CSV, TXT, and image files
- **💻 Code Rendering**: Syntax highlighting and copy-to-clipboard functionality
- **✏️ Content Editing**: Inline message editing and content management
- **🎨 Easy Setup**: One-click installation for any website
- **📱 Responsive Design**: Works on mobile, tablet, and desktop
- **🔧 Customizable**: Extensive configuration options
- **🌐 Multi-Platform**: Support for React, Next.js, WordPress, and vanilla JS

## 🛠️ Quick Setup

### 1. One-Click Installation (Recommended)

Add this single script to your HTML:

```html
<script>
  // One-click BrainKB Assistant setup
  (function() {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/brainkb-assistant@latest/dist/index.js';
    script.onload = function() {
      window.BrainKBAssistant.init({
        branding: {
          title: 'BrainKB Assistant',
          subtitle: 'Knowledge Base Helper'
        },
        features: {
          enableFileUpload: true,
          enableCodeRendering: true,
          enableContentEditing: true,
          enableMCPIntegration: true
        },
        mcp: {
          enabled: true,
          serverUrl: 'https://your-mcp-server.com',
          apiKey: 'your-mcp-api-key'
        }
      });
    };
    document.head.appendChild(script);
  })();
</script>
```

### 2. NPM Installation

```bash
npm install brainkb-assistant
```

```jsx
import { BrainKBChatWidget } from 'brainkb-assistant';

function App() {
  return (
    <BrainKBChatWidget 
      config={{
        branding: {
          title: 'BrainKB Assistant',
          subtitle: 'Knowledge Base Helper'
        },
        features: {
          enableMCPIntegration: true,
          enableFileUpload: true,
          enableCodeRendering: true
        },
        mcp: {
          enabled: true,
          serverUrl: 'https://your-mcp-server.com',
          apiKey: 'your-mcp-api-key'
        }
      }}
    />
  );
}
```

### 3. CDN Installation

```html
<script type="module">
  import { BrainKBChatWidget } from 'https://unpkg.com/brainkb-assistant@latest/dist/index.esm.js';
  
  const assistant = new BrainKBChatWidget({
    branding: {
      title: 'BrainKB Assistant',
      subtitle: 'Knowledge Base Helper'
    },
    features: {
      enableMCPIntegration: true
    },
    mcp: {
      enabled: true,
      serverUrl: 'https://your-mcp-server.com',
      apiKey: 'your-mcp-api-key'
    }
  });
  
  document.body.appendChild(assistant);
</script>
```

## 🧠 MCP Integration

### Enable MCP Support

```javascript
const config = {
  mcp: {
    enabled: true,
    serverUrl: 'https://your-mcp-server.com',
    apiKey: 'your-mcp-api-key',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000
  }
};
```

### Built-in BrainKB Tools

The assistant includes these MCP tools:

- **`search_knowledge_base`**: Search BrainKB knowledge base
- **`get_entity_details`**: Get detailed entity information
- **`analyze_data`**: Analyze uploaded data files
- **`generate_code`**: Generate BrainKB API code examples

### Custom MCP Tools

```javascript
const customTools = [
  {
    name: 'custom_tool',
    description: 'Your custom tool description',
    parameters: {
      param1: { type: 'string', description: 'Parameter description' }
    },
    function: async (params) => {
      // Your tool implementation
      return { result: 'Tool executed successfully' };
    }
  }
];

const config = {
  mcp: {
    enabled: true,
    tools: customTools
  }
};
```

## 📁 File Upload Features

### Supported File Types

- **JSON**: Automatic parsing and structure analysis
- **CSV**: Data analysis and visualization
- **TXT**: Text content analysis
- **Images**: PNG, JPG, JPEG, GIF for brain scan analysis

### Upload Configuration

```javascript
const config = {
  features: {
    enableFileUpload: true
  },
  backend: {
    enabled: true,
    apiUrl: 'https://your-backend.com',
    endpoints: {
      upload: '/api/upload',
      analyze: '/api/analyze'
    }
  }
};
```

## 💻 Code Rendering

### Syntax Highlighting

The assistant automatically renders code blocks with syntax highlighting:

- **JavaScript/TypeScript**: API examples and integration code
- **Python**: Data analysis and ML examples
- **JSON**: Configuration and data structures
- **Markdown**: Documentation and guides

### Code Generation

Ask for code examples:

- "Generate JavaScript code for BrainKB API"
- "Show me Python code for data analysis"
- "Create TypeScript interface for BrainKB types"

## 🎨 Customization

### Branding

```javascript
const config = {
  branding: {
    title: 'Your Assistant',
    subtitle: 'Custom Subtitle',
    logo: 'https://your-logo.png'
  }
};
```

### Theme

```javascript
const config = {
  theme: {
    primaryColor: 'from-blue-600 to-purple-600',
    secondaryColor: 'from-blue-700 to-purple-700',
    backgroundColor: 'bg-white',
    textColor: 'text-gray-800'
  }
};
```

### Position & Size

```javascript
const config = {
  position: {
    bottom: 6,
    right: 6
  },
  size: {
    width: 384,
    height: 500,
    expandedWidth: 800,
    expandedHeight: 600
  }
};
```

## 🔧 Advanced Configuration

### Full Configuration Example

```javascript
const config = {
  branding: {
    title: 'BrainKB Assistant',
    subtitle: 'Neuroscience Research Helper'
  },
  theme: {
    primaryColor: 'from-blue-600 to-purple-600',
    secondaryColor: 'from-blue-700 to-purple-700'
  },
  features: {
    enableQuickActions: true,
    enableContactInfo: true,
    enableTypingIndicator: true,
    enableSizeControls: true,
    enableResponsiveDesign: true,
    enableFileUpload: true,
    enableCodeRendering: true,
    enableContentEditing: true,
    enableMCPIntegration: true
  },
  mcp: {
    enabled: true,
    serverUrl: 'https://your-mcp-server.com',
    apiKey: 'your-mcp-api-key',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000,
    tools: [] // Custom tools
  },
  backend: {
    enabled: true,
    apiUrl: 'https://your-backend.com',
    apiKey: 'your-backend-api-key',
    endpoints: {
      chat: '/api/chat',
      upload: '/api/upload',
      search: '/api/search',
      analytics: '/api/analytics'
    }
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
  }
};
```

## 🚀 Framework Integration

### React

```jsx
import { BrainKBChatWidget } from 'brainkb-assistant';

function App() {
  return (
    <div>
      <BrainKBChatWidget config={config} />
    </div>
  );
}
```

### Next.js

```jsx
'use client';
import { BrainKBChatWidget } from 'brainkb-assistant';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <BrainKBChatWidget config={config} />
      </body>
    </html>
  );
}
```

### WordPress

Add to your theme's `footer.php`:

```php
<script type="module">
  import { BrainKBChatWidget } from 'https://unpkg.com/brainkb-assistant@latest/dist/index.esm.js';
  
  const assistant = new BrainKBChatWidget(<?php echo json_encode($config); ?>);
  document.body.appendChild(assistant);
</script>
```

## 🔍 API Reference

### BrainKBChatWidget Props

```typescript
interface BrainKBChatWidgetProps {
  config?: BrainKBConfig;
  onMessageSend?: (message: string) => void;
  onResponseReceived?: (response: ChatMessage) => void;
  className?: string;
  currentPage?: string;
  pageContext?: {
    title?: string;
    description?: string;
    keywords?: string[];
    entities?: string[];
  };
}
```

### BrainKBConfig

```typescript
interface BrainKBConfig {
  branding?: {
    title?: string;
    subtitle?: string;
    logo?: string;
  };
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  features?: {
    enableQuickActions?: boolean;
    enableContactInfo?: boolean;
    enableTypingIndicator?: boolean;
    enableSizeControls?: boolean;
    enableResponsiveDesign?: boolean;
    enableFileUpload?: boolean;
    enableCodeRendering?: boolean;
    enableContentEditing?: boolean;
    enableMCPIntegration?: boolean;
  };
  mcp?: {
    enabled?: boolean;
    serverUrl?: string;
    apiKey?: string;
    tools?: MCPTool[];
    model?: string;
    temperature?: number;
    maxTokens?: number;
  };
  backend?: {
    enabled?: boolean;
    apiUrl?: string;
    apiKey?: string;
    endpoints?: {
      chat?: string;
      upload?: string;
      search?: string;
      analytics?: string;
    };
  };
}
```

## 🛠️ Development

### Install Dependencies

```bash
npm install
```

### Build

```bash
npm run build
```

### Development

```bash
npm run dev
```

## 📚 Examples

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <title>BrainKB Assistant Demo</title>
</head>
<body>
  <h1>Welcome to BrainKB</h1>
  
  <script>
    // One-click setup
    (function() {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/brainkb-assistant@latest/dist/index.js';
      script.onload = function() {
        window.BrainKBAssistant.init({
          branding: { title: 'BrainKB Assistant' },
          features: { enableMCPIntegration: true }
        });
      };
      document.head.appendChild(script);
    })();
  </script>
</body>
</html>
```

### MCP Integration Example

```javascript
import { BrainKBChatWidget } from 'brainkb-assistant';

const config = {
  mcp: {
    enabled: true,
    serverUrl: 'https://your-mcp-server.com',
    apiKey: 'your-api-key',
    tools: [
      {
        name: 'search_brainkb',
        description: 'Search BrainKB knowledge base',
        parameters: {
          query: { type: 'string', description: 'Search query' }
        },
        function: async (params) => {
          // Your search implementation
          return { results: [] };
        }
      }
    ]
  }
};

<BrainKBChatWidget config={config} />
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Documentation**: [https://brainkb.org/docs](https://brainkb.org/docs)
- **Issues**: [GitHub Issues](https://github.com/brainkb/brainkb-assistant/issues)
- **Email**: support@brainkb.org

## 🔗 Links

- **Website**: [https://beta.brainkb.org](https://beta.brainkb.org)
- **Documentation**: [https://brainkb.org/docs](https://brainkb.org/docs)
- **NPM Package**: [https://npmjs.com/package/brainkb-assistant](https://npmjs.com/package/brainkb-assistant) 