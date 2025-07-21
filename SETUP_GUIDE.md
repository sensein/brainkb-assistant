# BrainKB Assistant - Easy Setup Guide

## 🚀 Quick Start (30 seconds)

### Option 1: One-Click Setup (Recommended)

Add this single script to your HTML:

```html
<script>
  // One-click BrainKB Assistant setup
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
```

### Option 2: NPM Installation

```bash
npm install brainkb-assistant
```

```jsx
import { BrainKBChatWidget } from 'brainkb-assistant';

function App() {
  return <BrainKBChatWidget />;
}
```

## 🧠 MCP Integration Setup

### 1. Enable MCP Support

```javascript
const config = {
  mcp: {
    enabled: true,
    serverUrl: 'https://your-mcp-server.com',
    apiKey: 'your-mcp-api-key'
  }
};
```

### 2. Add Custom Tools

```javascript
const customTools = [
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
];

const config = {
  mcp: {
    enabled: true,
    tools: customTools
  }
};
```

## 📁 File Upload Setup

### Enable File Upload

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

## 🎨 Customization

### Basic Customization

```javascript
const config = {
  branding: {
    title: 'Your Assistant',
    subtitle: 'Custom Subtitle'
  },
  theme: {
    primaryColor: 'from-blue-600 to-purple-600'
  },
  position: {
    bottom: 6,
    right: 6
  }
};
```

### Advanced Features

```javascript
const config = {
  features: {
    enableFileUpload: true,
    enableCodeRendering: true,
    enableContentEditing: true,
    enableMCPIntegration: true,
    enableSizeControls: true
  },
  size: {
    width: 384,
    height: 500,
    expandedWidth: 800,
    expandedHeight: 600
  }
};
```

## 🔧 Framework Integration

### React

```jsx
import { BrainKBChatWidget } from 'brainkb-assistant';

function App() {
  return (
    <BrainKBChatWidget 
      config={{
        mcp: { enabled: true },
        features: { enableFileUpload: true }
      }}
    />
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
        <BrainKBChatWidget config={{ mcp: { enabled: true } }} />
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
  
  const assistant = new BrainKBChatWidget({
    mcp: { enabled: true },
    features: { enableFileUpload: true }
  });
  document.body.appendChild(assistant);
</script>
```

## 🛠️ Backend Setup

### Express.js Backend Example

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message, context } = req.body;
  
  try {
    // Process message with MCP integration
    const response = await processWithMCP(message, context);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// File upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const analysis = await analyzeFile(req.file);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze file' });
  }
});

app.listen(3000, () => {
  console.log('BrainKB Assistant backend running on port 3000');
});
```

## 🔍 Troubleshooting

### Common Issues

1. **Assistant not appearing**
   - Check if script is loaded (no console errors)
   - Verify Tailwind CSS is included

2. **MCP not working**
   - Check MCP server URL and API key
   - Verify network connectivity

3. **File upload failing**
   - Check backend endpoints and CORS settings
   - Verify file size limits

4. **Styling issues**
   - Ensure Tailwind CSS is loaded
   - Check for CSS conflicts

### Debug Mode

```javascript
const config = {
  debug: true,
  mcp: { enabled: true }
};
```

## 📞 Support

- **Documentation**: [https://brainkb.org/docs](https://brainkb.org/docs)
- **GitHub**: [https://github.com/brainkb/brainkb-assistant](https://github.com/brainkb/brainkb-assistant)
- **Email**: support@brainkb.org

## 🎯 Next Steps

1. **Test the basic setup** - Verify the assistant appears
2. **Configure MCP** - Add your MCP server details
3. **Customize branding** - Update title, colors, and logo
4. **Add file upload** - Configure backend endpoints
5. **Deploy to production** - Use the production build

---

**Need help?** Check our [full documentation](https://brainkb.org/docs) or [create an issue](https://github.com/brainkb/brainkb-assistant/issues). 