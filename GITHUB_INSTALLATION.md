# BrainKB Assistant - GitHub Installation Guide

## 🚀 Quick Installation from GitHub

### Method 1: Direct Clone and Install

```bash
# 1. Clone the repository
git clone https://github.com/brainkb/brainkb-assistant.git

# 2. Navigate to the directory
cd brainkb-assistant

# 3. Install dependencies
npm install

# 4. Build the package
npm run build

# 5. Install in your project
cd /path/to/your/project
npm install ./brainkb-assistant
```

### Method 2: Using npm with GitHub URL

```bash
# Install directly from GitHub
npm install github:brainkb/brainkb-assistant

# Or with specific branch/tag
npm install github:brainkb/brainkb-assistant#main
```

### Method 3: Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/brainkb/brainkb-assistant.git

# 2. Navigate to the directory
cd brainkb-assistant

# 3. Install dependencies
npm install

# 4. Link for development
npm link

# 5. In your project directory
cd /path/to/your/project
npm link brainkb-assistant
```

## 🔧 Usage After GitHub Installation

### React/Next.js Application

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

### Static HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    
    <script type="module">
        import BrainKBAssistant from './node_modules/brainkb-assistant/dist/index.esm.js';
        
        const config = {
            api: {
                endpoint: 'https://api.example.com/chat',
                type: 'rest'
            },
            branding: {
                title: 'BrainKB Assistant'
            }
        };
        
        // Initialize the assistant
        const assistant = new BrainKBAssistant(config);
        document.body.appendChild(assistant);
    </script>
</body>
</html>
```

## 🛠️ Development Workflow

### 1. Fork and Clone

```bash
# Fork the repository on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/brainkb-assistant.git
cd brainkb-assistant
npm install
```

### 2. Make Changes

```bash
# Start development mode
npm run dev

# Make your changes to the code
# The changes will be automatically built
```

### 3. Test Your Changes

```bash
# Build the package
npm run build

# Test in your project
cd /path/to/your/test/project
npm install ./brainkb-assistant
npm run dev
```

### 4. Submit Changes

```bash
# Commit your changes
git add .
git commit -m "Add new feature"

# Push to your fork
git push origin main

# Create a pull request on GitHub
```

## 📦 Package Structure After Installation

```
your-project/
├── node_modules/
│   └── brainkb-assistant/
│       ├── dist/
│       │   ├── index.js          # CommonJS bundle
│       │   ├── index.esm.js      # ES Module bundle
│       │   └── index.d.ts        # TypeScript definitions
│       ├── src/
│       │   ├── components/
│       │   │   ├── BrainKBAssistant.tsx
│       │   │   └── BrainKBAssistantWrapper.tsx
│       │   └── index.ts
│       ├── examples/
│       │   ├── react-integration.jsx
│       │   ├── nextjs-integration.tsx
│       │   ├── static-html-integration.html
│       │   └── nodejs-server.js
│       ├── package.json
│       └── README.md
├── package.json
└── your-app-files
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Module Not Found
```bash
# Error: Cannot find module 'brainkb-assistant'
# Solution: Make sure you've built the package
cd brainkb-assistant
npm run build
cd /path/to/your/project
npm install ./brainkb-assistant
```

#### 2. TypeScript Errors
```bash
# Error: Module has no exported member
# Solution: Check the exports in dist/index.d.ts
# Make sure you're importing correctly:
import BrainKBAssistant from 'brainkb-assistant';
```

#### 3. Build Errors
```bash
# Error: Rollup build failed
# Solution: Check dependencies and try:
npm install
npm run build
```

#### 4. Development Link Issues
```bash
# Error: Module not found in development
# Solution: Use npm link properly:
cd brainkb-assistant
npm link
cd /path/to/your/project
npm link brainkb-assistant
```

## 📚 Additional Resources

- [Main Installation Guide](./INSTALLATION.md)
- [Setup Guide](./SETUP_GUIDE.md)
- [Examples](./examples/)
- [API Documentation](./API.md)

## 🤝 Contributing

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a feature branch: `git checkout -b feature-name`
4. Make your changes
5. Test your changes: `npm run build && npm test`
6. Commit: `git commit -am 'Add feature'`
7. Push: `git push origin feature-name`
8. Create a pull request on GitHub

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details. 