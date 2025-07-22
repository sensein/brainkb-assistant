# BrainKB Assistant - Installation Guide

## 🚀 Quick Installation

### From NPM (Recommended)
```bash
npm install brainkb-assistant
```

### From GitHub
```bash
# Clone the repository
git clone https://github.com/brainkb/brainkb-assistant.git

# Navigate to the directory
cd brainkb-assistant

# Install dependencies
npm install

# Build the package
npm run build

# Install in your project
npm install ./brainkb-assistant
```

## 📦 Installation Methods

### 1. NPM Package (Production)
```bash
npm install brainkb-assistant
```

### 2. GitHub Repository (Development)
```bash
# Clone the repository
git clone https://github.com/brainkb/brainkb-assistant.git

# Install dependencies
npm install

# Build for production
npm run build

# Link to your project
npm link
cd /path/to/your/project
npm link brainkb-assistant
```

### 3. Local Development
```bash
# Clone the repository
git clone https://github.com/brainkb/brainkb-assistant.git

# Install dependencies
npm install

# Build in watch mode
npm run dev

# In your project, install as local dependency
npm install ./brainkb-assistant
```

## 🔧 Usage Examples

### React Application
```jsx
import BrainKBAssistant from 'brainkb-assistant';

function App() {
  const config = {
    api: {
      endpoint: 'https://api.example.com/chat',
      type: 'rest'
    },
    branding: {
      title: 'BrainKB Assistant'
    }
  };

  return (
    <div>
      <h1>My App</h1>
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
      endpoint: '/api/chat',
      type: 'rest'
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

### Static HTML
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://unpkg.com/brainkb-assistant@latest/dist/index.js"></script>
</head>
<body>
    <h1>My Website</h1>
    
    <script>
        const config = {
            api: {
                endpoint: 'https://api.example.com/chat',
                type: 'rest'
            }
        };
        
        BrainKBAssistant.init(config);
    </script>
</body>
</html>
```

## ⚙️ Configuration Options

### Basic Configuration
```javascript
const config = {
  branding: {
    title: 'BrainKB Assistant',
    subtitle: 'Knowledge Helper',
    primaryColor: 'from-purple-600 to-blue-600'
  },
  api: {
    endpoint: 'https://api.example.com/chat',
    type: 'rest', // or 'websocket'
    headers: {
      'Authorization': 'Bearer your-token'
    }
  },
  features: {
    enableQuickActions: true,
    enableFileUpload: true,
    enableContextDetection: true,
    enableMarkdown: true
  },
  ui: {
    position: 'bottom-right',
    size: {
      width: '600px',
      height: '700px'
    }
  }
};
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Development Commands
```bash
# Install dependencies
npm install

# Start development mode
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Project Structure
```
brainkb-assistant/
├── src/
│   ├── components/
│   │   ├── BrainKBAssistant.tsx
│   │   └── BrainKBAssistantWrapper.tsx
│   └── index.ts
├── examples/
│   ├── react-integration.jsx
│   ├── nextjs-integration.tsx
│   ├── static-html-integration.html
│   └── nodejs-server.js
├── dist/
│   ├── index.js
│   ├── index.esm.js
│   └── index.d.ts
├── package.json
├── rollup.config.js
├── tsconfig.json
└── README.md
```

## 🔗 API Integration

### REST API Example
```javascript
// Your backend API endpoint
app.post('/api/chat', async (req, res) => {
  const { message, context } = req.body;
  
  // Your AI logic here
  const response = {
    content: `I received: "${message}". This is a sample response.`,
    timestamp: new Date().toISOString()
  };
  
  res.json(response);
});
```

### WebSocket Example
```javascript
// Your WebSocket server
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    // Your AI logic here
    const response = {
      content: `WebSocket response: ${data.message}`,
      timestamp: new Date().toISOString()
    };
    
    ws.send(JSON.stringify(response));
  });
});
```

## 🚀 Deployment

### NPM Publish
```bash
# Login to npm
npm login

# Build the package
npm run build

# Publish to npm
npm publish
```

### GitHub Release
```bash
# Create a new release on GitHub
git tag v1.0.0
git push origin v1.0.0

# Build and upload assets
npm run build
# Upload dist/ folder to GitHub release
```

## 📚 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Detailed integration guide
- [Examples](./examples/) - Integration examples for different platforms
- [API Reference](./API.md) - Complete API documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details. 