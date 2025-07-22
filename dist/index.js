'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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


const BookOpen = createLucideIcon$1("BookOpen", [
  ["path", { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", key: "vv98re" }],
  ["path", { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z", key: "1cyq3y" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const Bot = createLucideIcon$1("Bot", [
  [
    "rect",
    { width: "18", height: "10", x: "3", y: "11", rx: "2", key: "1ofdy3" }
  ],
  ["circle", { cx: "12", cy: "5", r: "2", key: "f1ur92" }],
  ["path", { d: "M12 7v4", key: "xawao1" }],
  ["line", { x1: "8", x2: "8", y1: "16", y2: "16", key: "h6x27f" }],
  ["line", { x1: "16", x2: "16", y1: "16", y2: "16", key: "5lty7f" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const Brain = createLucideIcon$1("Brain", [
  [
    "path",
    {
      d: "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z",
      key: "1mhkh5"
    }
  ],
  [
    "path",
    {
      d: "M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z",
      key: "1d6s00"
    }
  ]
]);

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


const MessageCircle = createLucideIcon$1("MessageCircle", [
  ["path", { d: "m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z", key: "v2veuj" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const MessageSquare = createLucideIcon$1("MessageSquare", [
  [
    "path",
    {
      d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
      key: "1lielz"
    }
  ]
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


const Settings = createLucideIcon$1("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const Star = createLucideIcon$1("Star", [
  [
    "polygon",
    {
      points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
      key: "8f66p6"
    }
  ]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const TrendingUp = createLucideIcon$1("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
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


const Users = createLucideIcon$1("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const X = createLucideIcon$1("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const Zap = createLucideIcon$1("Zap", [
  [
    "polygon",
    { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2", key: "45s27k" }
  ]
]);

// API Service Class
class BrainKBAPIService {
    constructor(config) {
        this.config = config;
    }
    async sendMessage(message, context) {
        const { api } = this.config;
        if (api?.endpoint) {
            return this.sendRESTMessage(message, context);
        }
        // Fallback to local response
        return this.generateLocalResponse(message, context);
    }
    async sendRESTMessage(message, context) {
        try {
            const response = await fetch(this.config.api.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...this.config.api?.headers,
                },
                body: JSON.stringify({
                    message,
                    context,
                    timestamp: new Date().toISOString(),
                }),
            });
            return await response.json();
        }
        catch (error) {
            console.error('REST API Error:', error);
            return this.generateLocalResponse(message, context);
        }
    }
    generateLocalResponse(message, context) {
        // Generate contextual response based on message content
        const responses = {
            greeting: "Hello! I'm your BrainKB Assistant. How can I help you today?",
            question: "I understand your question. Let me help you find the information you need.",
            knowledge: "I can help you explore the knowledge base and find relevant information.",
            default: "I'm here to help! What would you like to know about?"
        };
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return { content: responses.greeting };
        }
        else if (lowerMessage.includes('?')) {
            return { content: responses.question };
        }
        else if (lowerMessage.includes('knowledge') || lowerMessage.includes('data')) {
            return { content: responses.knowledge };
        }
        return { content: responses.default };
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
    return (jsxRuntime.jsxs("div", { className: "bg-gray-900 rounded-lg overflow-hidden my-2 border border-gray-700", children: [jsxRuntime.jsxs("div", { className: "flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700", children: [jsxRuntime.jsx("span", { className: "text-xs text-gray-300 uppercase font-medium", children: language }), jsxRuntime.jsx("button", { onClick: copyToClipboard, className: "flex items-center space-x-1 text-gray-400 hover:text-white transition-colors", children: copied ? (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(Check, { className: "w-3 h-3" }), jsxRuntime.jsx("span", { className: "text-xs", children: "Copied!" })] })) : (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(Copy, { className: "w-3 h-3" }), jsxRuntime.jsx("span", { className: "text-xs", children: "Copy" })] })) })] }), jsxRuntime.jsx("pre", { className: "p-4 overflow-x-auto", children: jsxRuntime.jsx("code", { className: "text-green-400 text-sm font-mono", children: code }) })] }));
};
// Markdown Renderer Component
const MarkdownRenderer = ({ content }) => {
    const renderContent = (text) => {
        const lines = text.split('\n');
        const elements = [];
        let inCodeBlock = false;
        let codeBlockContent = [];
        let codeLanguage = '';
        lines.forEach((line, index) => {
            if (line.startsWith('```')) {
                if (!inCodeBlock) {
                    inCodeBlock = true;
                    codeLanguage = line.slice(3).trim() || 'javascript';
                    codeBlockContent = [];
                }
                else {
                    inCodeBlock = false;
                    elements.push(jsxRuntime.jsx(CodeBlock, { code: codeBlockContent.join('\n'), language: codeLanguage }, `code-${index}`));
                }
                return;
            }
            if (inCodeBlock) {
                codeBlockContent.push(line);
                return;
            }
            // Handle headers
            if (line.startsWith('#')) {
                const level = line.match(/^#+/)?.[0].length || 1;
                const text = line.replace(/^#+\s*/, '');
                const Tag = `h${Math.min(level, 6)}`;
                elements.push(jsxRuntime.jsx(Tag, { className: "font-bold text-gray-900 mb-2", children: text }, index));
                return;
            }
            // Handle bold text
            if (line.includes('**')) {
                const parts = line.split('**');
                const elements2 = [];
                parts.forEach((part, i) => {
                    if (i % 2 === 1) {
                        elements2.push(jsxRuntime.jsx("strong", { className: "font-bold", children: part }, i));
                    }
                    else {
                        elements2.push(part);
                    }
                });
                elements.push(jsxRuntime.jsx("p", { className: "mb-2", children: elements2 }, index));
                return;
            }
            // Handle italic text
            if (line.includes('*') && !line.startsWith('*')) {
                const parts = line.split('*');
                const elements2 = [];
                parts.forEach((part, i) => {
                    if (i % 2 === 1) {
                        elements2.push(jsxRuntime.jsx("em", { className: "italic", children: part }, i));
                    }
                    else {
                        elements2.push(part);
                    }
                });
                elements.push(jsxRuntime.jsx("p", { className: "mb-2", children: elements2 }, index));
                return;
            }
            // Handle links
            if (line.includes('[') && line.includes('](') && line.includes(')')) {
                const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                const parts = line.split(linkRegex);
                const elements2 = [];
                for (let i = 0; i < parts.length; i += 3) {
                    if (parts[i])
                        elements2.push(parts[i]);
                    if (parts[i + 1] && parts[i + 2]) {
                        elements2.push(jsxRuntime.jsx("a", { href: parts[i + 2], className: "text-blue-600 hover:underline", target: "_blank", rel: "noopener noreferrer", children: parts[i + 1] }, i));
                    }
                }
                elements.push(jsxRuntime.jsx("p", { className: "mb-2", children: elements2 }, index));
                return;
            }
            // Handle lists
            if (line.startsWith('- ') || line.startsWith('* ')) {
                elements.push(jsxRuntime.jsxs("li", { className: "ml-4 mb-1", children: ["\u2022 ", line.slice(2)] }, index));
                return;
            }
            // Handle numbered lists
            if (/^\d+\.\s/.test(line)) {
                elements.push(jsxRuntime.jsx("li", { className: "ml-4 mb-1", children: line }, index));
                return;
            }
            // Regular text
            if (line.trim()) {
                elements.push(jsxRuntime.jsx("p", { className: "mb-2", children: line }, index));
            }
        });
        return elements;
    };
    return jsxRuntime.jsx("div", { className: "prose prose-sm max-w-none", children: renderContent(content) });
};
// File Upload Component
const FileUpload = ({ onFileUpload, enabled = true }) => {
    const [isDragOver, setIsDragOver] = react.useState(false);
    const fileInputRef = react.useRef(null);
    if (!enabled)
        return null;
    const handleFileSelect = (files) => {
        if (files && files.length > 0) {
            onFileUpload(files[0]);
        }
    };
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            onFileUpload(files[0]);
        }
    };
    return (jsxRuntime.jsxs("div", { className: `border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`, onDragOver: handleDrag, onDragEnter: (e) => { e.preventDefault(); setIsDragOver(true); }, onDragLeave: (e) => { e.preventDefault(); setIsDragOver(false); }, onDrop: handleDrop, children: [jsxRuntime.jsx(Upload, { className: "w-8 h-8 text-gray-400 mx-auto mb-2" }), jsxRuntime.jsxs("p", { className: "text-sm text-gray-600 mb-2", children: ["Drag and drop files here, or", ' ', jsxRuntime.jsx("button", { onClick: () => fileInputRef.current?.click(), className: "text-blue-600 hover:text-blue-700 underline", children: "browse" })] }), jsxRuntime.jsx("p", { className: "text-xs text-gray-500", children: "Supports: JSON, CSV, TXT, Images (PNG, JPG, GIF)" }), jsxRuntime.jsx("input", { ref: fileInputRef, type: "file", className: "hidden", accept: ".json,.csv,.txt,.png,.jpg,.jpeg,.gif", onChange: (e) => handleFileSelect(e.target.files) })] }));
};
// Content Editor Component
const ContentEditor = ({ content, onSave, onCancel, title = "Edit Content" }) => {
    const [editedContent, setEditedContent] = react.useState(content);
    return (jsxRuntime.jsxs("div", { className: "bg-white rounded-lg shadow-lg p-4 border border-gray-200", children: [jsxRuntime.jsxs("div", { className: "flex items-center justify-between mb-4", children: [jsxRuntime.jsx("h3", { className: "font-semibold text-gray-900", children: title }), jsxRuntime.jsx("button", { onClick: onCancel, className: "text-gray-400 hover:text-gray-600", children: jsxRuntime.jsx(X, { className: "w-5 h-5" }) })] }), jsxRuntime.jsx("textarea", { value: editedContent, onChange: (e) => setEditedContent(e.target.value), className: "w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "Edit your content here..." }), jsxRuntime.jsxs("div", { className: "flex space-x-2 mt-4", children: [jsxRuntime.jsx("button", { onClick: () => onSave(editedContent), className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors", children: "Save" }), jsxRuntime.jsx("button", { onClick: onCancel, className: "px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors", children: "Cancel" })] })] }));
};
// BrainKB Logo Component
const BrainKBLogo = ({ config, className = '' }) => {
    const branding = config?.branding;
    const primaryColor = branding?.primaryColor || 'from-blue-600 to-purple-600';
    const title = branding?.title || 'BrainKB Assistant';
    const subtitle = branding?.subtitle || 'Knowledge Base Helper';
    return (jsxRuntime.jsxs("div", { className: `flex items-center ${className}`, children: [jsxRuntime.jsx("div", { className: `w-8 h-8 bg-gradient-to-br ${primaryColor} rounded-lg flex items-center justify-center mr-3 shadow-lg`, children: jsxRuntime.jsx(Brain, { className: "w-5 h-5 text-white" }) }), jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx("div", { className: "font-bold text-lg text-white", children: title }), jsxRuntime.jsx("div", { className: "text-xs text-purple-100", children: subtitle })] })] }));
};
function BrainKBAssistantWrapper({ config = {}, currentPage, pageContext, isBrainKB = false }) {
    // Default configuration
    const defaultConfig = {
        branding: {
            title: 'BrainKB Assistant',
            subtitle: 'Knowledge Base Helper',
            primaryColor: 'from-purple-600 to-blue-600',
            secondaryColor: 'purple-100',
            accentColor: 'purple-600'
        },
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
        },
        ui: {
            position: 'bottom-right',
            size: {
                width: '600px',
                height: '700px',
                expandedWidth: '1200px',
                expandedHeight: '900px'
            },
            theme: 'light',
            zIndex: 9999
        },
        customization: {
            welcomeMessage: 'Hello and welcome to BrainKB Assistant! 👋',
            placeholderText: 'Ask about Knowledge Graph or anything',
            errorMessage: 'Sorry, I encountered an error. Please try again.',
            loadingMessage: 'Thinking...'
        }
    };
    // Merge configurations
    const mergedConfig = {
        ...defaultConfig,
        ...config,
        branding: { ...defaultConfig.branding, ...config.branding },
        features: { ...defaultConfig.features, ...config.features },
        ui: { ...defaultConfig.ui, ...config.ui },
        customization: { ...defaultConfig.customization, ...config.customization }
    };
    const apiService = new BrainKBAPIService(mergedConfig);
    const [isOpen, setIsOpen] = react.useState(false);
    const [isExpanded, setIsExpanded] = react.useState(false);
    react.useState(false);
    react.useState({ x: 0, y: 0 });
    const [showUpload, setShowUpload] = react.useState(false);
    const [editingMessageId, setEditingMessageId] = react.useState(null);
    const [uploadedFiles, setUploadedFiles] = react.useState([]);
    const [showContext, setShowContext] = react.useState(true);
    const [isTyping, setIsTyping] = react.useState(false);
    const [inputValue, setInputValue] = react.useState('');
    const [contextDetected, setContextDetected] = react.useState(false);
    const [usePageContext, setUsePageContext] = react.useState(null);
    const [messages, setMessages] = react.useState([
        {
            id: '1',
            type: 'assistant',
            content: pageContext && pageContext.title && mergedConfig.features?.enableContextDetection
                ? `${mergedConfig.customization?.welcomeMessage || 'Hello and welcome to BrainKB Assistant! 👋'}\n\nI can see you're on the **${pageContext.title}** page. Would you like me to answer based on the current page content?`
                : mergedConfig.customization?.welcomeMessage || 'Hello and welcome to BrainKB Assistant! 👋',
            timestamp: new Date(),
            sender: mergedConfig.branding?.title || 'BrainKB Assistant'
        }
    ]);
    // Set context detected to true if page context is available
    react.useEffect(() => {
        if (pageContext && pageContext.title && !contextDetected && mergedConfig.features?.enableContextDetection) {
            setContextDetected(true);
        }
    }, [pageContext, contextDetected, mergedConfig.features?.enableContextDetection]);
    const messagesEndRef = react.useRef(null);
    react.useEffect(() => {
        console.log('BrainKBAssistantWrapper mounted with config:', mergedConfig);
    }, [mergedConfig]);
    react.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const generateContextualQuickActions = () => {
        // Use custom quick actions if provided
        if (mergedConfig.quickActions && mergedConfig.quickActions.length > 0) {
            return mergedConfig.quickActions.map(action => ({
                id: action.id,
                label: action.label,
                icon: jsxRuntime.jsx("span", { children: action.icon || '💬' }),
                action: action.action,
                description: action.description
            }));
        }
        // Default quick actions with more options
        const baseActions = [
            {
                id: 'question',
                label: '❓ I have a question',
                icon: jsxRuntime.jsx("span", { children: "\u2753" }),
                action: 'ask_question',
                description: 'Ask any question about the knowledge base'
            },
            {
                id: 'tell_more',
                label: '💡 Tell me more',
                icon: jsxRuntime.jsx("span", { children: "\uD83D\uDCA1" }),
                action: 'tell_more',
                description: 'Get more detailed information'
            },
            {
                id: 'about_knowledge',
                label: '📄 Tell me about Knowledge...',
                icon: jsxRuntime.jsx("span", { children: "\uD83D\uDCC4" }),
                action: 'about_knowledge',
                description: 'Learn about knowledge graphs and concepts'
            },
            {
                id: 'explain_knowledge',
                label: '🔍 Explain knowledge',
                icon: jsxRuntime.jsx("span", { children: "\uD83D\uDD0D" }),
                action: 'explain_knowledge',
                description: 'Get explanations about knowledge concepts'
            },
            {
                id: 'show_entities',
                label: '📈 Show entities data',
                icon: jsxRuntime.jsx("span", { children: "\uD83D\uDCC8" }),
                action: 'show_entities',
                description: 'View entity data and relationships'
            },
            {
                id: 'evidence_assertions',
                label: '📊 Evidence & Assertions',
                icon: jsxRuntime.jsx("span", { children: "\uD83D\uDCCA" }),
                action: 'evidence_assertions',
                description: 'Explore evidence and assertions'
            },
            {
                id: 'explore_wiki',
                label: '🔎 Explore Wiki',
                icon: jsxRuntime.jsx("span", { children: "\uD83D\uDD0E" }),
                action: 'explore_wiki',
                description: 'Browse the knowledge wiki'
            },
            {
                id: 'search_data',
                label: '🔍 Search Data',
                icon: jsxRuntime.jsx("span", { children: "\uD83D\uDD0D" }),
                action: 'search_data',
                description: 'Search through the knowledge base'
            },
            {
                id: 'analyze_patterns',
                label: '📊 Analyze Patterns',
                icon: jsxRuntime.jsx("span", { children: "\uD83D\uDCCA" }),
                action: 'analyze_patterns',
                description: 'Find patterns and trends in data'
            },
            {
                id: 'get_recommendations',
                label: '💡 Get Recommendations',
                icon: jsxRuntime.jsx("span", { children: "\uD83D\uDCA1" }),
                action: 'get_recommendations',
                description: 'Get personalized recommendations'
            },
            {
                id: 'export_data',
                label: '📤 Export Data',
                icon: jsxRuntime.jsx("span", { children: "\uD83D\uDCE4" }),
                action: 'export_data',
                description: 'Export data in various formats'
            },
            {
                id: 'visualize_graph',
                label: '🎨 Visualize Graph',
                icon: jsxRuntime.jsx("span", { children: "\uD83C\uDFA8" }),
                action: 'visualize_graph',
                description: 'Create custom graph visualizations'
            },
            {
                id: 'compare_entities',
                label: '⚖️ Compare Entities',
                icon: jsxRuntime.jsx("span", { children: "\u2696\uFE0F" }),
                action: 'compare_entities',
                description: 'Compare different entities'
            },
            {
                id: 'find_connections',
                label: '�� Find Connections',
                icon: jsxRuntime.jsx("span", { children: "\uD83D\uDD17" }),
                action: 'find_connections',
                description: 'Discover hidden connections'
            },
            {
                id: 'generate_report',
                label: '📋 Generate Report',
                icon: jsxRuntime.jsx("span", { children: "\uD83D\uDCCB" }),
                action: 'generate_report',
                description: 'Generate comprehensive reports'
            }
        ];
        return baseActions;
    };
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
        setIsTyping(true);
        // Call custom callback if provided
        if (mergedConfig.callbacks?.onMessageSend) {
            mergedConfig.callbacks.onMessageSend(inputValue);
        }
        try {
            // Prepare context with chat history and page context
            const contextData = {
                currentPage,
                pageContext: usePageContext ? pageContext : null,
                chatHistory: messages.map(msg => ({
                    role: msg.type === 'user' ? 'user' : 'assistant',
                    content: msg.content,
                    timestamp: msg.timestamp.toISOString()
                })),
                timestamp: new Date().toISOString()
            };
            // Send message to API service with full context
            const response = await apiService.sendMessage(inputValue, contextData);
            const aiResponse = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: response.content || 'I understand your message. How can I help you further?',
                timestamp: new Date(),
                sender: mergedConfig.branding?.title || 'BrainKB Assistant'
            };
            setMessages(prev => [...prev, aiResponse]);
            // Call custom callback if provided
            if (mergedConfig.callbacks?.onResponseReceived) {
                mergedConfig.callbacks.onResponseReceived(response);
            }
        }
        catch (error) {
            console.error('Error sending message:', error);
            const errorResponse = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: mergedConfig.customization?.errorMessage || 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date(),
                sender: mergedConfig.branding?.title || 'BrainKB Assistant'
            };
            setMessages(prev => [...prev, errorResponse]);
            // Call custom callback if provided
            if (mergedConfig.callbacks?.onError) {
                mergedConfig.callbacks.onError(error);
            }
        }
        finally {
            setIsTyping(false);
        }
    };
    const handleQuickAction = (action) => {
        // Call custom callback if provided
        if (mergedConfig.callbacks?.onQuickAction) {
            mergedConfig.callbacks.onQuickAction(action);
        }
        let message = '';
        switch (action) {
            case 'ask_question':
                message = 'I\'m here to help! What questions do you have about the knowledge base?';
                break;
            case 'tell_more':
                message = 'I can provide detailed information about various topics. What would you like to learn more about?';
                break;
            case 'about_knowledge':
                message = 'Knowledge graphs are powerful tools for representing and connecting information. They help us understand relationships between different concepts and entities.';
                break;
            case 'explain_knowledge':
                message = 'Knowledge can be explained in many ways - through data, relationships, patterns, and insights. What specific aspect would you like me to explain?';
                break;
            case 'show_entities':
                message = 'I can show you entity data and relationships. What specific entities or relationships are you interested in?';
                break;
            case 'evidence_assertions':
                message = 'Evidence and assertions are crucial for building reliable knowledge bases. I can help you explore these concepts.';
                break;
            case 'explore_wiki':
                message = 'The knowledge wiki contains a wealth of information. What topic would you like to explore?';
                break;
            case 'search_data':
                message = 'I can help you search through the knowledge base. What specific information are you looking for?';
                break;
            case 'analyze_patterns':
                message = 'I can analyze patterns and trends in your data. What type of analysis would you like to perform?';
                break;
            case 'get_recommendations':
                message = 'I can provide personalized recommendations based on your interests and the knowledge base. What would you like recommendations for?';
                break;
            case 'export_data':
                message = 'I can help you export data in various formats (JSON, CSV, XML). What data would you like to export?';
                break;
            case 'visualize_graph':
                message = 'I can create custom graph visualizations for your data. What type of visualization would you like?';
                break;
            case 'compare_entities':
                message = 'I can help you compare different entities in the knowledge base. Which entities would you like to compare?';
                break;
            case 'find_connections':
                message = 'I can discover hidden connections between entities. What would you like to explore?';
                break;
            case 'generate_report':
                message = 'I can generate comprehensive reports based on your data. What type of report would you like?';
                break;
            default:
                message = `I can help you with "${action}". What specific information are you looking for?`;
        }
        if (message) {
            const aiResponse = {
                id: Date.now().toString(),
                type: 'assistant',
                content: message,
                timestamp: new Date(),
                sender: mergedConfig.branding?.title || 'BrainKB Assistant'
            };
            setMessages(prev => [...prev, aiResponse]);
        }
    };
    const handleFileUpload = async (file) => {
        setShowUpload(false);
        const uploadMessage = {
            id: Date.now().toString(),
            type: 'user',
            content: `📎 Uploaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
            timestamp: new Date(),
            sender: 'You'
        };
        setMessages(prev => [...prev, uploadMessage]);
        setUploadedFiles(prev => [...prev, file]);
        // Call custom callback if provided
        if (mergedConfig.callbacks?.onFileUpload) {
            mergedConfig.callbacks.onFileUpload(file);
        }
        // Simulate processing
        setTimeout(() => {
            const response = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: `I've processed your file **${file.name}**. I can help you analyze its contents and integrate it with the knowledge base. What would you like to do with this data?`,
                timestamp: new Date(),
                sender: mergedConfig.branding?.title || 'BrainKB Assistant'
            };
            setMessages(prev => [...prev, response]);
        }, 2000);
    };
    const handleEditMessage = (messageId, newContent) => {
        setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, content: newContent } : msg));
        setEditingMessageId(null);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const getSizeConfig = () => {
        const size = mergedConfig.ui?.size;
        if (isExpanded) {
            return {
                width: size?.expandedWidth || '800px',
                height: size?.expandedHeight || '600px'
            };
        }
        return {
            width: size?.width || '450px',
            height: size?.height || '550px'
        };
    };
    const sizeConfig = getSizeConfig();
    const position = mergedConfig.ui?.position || 'bottom-right';
    const zIndex = mergedConfig.ui?.zIndex || 9999;
    const getPositionClasses = () => {
        switch (position) {
            case 'bottom-left':
                return 'bottom-6 left-6';
            case 'top-right':
                return 'top-6 right-6';
            case 'top-left':
                return 'top-6 left-6';
            default:
                return 'bottom-6 right-6';
        }
    };
    return (jsxRuntime.jsxs("div", { className: `fixed ${getPositionClasses()} z-[${zIndex}]`, style: {
            width: sizeConfig.width,
            height: isOpen ? sizeConfig.height : 'auto'
        }, children: [isOpen && (jsxRuntime.jsxs("div", { className: "mb-4 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col", style: { height: sizeConfig.height }, children: [jsxRuntime.jsxs("div", { className: `flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r ${mergedConfig.branding?.primaryColor || 'from-purple-600 to-blue-600'} text-white rounded-t-lg`, children: [jsxRuntime.jsx("div", { className: "flex items-center", children: jsxRuntime.jsx(BrainKBLogo, { config: mergedConfig }) }), jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [mergedConfig.features?.enableExpandableWindow && (jsxRuntime.jsx("button", { onClick: () => setIsExpanded(!isExpanded), className: "text-white hover:text-gray-200 transition-colors", title: isExpanded ? "Minimize" : "Maximize", children: isExpanded ? jsxRuntime.jsx(Minimize2, { className: "w-4 h-4" }) : jsxRuntime.jsx(Maximize2, { className: "w-4 h-4" }) })), jsxRuntime.jsx("button", { onClick: () => setIsOpen(false), className: "text-white hover:text-gray-200 transition-colors", children: jsxRuntime.jsx(X, { className: "w-5 h-5" }) })] })] }), showContext && pageContext && mergedConfig.features?.enableContextDetection && (jsxRuntime.jsxs("div", { className: "px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100", children: [jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [jsxRuntime.jsxs("div", { className: "flex items-center text-sm text-blue-800", children: [jsxRuntime.jsx(MapPin, { className: "w-4 h-4 mr-2" }), jsxRuntime.jsx("span", { className: "font-medium", children: "Current Page:" }), jsxRuntime.jsx("span", { className: "ml-1 font-semibold", children: pageContext.title })] }), jsxRuntime.jsx("button", { onClick: () => setShowContext(false), className: "text-blue-600 hover:text-blue-800", children: jsxRuntime.jsx(X, { className: "w-4 h-4" }) })] }), pageContext.description && (jsxRuntime.jsx("p", { className: "text-xs text-blue-700 mt-1", children: pageContext.description }))] })), jsxRuntime.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [messages.map((message) => (jsxRuntime.jsx("div", { className: `flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`, children: jsxRuntime.jsxs("div", { className: "flex items-start space-x-3 max-w-xs", children: [message.type === 'assistant' && (jsxRuntime.jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md", children: jsxRuntime.jsx(Bot, { className: "w-4 h-4 text-white" }) })), jsxRuntime.jsx("div", { className: `px-4 py-3 rounded-lg shadow-sm ${message.type === 'user'
                                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                                                : 'bg-gray-50 text-gray-800 border border-gray-200'}`, children: editingMessageId === message.id ? (jsxRuntime.jsx(ContentEditor, { content: message.content, onSave: (content) => handleEditMessage(message.id, content), onCancel: () => setEditingMessageId(null) })) : (jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx(MarkdownRenderer, { content: message.content }), jsxRuntime.jsxs("div", { className: "flex items-center justify-between mt-3", children: [jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [jsxRuntime.jsx("p", { className: "text-xs opacity-70", children: message.timestamp.toLocaleTimeString() }), message.sender && (jsxRuntime.jsxs("span", { className: "text-xs opacity-70", children: ["\u2022 ", message.sender] }))] }), message.type === 'user' && mergedConfig.features?.enableMessageEditing && (jsxRuntime.jsx("button", { onClick: () => setEditingMessageId(message.id), className: "text-xs opacity-70 hover:opacity-100 transition-opacity", title: "Edit message", children: jsxRuntime.jsx(PenLine, { className: "w-3 h-3" }) }))] })] })) }), message.type === 'user' && (jsxRuntime.jsx("div", { className: "w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 shadow-md", children: jsxRuntime.jsx(User, { className: "w-4 h-4 text-gray-600" }) }))] }) }, message.id))), isTyping && mergedConfig.features?.enableTypingIndicator && (jsxRuntime.jsxs("div", { className: "flex items-start space-x-3", children: [jsxRuntime.jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md", children: jsxRuntime.jsx(Bot, { className: "w-4 h-4 text-white" }) }), jsxRuntime.jsx("div", { className: "bg-gray-50 text-gray-800 px-4 py-3 rounded-lg border border-gray-200", children: jsxRuntime.jsxs("div", { className: "flex space-x-1", children: [jsxRuntime.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce" }), jsxRuntime.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0.1s' } }), jsxRuntime.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0.2s' } })] }) })] })), jsxRuntime.jsx("div", { ref: messagesEndRef })] }), usePageContext === null && contextDetected && (jsxRuntime.jsx("div", { className: "px-4 py-3 border-t border-gray-200 bg-blue-50", children: jsxRuntime.jsxs("div", { className: "flex flex-wrap gap-2", children: [jsxRuntime.jsxs("button", { onClick: () => {
                                        setUsePageContext(true);
                                        const responseMessage = {
                                            id: Date.now().toString(),
                                            type: 'assistant',
                                            content: `Great! I'll answer based on the current page content: **${pageContext?.title}**. You can now ask me questions about this page.`,
                                            timestamp: new Date(),
                                            sender: mergedConfig.branding?.title || 'BrainKB Assistant'
                                        };
                                        setMessages(prev => [...prev, responseMessage]);
                                    }, className: "flex items-center space-x-1 px-3 py-2 text-xs bg-green-100 hover:bg-green-200 text-green-800 rounded-lg border border-green-200 transition-colors shadow-sm", children: [jsxRuntime.jsx("span", { children: "\u2705" }), jsxRuntime.jsx("span", { children: "Yes, use page content" })] }), jsxRuntime.jsxs("button", { onClick: () => {
                                        setUsePageContext(false);
                                        const responseMessage = {
                                            id: Date.now().toString(),
                                            type: 'assistant',
                                            content: "No problem! I'll answer general questions without using the current page content. What would you like to know?",
                                            timestamp: new Date(),
                                            sender: mergedConfig.branding?.title || 'BrainKB Assistant'
                                        };
                                        setMessages(prev => [...prev, responseMessage]);
                                    }, className: "flex items-center space-x-1 px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg border border-gray-200 transition-colors shadow-sm", children: [jsxRuntime.jsx("span", { children: "\u274C" }), jsxRuntime.jsx("span", { children: "No, general questions only" })] })] }) })), mergedConfig.features?.enableQuickActions && usePageContext !== null && (jsxRuntime.jsxs("div", { className: "px-4 py-3 border-t border-gray-200 bg-gray-50", children: [jsxRuntime.jsx("div", { className: "flex flex-wrap gap-2", children: generateContextualQuickActions().map((action) => (jsxRuntime.jsxs("button", { onClick: () => handleQuickAction(action.action), className: "flex items-center space-x-1 px-3 py-2 text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg border border-purple-200 transition-colors shadow-sm", title: action.description, children: [action.icon, jsxRuntime.jsx("span", { children: action.label })] }, action.id))) }), jsxRuntime.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [jsxRuntime.jsxs("button", { className: "flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors", children: [jsxRuntime.jsx(Globe, { className: "w-3 h-3" }), jsxRuntime.jsx("span", { children: "\uD83C\uDF10 beta.brainkb.org" })] }), jsxRuntime.jsxs("button", { className: "flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors", children: [jsxRuntime.jsx(Users, { className: "w-3 h-3" }), jsxRuntime.jsx("span", { children: "\uD83D\uDC65 Sensible Intelligence Group" })] }), jsxRuntime.jsxs("button", { className: "flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors", children: [jsxRuntime.jsx(BookOpen, { className: "w-3 h-3" }), jsxRuntime.jsx("span", { children: "\uD83D\uDCDA Documentation" })] }), jsxRuntime.jsxs("button", { className: "flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors", children: [jsxRuntime.jsx(MessageSquare, { className: "w-3 h-3" }), jsxRuntime.jsx("span", { children: "\uD83D\uDCAC Community Forum" })] }), jsxRuntime.jsxs("button", { className: "flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors", children: [jsxRuntime.jsx(Zap, { className: "w-3 h-3" }), jsxRuntime.jsx("span", { children: "\u26A1 API Reference" })] }), jsxRuntime.jsxs("button", { className: "flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors", children: [jsxRuntime.jsx(Settings, { className: "w-3 h-3" }), jsxRuntime.jsx("span", { children: "\u2699\uFE0F Configuration" })] }), jsxRuntime.jsxs("button", { className: "flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors", children: [jsxRuntime.jsx(Star, { className: "w-3 h-3" }), jsxRuntime.jsx("span", { children: "\u2B50 GitHub" })] }), jsxRuntime.jsxs("button", { className: "flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors", children: [jsxRuntime.jsx(TrendingUp, { className: "w-3 h-3" }), jsxRuntime.jsx("span", { children: "\uD83D\uDCC8 Analytics" })] })] })] })), showUpload && mergedConfig.features?.enableFileUpload && (jsxRuntime.jsxs("div", { className: "px-4 py-3 border-t border-gray-200 bg-gray-50", children: [jsxRuntime.jsxs("div", { className: "flex items-center justify-between mb-2", children: [jsxRuntime.jsx("h4", { className: "text-sm font-medium text-gray-700", children: "Upload File" }), jsxRuntime.jsx("button", { onClick: () => setShowUpload(false), className: "text-gray-400 hover:text-gray-600", children: jsxRuntime.jsx(X, { className: "w-4 h-4" }) })] }), jsxRuntime.jsx(FileUpload, { onFileUpload: handleFileUpload, enabled: mergedConfig.features?.enableFileUpload })] })), jsxRuntime.jsx("div", { className: "p-4 border-t border-gray-200 bg-white", children: jsxRuntime.jsxs("div", { className: "flex space-x-2", children: [mergedConfig.features?.enableFileUpload && (jsxRuntime.jsx("button", { onClick: () => setShowUpload(!showUpload), className: "px-3 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors border border-gray-300", title: "Upload file", children: jsxRuntime.jsx(Upload, { className: "w-4 h-4" }) })), jsxRuntime.jsx("input", { type: "text", value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyPress: mergedConfig.features?.enableKeyboardShortcuts ? handleKeyPress : undefined, placeholder: mergedConfig.customization?.placeholderText || 'Ask about Knowledge Graph or anything', className: "flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" }), jsxRuntime.jsx("button", { onClick: handleSendMessage, className: "px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md", children: jsxRuntime.jsx(Send, { className: "w-4 h-4" }) })] }) })] })), jsxRuntime.jsx("button", { className: `bg-gradient-to-r ${mergedConfig.branding?.primaryColor || 'from-blue-600 to-purple-600'} text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`, onClick: () => setIsOpen(!isOpen), children: isOpen ? (jsxRuntime.jsx(X, { className: "w-6 h-6" })) : (jsxRuntime.jsx(MessageCircle, { className: "w-6 h-6" })) })] }));
}

const BrainKBAssistant = ({ config = {}, currentPage, pageContext }) => {
    return (jsxRuntime.jsx(BrainKBAssistantWrapper, { config: config, currentPage: currentPage, pageContext: pageContext }));
};

// Global initialization for CDN usage
if (typeof window !== 'undefined') {
    window.BrainKBAssistant = {
        init: (config) => {
            // This would initialize the assistant globally for static HTML
            console.log('BrainKB Assistant initialized with config:', config);
            // Create a container and render the component
            const container = document.createElement('div');
            container.id = 'brainkb-assistant-container';
            document.body.appendChild(container);
            // Note: In a real implementation, you'd need to render the React component here
            // This is a simplified version for demonstration
        }
    };
}

exports.BrainKBAssistantWrapper = BrainKBAssistantWrapper;
exports.default = BrainKBAssistant;
//# sourceMappingURL=index.js.map
