const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// BrainKB Assistant API Routes
app.post('/api/brainkb/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    console.log('Received message:', message);
    console.log('Context:', context);
    
    // Example response - replace with your actual AI logic
    const response = {
      content: `I received your message: "${message}". This is a sample response from the Node.js server.`,
      timestamp: new Date().toISOString(),
      context: context
    };
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.json(response);
  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// File upload endpoint
app.post('/api/brainkb/upload', async (req, res) => {
  try {
    // Handle file upload logic here
    res.json({
      success: true,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({
      error: 'File upload failed',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/api/brainkb/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Serve static files (if you have a frontend)
app.use(express.static('public'));

// Example HTML page with BrainKB Assistant
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BrainKB Assistant - Node.js Example</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-50">
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-4xl font-bold text-gray-900 mb-8">BrainKB Assistant with Node.js</h1>
            
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-2xl font-semibold mb-4">Node.js Backend Integration</h2>
                <p class="text-gray-600 mb-4">
                    This example shows how to integrate BrainKB Assistant with a Node.js/Express backend.
                </p>
                
                <div class="space-y-4">
                    <div class="p-4 bg-blue-50 rounded-lg">
                        <h3 class="font-semibold text-blue-900">Features:</h3>
                        <ul class="text-sm text-blue-800 mt-2 space-y-1">
                            <li>• Express.js REST API</li>
                            <li>• CORS enabled for cross-origin requests</li>
                            <li>• File upload support</li>
                            <li>• Health check endpoint</li>
                            <li>• Error handling and logging</li>
                        </ul>
                    </div>
                    
                    <div class="p-4 bg-green-50 rounded-lg">
                        <h3 class="font-semibold text-green-900">API Endpoints:</h3>
                        <ul class="text-sm text-green-800 mt-2 space-y-1">
                            <li>• POST /api/brainkb/chat - Chat endpoint</li>
                            <li>• POST /api/brainkb/upload - File upload</li>
                            <li>• GET /api/brainkb/health - Health check</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- BrainKB Assistant will be loaded here -->
        <script>
            // Configuration for BrainKB Assistant
            const config = {
                branding: {
                    title: 'BrainKB Assistant',
                    subtitle: 'Node.js Backend',
                    primaryColor: 'from-blue-600 to-purple-600'
                },
                api: {
                    endpoint: '/api/brainkb/chat',
                    type: 'rest',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000,
                    retryAttempts: 3
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
                        height: '700px',
                        expandedWidth: '1200px',
                        expandedHeight: '900px'
                    }
                }
            };
            
            // Load BrainKB Assistant (you would need to include the actual script)
            // BrainKBAssistant.init(config);
        </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 BrainKB Assistant Node.js server running on port ${PORT}`);
  console.log(`📡 API endpoints:`);
  console.log(`   - POST http://localhost:${PORT}/api/brainkb/chat`);
  console.log(`   - POST http://localhost:${PORT}/api/brainkb/upload`);
  console.log(`   - GET  http://localhost:${PORT}/api/brainkb/health`);
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
});

module.exports = app; 