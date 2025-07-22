# BrainKB Assistant

A configurable, standalone chat widget that can be integrated into any website. It supports REST APIs, WebSocket connections, and provides a rich set of features for knowledge base interactions.

## 🚀 Quick Start

### Installation

```bash
# From NPM (Recommended)
npm install brainkb-assistant

# From GitHub
git clone https://github.com/brainkb/brainkb-assistant.git
cd brainkb-assistant
npm install
npm run build
npm install ./brainkb-assistant
```

### Basic Usage

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
      <h1>My Website</h1>
      <BrainKBAssistant config={config} />
    </div>
  );
}
```

## ✨ Features

- **🔧 Configurable** - Easy to customize branding, features, and API endpoints
- **🌐 Universal** - Works with React, Next.js, static HTML, and any web framework
- **📱 Responsive** - Adapts to different screen sizes and devices
- **🎯 Context Aware** - Automatically detects current page content
- **💬 Rich Chat** - Markdown support, file uploads, quick actions
- **🔗 API Flexible** - Supports REST APIs and WebSocket connections
- **🎨 Customizable** - Branding, colors, positioning, and features
- **📦 Standalone** - No dependencies on your existing codebase

## 📚 Documentation

- [Installation Guide](./INSTALLATION.md) - Complete setup instructions
- [Setup Guide](./SETUP_GUIDE.md) - Detailed integration guide
- [Examples](./examples/) - Integration examples for different platforms

## 🔧 Configuration

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

## 🎯 Integration Examples

### React Application
```jsx
import BrainKBAssistant from 'brainkb-assistant';

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
        BrainKBAssistant.init(config);
    </script>
</body>
</html>
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/brainkb/brainkb-assistant.git

# Install dependencies
npm install

# Start development mode
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 📦 Package Structure

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
└── package.json
```

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

## 🆘 Support

- 📖 [Documentation](./SETUP_GUIDE.md)
- 💡 [Examples](./examples/)
- 🐛 [Issues](https://github.com/brainkb/brainkb-assistant/issues)
- 💬 [Discussions](https://github.com/brainkb/brainkb-assistant/discussions) 