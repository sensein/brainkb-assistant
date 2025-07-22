# BrainKB Assistant - Integration Guide

## 🚀 Quick Start

The BrainKB Assistant is a configurable, standalone chat widget that can be integrated into any website. It supports REST APIs, WebSocket connections, and provides a rich set of features for knowledge base interactions.

## 📦 Installation

### NPM Package (Recommended)
```bash
npm install brainkb-assistant
```

### CDN (Static HTML)
```html
<script src="https://unpkg.com/brainkb-assistant@latest/dist/index.js"></script>
```

## 📚 Integration Examples

### React Application
```jsx
import BrainKBAssistant from 'brainkb-assistant';

const config = {
  branding: {
    title: 'BrainKB Assistant',
    primaryColor: 'from-purple-600 to-blue-600'
  },
  api: {
    endpoint: 'https://api.example.com/chat',
    type: 'rest'
  },
  features: {
    enableQuickActions: true,
    enableFileUpload: true,
    enableContextDetection: true
  }
};

function App() {
  return (
    <div>
      <h1>My React App</h1>
      <BrainKBAssistant config={config} />
    </div>
  );
}
```

### Next.js Application
```tsx
// app/layout.tsx
import BrainKBAssistant from 'brainkb-assistant';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const config = {
    api: {
      endpoint: '/api/chat', // Next.js API route
      type: 'rest'
    },
    branding: {
      title: 'BrainKB Assistant'
    }
  };

  return (
    <html lang="en">
      <body>
        {children}
        <BrainKBAssistant config={config} />
      </body>
    </html>
  );
}
```

### Static HTML Website
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://unpkg.com/brainkb-assistant@latest/dist/index.js"></script>
</head>
<body>
    <h1>My Static Website</h1>
    
    <script>
        const config = {
            api: {
                endpoint: 'https://api.example.com/chat',
                type: 'rest'
            },
            branding: {
                title: 'BrainKB Assistant'
            }
        };
        
        BrainKBAssistant.init(config);
    </script>
</body>
</html>
```

### Node.js/Express Backend
```javascript
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// BrainKB Assistant API endpoint
app.post('/api/chat', async (req, res) => {
  const { message, context } = req.body;
  
  // Your AI logic here
  const response = {
    content: `I received: "${message}". This is a sample response.`,
    timestamp: new Date().toISOString()
  };
  
  res.json(response);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## ⚙️ Configuration Options

### Branding
```javascript
branding: {
  title: 'BrainKB Assistant',
  subtitle: 'Knowledge Base Helper',
  primaryColor: 'from-purple-600 to-blue-600',
  secondaryColor: 'purple-100',
  accentColor: 'purple-600'
}
```

### Features
```javascript
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
}
```

### API Configuration
```javascript
api: {
  endpoint: 'https://api.example.com/chat',
  type: 'rest', // 'rest', 'mcp', 'websocket'
  headers: {
    'Authorization': 'Bearer your-api-key'
  },
  timeout: 30000,
  retryAttempts: 3
}
```

### MCP Server Integration
```javascript
mcp: {
  serverUrl: 'https://mcp.example.com',
  tools: ['search_knowledge_base', 'get_entity_details'],
  enableToolCalling: true,
  enableStreaming: false
}
```

### UI Configuration
```javascript
ui: {
  position: 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
  size: {
    width: '600px',
    height: '700px',
    expandedWidth: '1200px',
    expandedHeight: '900px'
  },
  theme: 'light', // 'light', 'dark', 'auto'
  zIndex: 9999
}
```

### Quick Actions
```javascript
quickActions: [
  {
    id: 'question',
    label: '❓ I have a question',
    icon: '❓',
    action: 'ask_question',
    description: 'Ask any question'
  }
]
```

### Customization
```javascript
customization: {
  welcomeMessage: 'Hello and welcome! 👋',
  placeholderText: 'Ask me anything...',
  errorMessage: 'Sorry, I encountered an error.',
  loadingMessage: 'Thinking...'
}
```

### Callbacks
```javascript
callbacks: {
  onMessageSend: (message) => {
    console.log('Message sent:', message);
  },
  onResponseReceived: (response) => {
    console.log('Response received:', response);
  },
  onError: (error) => {
    console.error('Error:', error);
  },
  onFileUpload: (file) => {
    console.log('File uploaded:', file);
  },
  onQuickAction: (action) => {
    console.log('Quick action:', action);
  }
}
```

## 🔌 Backend Integration

### REST API Endpoint
Your API should accept POST requests with this structure:
```javascript
{
  "message": "User message",
  "context": {
    "currentPage": "page-title",
    "pageContext": {
      "title": "Page Title",
      "description": "Page description",
      "keywords": ["keyword1", "keyword2"],
      "entities": ["entity1", "entity2"]
    },
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

And return responses in this format:
```javascript
{
  "content": "Assistant response",
  "quickActions": [
    {
      "id": "action1",
      "label": "Action Label",
      "action": "action_type"
    }
  ],
  "metadata": {
    "confidence": 0.95,
    "sources": ["source1", "source2"]
  }
}
```

### MCP Server Integration
For MCP server integration, your server should implement the Model Context Protocol. The assistant will send requests like:
```javascript
{
  "type": "request",
  "message": "User message",
  "context": {...},
  "tools": ["tool1", "tool2"]
}
```

## 🎨 Customization Examples

### Different Branding
```javascript
const config = {
  branding: {
    title: 'Customer Support',
    subtitle: 'How can I help?',
    primaryColor: 'from-green-600 to-blue-600'
  }
};
```

### Different Position
```javascript
const config = {
  ui: {
    position: 'bottom-left',
    size: {
      width: '400px',
      height: '500px'
    }
  }
};
```

### Custom Quick Actions
```javascript
const config = {
  quickActions: [
    {
      id: 'support',
      label: '🆘 Need Help',
      action: 'get_support'
    },
    {
      id: 'pricing',
      label: '💰 Pricing',
      action: 'show_pricing'
    }
  ]
};
```

## 📱 Responsive Design

The assistant automatically adapts to different screen sizes:
- **Desktop**: Full feature set with expandable window
- **Tablet**: Optimized layout with touch-friendly controls
- **Mobile**: Compact design with essential features

## 🔒 Security Considerations

1. **API Keys**: Store API keys securely using environment variables
2. **CORS**: Configure your backend to allow requests from your domain
3. **Rate Limiting**: Implement rate limiting on your API endpoints
4. **Input Validation**: Validate all user inputs on your backend

## 🚀 Deployment

### Vercel/Netlify
1. Add the assistant to your React/Next.js app
2. Deploy as usual
3. Configure environment variables for API endpoints

### WordPress
1. Add the CDN script to your theme
2. Configure the assistant in your theme's JavaScript
3. Set up API endpoints on your server

### Static Sites
1. Include the CDN script
2. Configure the assistant inline
3. Set up API endpoints on a separate server

## 🐛 Troubleshooting

### Common Issues

1. **Assistant not appearing**
   - Check if React/ReactDOM are loaded
   - Verify z-index is not conflicting
   - Check browser console for errors

2. **API calls failing**
   - Verify CORS settings on your backend
   - Check API endpoint URL
   - Verify authentication headers

3. **Styling conflicts**
   - Ensure Tailwind CSS is loaded
   - Check for conflicting CSS
   - Verify z-index settings

### Debug Mode
Enable debug mode to see detailed logs:
```javascript
const config = {
  debug: true,
  // ... other config
};
```

## 📞 Support

- **Documentation**: [https://github.com/brainkb/brainkb-assistant](https://github.com/brainkb/brainkb-assistant)
- **Issues**: [GitHub Issues](https://github.com/brainkb/brainkb-assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/brainkb/brainkb-assistant/discussions)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details. 