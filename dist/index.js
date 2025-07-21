'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

/**
 * lucide-react v0.0.1 - ISC
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

/**
 * lucide-react v0.0.1 - ISC
 */


const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const createLucideIcon = (iconName, iconNode) => {
  const Component = react.forwardRef(
    ({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, children, ...rest }, ref) => react.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: `lucide lucide-${toKebabCase(iconName)}`,
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => react.createElement(tag, attrs)),
        ...(Array.isArray(children) ? children : [children]) || []
      ]
    )
  );
  Component.displayName = `${iconName}`;
  return Component;
};
var createLucideIcon$1 = createLucideIcon;

/**
 * lucide-react v0.0.1 - ISC
 */


const Check = createLucideIcon$1("Check", [
  ["polyline", { points: "20 6 9 17 4 12", key: "10jjfj" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const Copy = createLucideIcon$1("Copy", [
  [
    "rect",
    {
      width: "14",
      height: "14",
      x: "8",
      y: "8",
      rx: "2",
      ry: "2",
      key: "17jyea"
    }
  ],
  [
    "path",
    {
      d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
      key: "zix9uf"
    }
  ]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const Globe = createLucideIcon$1("Globe", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "2", x2: "22", y1: "12", y2: "12", key: "1dnqot" }],
  [
    "path",
    {
      d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
      key: "nb9nel"
    }
  ]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const Mail = createLucideIcon$1("Mail", [
  [
    "rect",
    { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }
  ],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const MapPin = createLucideIcon$1("MapPin", [
  [
    "path",
    { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z", key: "2oe9fu" }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const Maximize2 = createLucideIcon$1("Maximize2", [
  ["polyline", { points: "15 3 21 3 21 9", key: "mznyad" }],
  ["polyline", { points: "9 21 3 21 3 15", key: "1avn1i" }],
  ["line", { x1: "21", x2: "14", y1: "3", y2: "10", key: "ota7mn" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const Minimize2 = createLucideIcon$1("Minimize2", [
  ["polyline", { points: "4 14 10 14 10 20", key: "11kfnr" }],
  ["polyline", { points: "20 10 14 10 14 4", key: "rlmsce" }],
  ["line", { x1: "14", x2: "21", y1: "10", y2: "3", key: "o5lafz" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const PenLine = createLucideIcon$1("PenLine", [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    { d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z", key: "ymcmye" }
  ]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const Send = createLucideIcon$1("Send", [
  ["path", { d: "m22 2-7 20-4-9-9-4Z", key: "1q3vgg" }],
  ["path", { d: "M22 2 11 13", key: "nzbqef" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const Upload = createLucideIcon$1("Upload", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
  ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const User = createLucideIcon$1("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const X = createLucideIcon$1("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);

class MCPService {
    constructor(config) {
        this.serverUrl = config.mcp?.serverUrl || '';
        this.apiKey = config.mcp?.apiKey || '';
        this.tools = config.mcp?.tools || [];
    }
    async callTool(toolName, params) {
        const tool = this.tools.find(t => t.name === toolName);
        if (!tool) {
            throw new Error(`Tool ${toolName} not found`);
        }
        try {
            return await tool.function(params);
        }
        catch (error) {
            console.error(`Error calling tool ${toolName}:`, error);
            throw error;
        }
    }
    async sendRequest(request) {
        try {
            const response = await fetch(`${this.serverUrl}/mcp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(request),
            });
            if (!response.ok) {
                throw new Error(`MCP request failed: ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            console.error('MCP request error:', error);
            throw error;
        }
    }
    async listTools() {
        try {
            const response = await this.sendRequest({
                method: 'tools/list',
                params: {},
                id: Date.now().toString(),
            });
            return response.result?.tools || [];
        }
        catch (error) {
            console.error('Error listing MCP tools:', error);
            return this.tools;
        }
    }
    async callTools(toolCalls) {
        const results = [];
        for (const toolCall of toolCalls) {
            try {
                const result = await this.callTool(toolCall.name, toolCall.params);
                results.push({ name: toolCall.name, result });
            }
            catch (error) {
                results.push({ name: toolCall.name, error: error.message });
            }
        }
        return results;
    }
    // Built-in BrainKB tools
    getBrainKBTools() {
        return [
            {
                name: 'search_knowledge_base',
                description: 'Search the BrainKB knowledge base for specific information',
                parameters: {
                    query: { type: 'string', description: 'Search query' },
                    limit: { type: 'number', description: 'Maximum number of results', default: 10 },
                    filters: { type: 'object', description: 'Search filters', optional: true }
                },
                function: async (params) => {
                    // This would integrate with BrainKB API
                    return {
                        results: [
                            { id: '1', title: 'Brain Region Analysis', content: 'Analysis of brain regions...' },
                            { id: '2', title: 'Neural Pathways', content: 'Information about neural pathways...' }
                        ],
                        total: 2
                    };
                }
            },
            {
                name: 'get_entity_details',
                description: 'Get detailed information about a specific entity',
                parameters: {
                    entityId: { type: 'string', description: 'Entity ID' },
                    includeRelations: { type: 'boolean', description: 'Include related entities', default: true }
                },
                function: async (params) => {
                    return {
                        entity: {
                            id: params.entityId,
                            name: 'Brain Region X',
                            type: 'brain_region',
                            properties: {
                                location: 'Frontal lobe',
                                function: 'Executive control',
                                connections: ['region_y', 'region_z']
                            }
                        }
                    };
                }
            },
            {
                name: 'analyze_data',
                description: 'Analyze uploaded data files',
                parameters: {
                    fileId: { type: 'string', description: 'File ID to analyze' },
                    analysisType: { type: 'string', description: 'Type of analysis', enum: ['json', 'csv', 'image'] }
                },
                function: async (params) => {
                    return {
                        analysis: {
                            type: params.analysisType,
                            summary: 'Data analysis completed',
                            insights: ['Key finding 1', 'Key finding 2'],
                            recommendations: ['Recommendation 1', 'Recommendation 2']
                        }
                    };
                }
            },
            {
                name: 'generate_code',
                description: 'Generate code examples for BrainKB integration',
                parameters: {
                    language: { type: 'string', description: 'Programming language', enum: ['javascript', 'python', 'typescript'] },
                    task: { type: 'string', description: 'Task description' }
                },
                function: async (params) => {
                    const codeExamples = {
                        javascript: `// BrainKB API Example
const response = await fetch('/api/brainkb/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '${params.task}' })
});`,
                        python: `# BrainKB API Example
import requests

response = requests.post('/api/brainkb/search', 
  json={'query': '${params.task}'}
)`,
                        typescript: `// BrainKB API Example
interface BrainKBResponse {
  results: Array<{id: string, title: string, content: string}>;
}

const response = await fetch('/api/brainkb/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '${params.task}' })
});

const data: BrainKBResponse = await response.json();`
                    };
                    return {
                        code: codeExamples[params.language] || codeExamples.javascript,
                        language: params.language,
                        explanation: `Generated ${params.language} code for: ${params.task}`
                    };
                }
            }
        ];
    }
}

class BrainKBAPI {
    constructor(config) {
        this.mcpService = null;
        this.config = config;
        // Initialize MCP service if enabled
        if (config.mcp?.enabled) {
            this.mcpService = new MCPService(config);
        }
    }
    async sendMessage(request) {
        try {
            // If MCP is enabled, use agentic capabilities
            if (this.mcpService && this.config.mcp?.enabled) {
                return await this.handleMCPRequest(request);
            }
            // Fallback to local response generation
            return this.generateLocalResponse(request);
        }
        catch (error) {
            console.error('Error sending message:', error);
            return {
                content: "I'm sorry, I encountered an error. Please try again.",
                suggestions: ["Try rephrasing your question", "Check your connection"],
                metadata: { error: true }
            };
        }
    }
    async handleMCPRequest(request) {
        const tools = this.mcpService.getBrainKBTools();
        // Analyze the request to determine which tools to call
        const toolCalls = await this.analyzeRequestForTools(request.message, tools);
        if (toolCalls.length > 0) {
            // Execute the tools
            const results = await this.mcpService.callTools(toolCalls);
            // Generate response based on tool results
            return this.generateResponseFromToolResults(request.message, results);
        }
        // If no specific tools are needed, use the MCP server for general chat
        return await this.callMCPServer(request);
    }
    async analyzeRequestForTools(message, tools) {
        const toolCalls = [];
        // Simple keyword-based tool selection (in a real implementation, this would use AI)
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('look for')) {
            toolCalls.push({
                name: 'search_knowledge_base',
                params: {
                    query: message.replace(/search|find|look for/gi, '').trim(),
                    limit: 10
                }
            });
        }
        if (lowerMessage.includes('entity') || lowerMessage.includes('details') || lowerMessage.includes('information about')) {
            // Extract entity ID from message (simplified)
            const entityMatch = message.match(/(?:entity|details|information about)\s+(\w+)/i);
            if (entityMatch) {
                toolCalls.push({
                    name: 'get_entity_details',
                    params: {
                        entityId: entityMatch[1],
                        includeRelations: true
                    }
                });
            }
        }
        if (lowerMessage.includes('analyze') || lowerMessage.includes('data') || lowerMessage.includes('file')) {
            toolCalls.push({
                name: 'analyze_data',
                params: {
                    fileId: 'uploaded_file',
                    analysisType: 'json'
                }
            });
        }
        if (lowerMessage.includes('code') || lowerMessage.includes('example') || lowerMessage.includes('generate')) {
            const language = lowerMessage.includes('python') ? 'python' :
                lowerMessage.includes('typescript') ? 'typescript' : 'javascript';
            toolCalls.push({
                name: 'generate_code',
                params: {
                    language,
                    task: message
                }
            });
        }
        return toolCalls;
    }
    generateResponseFromToolResults(message, results) {
        let content = '';
        const suggestions = [];
        for (const result of results) {
            if (result.error) {
                content += `I encountered an error with ${result.name}: ${result.error}\n\n`;
            }
            else {
                switch (result.name) {
                    case 'search_knowledge_base':
                        content += `Here are the search results:\n\n`;
                        if (result.result.results) {
                            result.result.results.forEach((item, index) => {
                                content += `${index + 1}. **${item.title}**\n${item.content}\n\n`;
                            });
                        }
                        suggestions.push('Ask for more details about any result', 'Search for something else');
                        break;
                    case 'get_entity_details':
                        content += `**Entity Details:**\n\n`;
                        if (result.result.entity) {
                            const entity = result.result.entity;
                            content += `**Name:** ${entity.name}\n`;
                            content += `**Type:** ${entity.type}\n`;
                            content += `**Properties:**\n`;
                            Object.entries(entity.properties).forEach(([key, value]) => {
                                content += `- ${key}: ${value}\n`;
                            });
                        }
                        suggestions.push('Ask about related entities', 'Search for similar entities');
                        break;
                    case 'analyze_data':
                        content += `**Data Analysis Results:**\n\n`;
                        if (result.result.analysis) {
                            const analysis = result.result.analysis;
                            content += `**Type:** ${analysis.type}\n`;
                            content += `**Summary:** ${analysis.summary}\n\n`;
                            content += `**Insights:**\n`;
                            analysis.insights.forEach((insight) => {
                                content += `- ${insight}\n`;
                            });
                            content += `\n**Recommendations:**\n`;
                            analysis.recommendations.forEach((rec) => {
                                content += `- ${rec}\n`;
                            });
                        }
                        suggestions.push('Upload more data for analysis', 'Ask for specific insights');
                        break;
                    case 'generate_code':
                        content += `**Generated Code:**\n\n`;
                        if (result.result.code) {
                            content += `\`\`\`${result.result.language}\n${result.result.code}\n\`\`\`\n\n`;
                            content += `**Explanation:** ${result.result.explanation}\n`;
                        }
                        suggestions.push('Generate code in a different language', 'Ask for more examples');
                        break;
                }
            }
        }
        if (!content) {
            content = "I couldn't find any specific tools to help with your request. Let me try to answer your question directly.";
        }
        return {
            content,
            suggestions,
            metadata: {
                toolCalls: results.length,
                timestamp: new Date().toISOString()
            }
        };
    }
    async callMCPServer(request) {
        try {
            const mcpRequest = {
                method: 'chat/completions',
                params: {
                    messages: [
                        { role: 'system', content: 'You are a helpful BrainKB assistant that helps users explore neuroscience knowledge.' },
                        { role: 'user', content: request.message }
                    ],
                    model: this.config.mcp?.model || 'gpt-4',
                    temperature: this.config.mcp?.temperature || 0.7,
                    max_tokens: this.config.mcp?.maxTokens || 1000
                },
                id: Date.now().toString()
            };
            const response = await this.mcpService.sendRequest(mcpRequest);
            return {
                content: response.result?.choices?.[0]?.message?.content || 'I apologize, but I couldn\'t generate a response.',
                suggestions: ['Ask a follow-up question', 'Try a different approach'],
                metadata: {
                    model: this.config.mcp?.model,
                    timestamp: new Date().toISOString()
                }
            };
        }
        catch (error) {
            console.error('MCP server error:', error);
            return this.generateLocalResponse(request);
        }
    }
    generateLocalResponse(request) {
        const message = request.message.toLowerCase();
        const context = request.context?.pageContext;
        let content = '';
        const suggestions = [];
        // Context-aware responses
        if (context?.title) {
            content += `I can help you with **${context.title}**. `;
        }
        if (message.includes('hello') || message.includes('hi')) {
            content += "Hello! I'm your BrainKB Assistant. How can I help you explore neuroscience knowledge today?";
            suggestions.push('Ask about brain regions', 'Search for research data', 'Upload files for analysis');
        }
        else if (message.includes('brain') || message.includes('neural')) {
            content += "I can help you explore brain regions, neural pathways, and neuroscience research. What specific aspect would you like to learn about?";
            suggestions.push('Search for brain regions', 'Explore neural pathways', 'Find research papers');
        }
        else if (message.includes('upload') || message.includes('file')) {
            content += "You can upload files like JSON data, CSV files, or images for analysis. I'll help you process and understand the data.";
            suggestions.push('Upload a JSON file', 'Upload research data', 'Upload brain scan images');
        }
        else if (message.includes('code') || message.includes('api')) {
            content += "I can help you with BrainKB API integration and code examples. What programming language would you prefer?";
            suggestions.push('JavaScript examples', 'Python examples', 'TypeScript examples');
        }
        else if (message.includes('search') || message.includes('find')) {
            content += "I can search the BrainKB knowledge base for specific information. What would you like to search for?";
            suggestions.push('Search for brain regions', 'Find research papers', 'Look for neural pathways');
        }
        else {
            content += "I'm here to help you explore neuroscience knowledge. You can ask me about brain regions, research data, upload files for analysis, or get code examples for BrainKB integration.";
            suggestions.push('Learn about brain regions', 'Upload research data', 'Get code examples');
        }
        return {
            content,
            suggestions,
            metadata: {
                context: context?.title,
                timestamp: new Date().toISOString()
            }
        };
    }
}

// Code Block Component with Syntax Highlighting
const CodeBlock = ({ code, language = 'javascript' }) => {
    const [copied, setCopied] = react.useState(false);
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
        catch (err) {
            console.error('Failed to copy code:', err);
        }
    };
    return (jsxRuntime.jsxs("div", { className: "bg-gray-900 rounded-lg overflow-hidden my-2", children: [jsxRuntime.jsxs("div", { className: "flex items-center justify-between px-4 py-2 bg-gray-800", children: [jsxRuntime.jsx("span", { className: "text-xs text-gray-300 uppercase font-medium", children: language }), jsxRuntime.jsx("button", { onClick: copyToClipboard, className: "flex items-center space-x-1 text-gray-400 hover:text-white transition-colors", children: copied ? (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(Check, { className: "w-3 h-3" }), jsxRuntime.jsx("span", { className: "text-xs", children: "Copied!" })] })) : (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(Copy, { className: "w-3 h-3" }), jsxRuntime.jsx("span", { className: "text-xs", children: "Copy" })] })) })] }), jsxRuntime.jsx("pre", { className: "p-4 overflow-x-auto", children: jsxRuntime.jsx("code", { className: "text-green-400 text-sm", children: code }) })] }));
};
// Markdown Renderer Component
const MarkdownRenderer = ({ content }) => {
    const renderContent = (text) => {
        // Split content into lines for processing
        const lines = text.split('\n');
        const elements = [];
        let inCodeBlock = false;
        let codeBlockContent = [];
        let codeLanguage = '';
        lines.forEach((line, index) => {
            // Handle code blocks
            if (line.startsWith('```')) {
                if (!inCodeBlock) {
                    // Start of code block
                    inCodeBlock = true;
                    codeLanguage = line.slice(3).trim() || 'javascript';
                    codeBlockContent = [];
                }
                else {
                    // End of code block
                    inCodeBlock = false;
                    elements.push(jsxRuntime.jsx(CodeBlock, { code: codeBlockContent.join('\n'), language: codeLanguage }, `code-${index}`));
                }
                return;
            }
            if (inCodeBlock) {
                codeBlockContent.push(line);
                return;
            }
            // Handle inline code
            if (line.includes('`')) {
                const parts = line.split('`');
                const processedParts = parts.map((part, partIndex) => {
                    if (partIndex % 2 === 1) {
                        return jsxRuntime.jsx("code", { className: "bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-xs font-mono", children: part }, partIndex);
                    }
                    return part;
                });
                elements.push(jsxRuntime.jsx("p", { className: "mb-2", children: processedParts }, index));
                return;
            }
            // Handle headers
            if (line.startsWith('#')) {
                const level = line.match(/^#+/)?.[0].length || 1;
                const text = line.replace(/^#+\s*/, '');
                const Tag = `h${Math.min(level, 6)}`;
                elements.push(jsxRuntime.jsx(Tag, { className: `font-bold mb-2 ${level === 1 ? 'text-lg' : level === 2 ? 'text-base' : 'text-sm'}`, children: text }, index));
                return;
            }
            // Handle lists
            if (line.match(/^[\s]*[-*+]\s/)) {
                const text = line.replace(/^[\s]*[-*+]\s/, '');
                elements.push(jsxRuntime.jsxs("li", { className: "ml-4 mb-1", children: ["\u2022 ", text] }, index));
                return;
            }
            // Handle numbered lists
            if (line.match(/^[\s]*\d+\.\s/)) {
                const text = line.replace(/^[\s]*\d+\.\s/, '');
                elements.push(jsxRuntime.jsxs("li", { className: "ml-4 mb-1", children: [index + 1, ". ", text] }, index));
                return;
            }
            // Handle links
            if (line.includes('[') && line.includes('](') && line.includes(')')) {
                const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
                if (linkMatch) {
                    const [, text, url] = linkMatch;
                    const processedLine = line.replace(/\[([^\]]+)\]\(([^)]+)\)/, `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">${text}</a>`);
                    elements.push(jsxRuntime.jsx("p", { className: "mb-2", dangerouslySetInnerHTML: { __html: processedLine } }, index));
                    return;
                }
            }
            // Handle bold and italic
            let processedLine = line;
            processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
            if (processedLine.trim()) {
                elements.push(jsxRuntime.jsx("p", { className: "mb-2", dangerouslySetInnerHTML: { __html: processedLine } }, index));
            }
        });
        return elements;
    };
    return jsxRuntime.jsx("div", { className: "markdown-content", children: renderContent(content) });
};
// File Upload Component
const FileUpload = ({ onFileUpload }) => {
    const fileInputRef = react.useRef(null);
    const [dragActive, setDragActive] = react.useState(false);
    const handleFileSelect = (files) => {
        if (files && files.length > 0) {
            onFileUpload(files[0]);
        }
    };
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        }
        else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileUpload(e.dataTransfer.files[0]);
        }
    };
    return (jsxRuntime.jsx("div", { className: "mb-4", children: jsxRuntime.jsxs("div", { className: `border-2 border-dashed rounded-lg p-4 text-center transition-colors ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`, onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, onClick: () => fileInputRef.current?.click(), children: [jsxRuntime.jsx(Upload, { className: "w-8 h-8 text-gray-400 mx-auto mb-2" }), jsxRuntime.jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Click to upload or drag and drop" }), jsxRuntime.jsx("p", { className: "text-xs text-gray-500", children: "Supports: JSON, CSV, TXT, Images" }), jsxRuntime.jsx("input", { ref: fileInputRef, type: "file", className: "hidden", accept: ".json,.csv,.txt,.png,.jpg,.jpeg,.gif", onChange: (e) => handleFileSelect(e.target.files) })] }) }));
};
// Content Editor Component
const ContentEditor = ({ content, onSave, onCancel, title = "Edit Content" }) => {
    const [editedContent, setEditedContent] = react.useState(content);
    return (jsxRuntime.jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-4 mb-4", children: [jsxRuntime.jsxs("div", { className: "flex items-center justify-between mb-3", children: [jsxRuntime.jsx("h4", { className: "font-semibold text-gray-900", children: title }), jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [jsxRuntime.jsx("button", { onClick: () => onSave(editedContent), className: "px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors", children: "Save" }), jsxRuntime.jsx("button", { onClick: onCancel, className: "px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400 transition-colors", children: "Cancel" })] })] }), jsxRuntime.jsx("textarea", { value: editedContent, onChange: (e) => setEditedContent(e.target.value), className: "w-full h-32 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Edit your content here..." })] }));
};
// BrainKB Logo Component
const BrainKBLogo = ({ className = '' }) => (jsxRuntime.jsx("div", { className: `flex items-center justify-center ${className}`, children: jsxRuntime.jsxs("div", { className: "relative", children: [jsxRuntime.jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg", children: jsxRuntime.jsxs("div", { className: "w-6 h-5 relative", children: [jsxRuntime.jsxs("div", { className: "absolute inset-0 flex", children: [jsxRuntime.jsx("div", { className: "w-3 h-5 bg-white/90 rounded-l-full border-r border-gray-300" }), jsxRuntime.jsx("div", { className: "w-3 h-5 bg-white/90 rounded-r-full border-l border-gray-300" })] }), jsxRuntime.jsx("div", { className: "absolute top-1 left-1 w-1 h-1 bg-gray-400 rounded-full" }), jsxRuntime.jsx("div", { className: "absolute top-1 right-1 w-1 h-1 bg-gray-400 rounded-full" }), jsxRuntime.jsx("div", { className: "absolute top-2 left-2 w-1 h-1 bg-gray-400 rounded-full" }), jsxRuntime.jsx("div", { className: "absolute top-2 right-2 w-1 h-1 bg-gray-400 rounded-full" }), jsxRuntime.jsx("div", { className: "absolute bottom-2 left-2 w-1 h-1 bg-gray-400 rounded-full" }), jsxRuntime.jsx("div", { className: "absolute bottom-2 right-2 w-1 h-1 bg-gray-400 rounded-full" })] }) }), jsxRuntime.jsx("div", { className: "absolute inset-0 bg-blue-400 rounded-lg animate-ping opacity-20" })] }) }));
const BrainKBChatWidget = ({ config = {}, onMessageSend, onResponseReceived, className = '', currentPage, pageContext }) => {
    const [isOpen, setIsOpen] = react.useState(false);
    const [isExpanded, setIsExpanded] = react.useState(false);
    react.useState(false);
    react.useState({ x: 0, y: 0 });
    const [messages, setMessages] = react.useState([
        {
            id: '1',
            type: 'assistant',
            content: "Hello! I'm your BrainKB Assistant. How can I help you explore the knowledge base today? 👋",
            timestamp: new Date(),
            sender: config.branding?.title || 'BrainKB Assistant'
        }
    ]);
    const [inputValue, setInputValue] = react.useState('');
    const [isLoading, setIsLoading] = react.useState(false);
    const [autoDetectedContext, setAutoDetectedContext] = react.useState(null);
    const [showUpload, setShowUpload] = react.useState(false);
    const [editingMessageId, setEditingMessageId] = react.useState(null);
    const [uploadedFiles, setUploadedFiles] = react.useState([]);
    const api = new BrainKBAPI(config);
    // Debug logging
    react.useEffect(() => {
        console.log('BrainKBChatWidget mounted');
        console.log('Config:', config);
        console.log('isOpen:', isOpen);
    }, [config, isOpen]);
    // Auto-detect page content when component mounts or page changes
    react.useEffect(() => {
        if (typeof window !== 'undefined') {
            const detectPageContent = () => {
                const detectedContext = {
                    title: document.title || 'Current Page',
                    description: '',
                    keywords: [],
                    entities: []
                };
                // Try to get meta description
                const metaDescription = document.querySelector('meta[name="description"]');
                if (metaDescription) {
                    detectedContext.description = metaDescription.getAttribute('content') || '';
                }
                // Try to get page heading
                const mainHeading = document.querySelector('h1, h2');
                if (mainHeading && mainHeading.textContent) {
                    detectedContext.title = mainHeading.textContent.trim();
                }
                // Try to get page description from content
                const pageDescription = document.querySelector('p');
                if (pageDescription && pageDescription.textContent) {
                    detectedContext.description = pageDescription.textContent.trim().substring(0, 150) + '...';
                }
                // Extract potential keywords from headings and content
                const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
                const keywords = new Set();
                headings.forEach(heading => {
                    if (heading.textContent) {
                        const words = heading.textContent.toLowerCase().split(/\s+/);
                        words.forEach(word => {
                            if (word.length > 3)
                                keywords.add(word);
                        });
                    }
                });
                detectedContext.keywords = Array.from(keywords).slice(0, 5);
                setAutoDetectedContext(detectedContext);
            };
            // Detect immediately
            detectPageContent();
            // Set up observer for dynamic content changes
            const observer = new MutationObserver(detectPageContent);
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            return () => observer.disconnect();
        }
    }, [currentPage]);
    // Use provided pageContext or auto-detected context
    const effectivePageContext = pageContext || autoDetectedContext;
    // Generate contextual quick actions based on current page
    const generateContextualQuickActions = () => {
        const baseActions = [
            { text: "I have a question", icon: "❓" },
            { text: "Tell me more", icon: "📚" },
            { text: "Upload file", icon: "📁" },
            { text: "Show code example", icon: "💻" }
        ];
        if (effectivePageContext?.title) {
            baseActions.push({
                text: `Tell me about ${effectivePageContext.title}`,
                icon: "📄"
            });
        }
        if (effectivePageContext?.keywords?.length) {
            const mainKeyword = effectivePageContext.keywords[0];
            if (mainKeyword) {
                baseActions.push({
                    text: `Explain ${mainKeyword}`,
                    icon: "🔍"
                });
            }
        }
        if (effectivePageContext?.entities?.length) {
            const mainEntity = effectivePageContext.entities[0];
            if (mainEntity) {
                baseActions.push({
                    text: `Show ${mainEntity} data`,
                    icon: "🧬"
                });
            }
        }
        // Add BrainKB-specific actions
        baseActions.push({ text: "Evidence & Assertions", icon: "🔬" }, { text: "Explore SEE", icon: "🔍" }, { text: "Edit content", icon: "✏️" });
        return baseActions;
    };
    const quickActions = generateContextualQuickActions();
    const handleSendMessage = async () => {
        if (!inputValue.trim())
            return;
        const userMessage = {
            id: Date.now().toString(),
            type: 'user',
            content: inputValue,
            timestamp: new Date(),
            sender: 'You'
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        // Call the callback if provided
        onMessageSend?.(inputValue);
        try {
            const response = await api.sendMessage({
                message: inputValue,
                context: {
                    currentPage: currentPage || window.location.pathname,
                    selectedEntity: effectivePageContext?.entities?.[0],
                    userPreferences: {},
                    pageContext: {
                        title: effectivePageContext?.title,
                        description: effectivePageContext?.description,
                        keywords: effectivePageContext?.keywords,
                        entities: effectivePageContext?.entities
                    }
                }
            });
            const assistantMessage = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: response.content,
                timestamp: new Date(),
                sender: config.branding?.title || 'BrainKB Assistant'
            };
            setMessages(prev => [...prev, assistantMessage]);
            onResponseReceived?.(assistantMessage);
        }
        catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: "Sorry, I encountered an error. Please try again.",
                timestamp: new Date(),
                sender: config.branding?.title || 'BrainKB Assistant'
            };
            setMessages(prev => [...prev, errorMessage]);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleQuickAction = (action) => {
        if (action === "Upload file") {
            setShowUpload(true);
            return;
        }
        if (action === "Show code example") {
            setInputValue("Show me a code example for BrainKB API integration");
            setTimeout(() => {
                handleSendMessage();
            }, 0);
            return;
        }
        if (action === "Edit content") {
            setEditingMessageId(messages[messages.length - 1]?.id || null);
            return;
        }
        setInputValue(action);
        // Use setTimeout to ensure the input value is set before sending
        setTimeout(() => {
            handleSendMessage();
        }, 0);
    };
    const handleFileUpload = async (file) => {
        setUploadedFiles(prev => [...prev, file]);
        // Create a message about the uploaded file
        const uploadMessage = {
            id: Date.now().toString(),
            type: 'user',
            content: `📁 Uploaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
            timestamp: new Date(),
            sender: 'You'
        };
        setMessages(prev => [...prev, uploadMessage]);
        setShowUpload(false);
        // Process the file based on type
        if (file.type === 'application/json') {
            try {
                const text = await file.text();
                const data = JSON.parse(text);
                const analysisMessage = {
                    id: (Date.now() + 1).toString(),
                    type: 'assistant',
                    content: `I've analyzed your JSON file. It contains ${Object.keys(data).length} top-level keys. Here's a summary:\n\n\`\`\`json\n${JSON.stringify(data, null, 2).substring(0, 500)}...\n\`\`\``,
                    timestamp: new Date(),
                    sender: config.branding?.title || 'BrainKB Assistant'
                };
                setMessages(prev => [...prev, analysisMessage]);
            }
            catch (error) {
                const errorMessage = {
                    id: (Date.now() + 1).toString(),
                    type: 'assistant',
                    content: "Sorry, I couldn't parse the JSON file. Please check the format.",
                    timestamp: new Date(),
                    sender: config.branding?.title || 'BrainKB Assistant'
                };
                setMessages(prev => [...prev, errorMessage]);
            }
        }
        else if (file.type.startsWith('image/')) {
            const imageMessage = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: `I can see you've uploaded an image: ${file.name}. I can help you analyze image data or integrate it with BrainKB knowledge base.`,
                timestamp: new Date(),
                sender: config.branding?.title || 'BrainKB Assistant'
            };
            setMessages(prev => [...prev, imageMessage]);
        }
        else {
            const textMessage = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: `I've received your file: ${file.name}. I can help you analyze this data or integrate it with BrainKB.`,
                timestamp: new Date(),
                sender: config.branding?.title || 'BrainKB Assistant'
            };
            setMessages(prev => [...prev, textMessage]);
        }
    };
    const handleEditMessage = (messageId, newContent) => {
        setMessages(prev => prev.map(msg => msg.id === messageId
            ? { ...msg, content: newContent }
            : msg));
        setEditingMessageId(null);
    };
    const getThemeStyles = () => {
        const primaryColor = config.theme?.primaryColor || 'from-blue-600 to-purple-600';
        const secondaryColor = config.theme?.secondaryColor || 'from-blue-700 to-purple-700';
        const backgroundColor = config.theme?.backgroundColor || 'bg-white';
        const textColor = config.theme?.textColor || 'text-gray-800';
        return {
            primaryColor,
            secondaryColor,
            backgroundColor,
            textColor
        };
    };
    const theme = getThemeStyles();
    const position = {
        bottom: config.position?.bottom || 6,
        right: config.position?.right || 6
    };
    // Responsive size configuration
    const getSizeConfig = () => {
        const baseSize = {
            width: config.size?.width || 384,
            height: config.size?.height || 500
        };
        if (isExpanded) {
            return {
                width: Math.min(window.innerWidth - 48, 800), // Max 800px, with 24px margin on each side
                height: Math.min(window.innerHeight - 120, 600) // Max 600px, with 60px margin top/bottom
            };
        }
        return baseSize;
    };
    const size = getSizeConfig();
    // Handle window resize
    react.useEffect(() => {
        const handleResize = () => {
            if (isExpanded) {
                // Recalculate size when window is resized
                setIsExpanded(false);
                setTimeout(() => setIsExpanded(true), 100);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isExpanded]);
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("div", { className: `fixed z-50 ${className}`, style: { bottom: `${position.bottom}rem`, right: `${position.right}rem` }, children: jsxRuntime.jsx("button", { onClick: () => setIsOpen(!isOpen), className: `bg-gradient-to-r ${theme.primaryColor} text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`, children: isOpen ? (jsxRuntime.jsx(X, { className: "w-6 h-6" })) : (jsxRuntime.jsxs("div", { className: "relative", children: [jsxRuntime.jsx(BrainKBLogo, { className: "w-6 h-6" }), jsxRuntime.jsx("div", { className: "absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" })] })) }) }), isOpen && (jsxRuntime.jsxs("div", { className: `fixed ${theme.backgroundColor} rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col transition-all duration-300 ${isExpanded ? 'rounded-none' : ''}`, style: {
                    bottom: `${position.bottom + 6}rem`,
                    right: `${position.right}rem`,
                    width: `${size.width}px`,
                    height: `${size.height}px`,
                    maxWidth: 'calc(100vw - 48px)',
                    maxHeight: 'calc(100vh - 120px)'
                }, children: [jsxRuntime.jsx("div", { className: `bg-gradient-to-r ${theme.primaryColor} text-white p-4 ${isExpanded ? 'rounded-t-none' : 'rounded-t-2xl'} relative`, children: jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [jsxRuntime.jsxs("div", { className: "flex items-center space-x-3", children: [jsxRuntime.jsx(BrainKBLogo, { className: "w-8 h-8" }), jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx("h3", { className: "font-semibold", children: config.branding?.title || 'BrainKB Assistant' }), jsxRuntime.jsx("p", { className: "text-xs text-blue-100", children: config.branding?.subtitle || 'Knowledge Base Helper' })] })] }), jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [jsxRuntime.jsx("button", { onClick: () => setIsExpanded(!isExpanded), className: "text-white hover:text-gray-200 transition-colors p-1 rounded", title: isExpanded ? 'Minimize' : 'Maximize', children: isExpanded ? (jsxRuntime.jsx(Minimize2, { className: "w-4 h-4" })) : (jsxRuntime.jsx(Maximize2, { className: "w-4 h-4" })) }), jsxRuntime.jsx("button", { onClick: () => setIsOpen(false), className: "text-white hover:text-gray-200 transition-colors p-1 rounded", children: jsxRuntime.jsx(X, { className: "w-5 h-5" }) })] })] }) }), effectivePageContext?.title && (jsxRuntime.jsxs("div", { className: "px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200", children: [jsxRuntime.jsxs("div", { className: "flex items-center space-x-2 text-xs", children: [jsxRuntime.jsx(MapPin, { className: "w-3 h-3 text-blue-600" }), jsxRuntime.jsx("span", { className: "text-blue-700 font-medium", children: "Current Page:" }), jsxRuntime.jsx("span", { className: "text-gray-700 truncate", children: effectivePageContext.title })] }), effectivePageContext.description && (jsxRuntime.jsx("p", { className: "text-xs text-gray-600 mt-1 truncate", children: effectivePageContext.description }))] })), jsxRuntime.jsxs("div", { className: "flex-1 overflow-auto p-4 space-y-3", children: [messages.map((message) => (jsxRuntime.jsx("div", { className: `flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`, children: jsxRuntime.jsxs("div", { className: `max-w-xs ${message.type === 'user' ? `bg-gradient-to-r ${theme.primaryColor} text-white` : 'bg-gray-100 text-gray-800'} rounded-lg p-3 text-sm shadow-sm`, children: [message.sender && (jsxRuntime.jsx("div", { className: "flex items-center mb-1", children: message.type === 'assistant' ? (jsxRuntime.jsxs("div", { className: "flex items-center", children: [jsxRuntime.jsx(BrainKBLogo, { className: "w-3 h-3 mr-1" }), jsxRuntime.jsx("span", { className: "text-xs opacity-75", children: message.sender })] })) : (jsxRuntime.jsxs("div", { className: "flex items-center", children: [jsxRuntime.jsx(User, { className: "w-3 h-3 mr-1" }), jsxRuntime.jsx("span", { className: "text-xs opacity-75", children: message.sender })] })) })), jsxRuntime.jsx(MarkdownRenderer, { content: message.content }), message.type === 'user' && (jsxRuntime.jsx("div", { className: "flex justify-end mt-2", children: jsxRuntime.jsx("button", { onClick: () => setEditingMessageId(message.id), className: "text-xs text-gray-500 hover:text-gray-700 transition-colors", children: jsxRuntime.jsx(PenLine, { className: "w-3 h-3" }) }) }))] }) }, message.id))), isLoading && config.features?.enableTypingIndicator !== false && (jsxRuntime.jsx("div", { className: "flex justify-start", children: jsxRuntime.jsx("div", { className: "bg-gray-100 rounded-lg p-3", children: jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [jsxRuntime.jsx("div", { className: "animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600" }), jsxRuntime.jsx("span", { className: "text-xs text-gray-600", children: "Typing..." })] }) }) }))] }), showUpload && (jsxRuntime.jsx(FileUpload, { onFileUpload: handleFileUpload })), editingMessageId && (jsxRuntime.jsx(ContentEditor, { content: messages.find(m => m.id === editingMessageId)?.content || '', onSave: (newContent) => handleEditMessage(editingMessageId, newContent), onCancel: () => setEditingMessageId(null), title: "Edit Message" })), messages.length <= 1 && config.features?.enableQuickActions !== false && (jsxRuntime.jsx("div", { className: "px-4 pb-3", children: jsxRuntime.jsx("div", { className: `grid gap-2 ${isExpanded ? 'grid-cols-4' : 'grid-cols-2'}`, children: quickActions.map((action, index) => (jsxRuntime.jsx("button", { onClick: () => handleQuickAction(action.text), className: "bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-700 text-xs p-2 rounded-lg border border-blue-200 transition-all duration-200 hover:shadow-sm", children: jsxRuntime.jsxs("div", { className: "flex items-center justify-center space-x-1", children: [jsxRuntime.jsx("span", { children: action.icon }), jsxRuntime.jsx("span", { className: "truncate", children: action.text })] }) }, index))) }) })), config.features?.enableContactInfo !== false && (jsxRuntime.jsx("div", { className: "px-4 pb-3", children: jsxRuntime.jsx("div", { className: "bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 border border-green-200", children: jsxRuntime.jsxs("div", { className: "flex items-center justify-between text-xs", children: [jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [jsxRuntime.jsx(Globe, { className: "w-3 h-3 text-green-600" }), jsxRuntime.jsx("span", { className: "text-green-700", children: "beta.brainkb.org" })] }), jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [jsxRuntime.jsx(Mail, { className: "w-3 h-3 text-blue-600" }), jsxRuntime.jsx("span", { className: "text-blue-700", children: "Senseable Intelligence Group" })] })] }) }) })), jsxRuntime.jsx("div", { className: "p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl", children: jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [jsxRuntime.jsx("input", { type: "text", value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleSendMessage(), placeholder: effectivePageContext?.title ?
                                        `Ask about ${effectivePageContext.title} or anything else...` :
                                        "Ask about evidence, genome data, anatomical structures...", className: "flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" }), jsxRuntime.jsx("button", { onClick: handleSendMessage, disabled: !inputValue.trim() || isLoading, className: `px-3 py-2 bg-gradient-to-r ${theme.primaryColor} text-white rounded-lg hover:${theme.secondaryColor} disabled:opacity-50 disabled:cursor-not-allowed transition-all`, children: jsxRuntime.jsx(Send, { className: "w-4 h-4" }) })] }) })] }))] }));
};

class BrainKBSetup {
    constructor(config) {
        this.config = config;
    }
    // Generate installation code for any website
    generateInstallationCode() {
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
    generateReactInstallation() {
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
    generateNextJSInstallation() {
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
    generateWordPressInstallation() {
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
    generateConfig() {
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
    generateInstallationGuide() {
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
    generateOneClickSetup() {
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
const quickSetup = {
    // Vanilla JavaScript/HTML
    vanilla: (config) => {
        const setup = new BrainKBSetup(config);
        return setup.generateInstallationCode();
    },
    // React
    react: (config) => {
        const setup = new BrainKBSetup(config);
        return setup.generateReactInstallation();
    },
    // Next.js
    nextjs: (config) => {
        const setup = new BrainKBSetup(config);
        return setup.generateNextJSInstallation();
    },
    // WordPress
    wordpress: (config) => {
        const setup = new BrainKBSetup(config);
        return setup.generateWordPressInstallation();
    },
    // One-click setup
    oneClick: (config) => {
        const setup = new BrainKBSetup(config);
        return setup.generateOneClickSetup();
    }
};

// Named exports
// Global initialization for CDN usage
if (typeof window !== 'undefined') {
    window.BrainKBAssistant = {
        init: (config) => {
            // This would initialize the assistant globally
            console.log('BrainKB Assistant initialized with config:', config);
        }
    };
}

exports.BrainKBAPI = BrainKBAPI;
exports.BrainKBChatWidget = BrainKBChatWidget;
exports.BrainKBSetup = BrainKBSetup;
exports.MCPService = MCPService;
exports.quickSetup = quickSetup;
//# sourceMappingURL=index.js.map
