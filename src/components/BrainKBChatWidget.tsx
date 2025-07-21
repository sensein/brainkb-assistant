'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Phone, Mail, Globe, ArrowRight, User, Bot, MapPin, FileText, Search, Maximize2, Minimize2, Move, Upload, Edit3, Code, File, Image, Download, Copy, Check } from 'lucide-react';
import { ChatMessage, QuickAction, BrainKBConfig } from '../types';
import { BrainKBAPI } from '../utils/api';

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

// Code Block Component with Syntax Highlighting
const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = 'javascript' }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden my-2">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <span className="text-xs text-gray-300 uppercase font-medium">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-green-400 text-sm">{code}</code>
      </pre>
    </div>
  );
};

// Markdown Renderer Component
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const renderContent = (text: string) => {
    // Split content into lines for processing
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];

    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeLanguage = '';

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim() || 'javascript';
          codeBlockContent = [];
        } else {
          // End of code block
          inCodeBlock = false;
          elements.push(
            <CodeBlock 
              key={`code-${index}`} 
              code={codeBlockContent.join('\n')} 
              language={codeLanguage}
            />
          );
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
            return <code key={partIndex} className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-xs font-mono">{part}</code>;
          }
          return part;
        });
        elements.push(<p key={index} className="mb-2">{processedParts}</p>);
        return;
      }

      // Handle headers
      if (line.startsWith('#')) {
        const level = line.match(/^#+/)?.[0].length || 1;
        const text = line.replace(/^#+\s*/, '');
        const Tag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;
        elements.push(
          <Tag key={index} className={`font-bold mb-2 ${level === 1 ? 'text-lg' : level === 2 ? 'text-base' : 'text-sm'}`}>
            {text}
          </Tag>
        );
        return;
      }

      // Handle lists
      if (line.match(/^[\s]*[-*+]\s/)) {
        const text = line.replace(/^[\s]*[-*+]\s/, '');
        elements.push(
          <li key={index} className="ml-4 mb-1">• {text}</li>
        );
        return;
      }

      // Handle numbered lists
      if (line.match(/^[\s]*\d+\.\s/)) {
        const text = line.replace(/^[\s]*\d+\.\s/, '');
        elements.push(
          <li key={index} className="ml-4 mb-1">{index + 1}. {text}</li>
        );
        return;
      }

      // Handle links
      if (line.includes('[') && line.includes('](') && line.includes(')')) {
        const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const [, text, url] = linkMatch;
          const processedLine = line.replace(/\[([^\]]+)\]\(([^)]+)\)/, `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">${text}</a>`);
          elements.push(<p key={index} className="mb-2" dangerouslySetInnerHTML={{ __html: processedLine }} />);
          return;
        }
      }

      // Handle bold and italic
      let processedLine = line;
      processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      if (processedLine.trim()) {
        elements.push(<p key={index} className="mb-2" dangerouslySetInnerHTML={{ __html: processedLine }} />);
      }
    });

    return elements;
  };

  return <div className="markdown-content">{renderContent(content)}</div>;
};

// File Upload Component
const FileUpload: React.FC<{ onFileUpload: (file: File) => void }> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="mb-4">
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
        <p className="text-xs text-gray-500">Supports: JSON, CSV, TXT, Images</p>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".json,.csv,.txt,.png,.jpg,.jpeg,.gif"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>
    </div>
  );
};

// Content Editor Component
const ContentEditor: React.FC<{ 
  content: string; 
  onSave: (content: string) => void; 
  onCancel: () => void;
  title?: string;
}> = ({ content, onSave, onCancel, title = "Edit Content" }) => {
  const [editedContent, setEditedContent] = useState(content);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSave(editedContent)}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="w-full h-32 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Edit your content here..."
      />
    </div>
  );
};

// BrainKB Logo Component
const BrainKBLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="relative">
      {/* Brain Icon */}
      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
        <div className="w-6 h-5 relative">
          {/* Brain hemispheres */}
          <div className="absolute inset-0 flex">
            {/* Left hemisphere */}
            <div className="w-3 h-5 bg-white/90 rounded-l-full border-r border-gray-300"></div>
            {/* Right hemisphere */}
            <div className="w-3 h-5 bg-white/90 rounded-r-full border-l border-gray-300"></div>
          </div>
          {/* Brain folds */}
          <div className="absolute top-1 left-1 w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="absolute top-1 right-1 w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="absolute top-2 left-2 w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="absolute top-2 right-2 w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="absolute bottom-2 right-2 w-1 h-1 bg-gray-400 rounded-full"></div>
        </div>
      </div>
      {/* Animated pulse effect */}
      <div className="absolute inset-0 bg-blue-400 rounded-lg animate-ping opacity-20"></div>
    </div>
  </div>
);

export const BrainKBChatWidget: React.FC<BrainKBChatWidgetProps> = ({
  config = {},
  onMessageSend,
  onResponseReceived,
  className = '',
  currentPage,
  pageContext
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your BrainKB Assistant. How can I help you explore the knowledge base today? 👋",
      timestamp: new Date(),
      sender: config.branding?.title || 'BrainKB Assistant'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autoDetectedContext, setAutoDetectedContext] = useState<{
    title?: string;
    description?: string;
    keywords?: string[];
    entities?: string[];
  } | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const api = new BrainKBAPI(config);

  // Debug logging
  useEffect(() => {
    console.log('BrainKBChatWidget mounted');
    console.log('Config:', config);
    console.log('isOpen:', isOpen);
  }, [config, isOpen]);

  // Auto-detect page content when component mounts or page changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const detectPageContent = () => {
        const detectedContext: {
          title: string;
          description: string;
          keywords: string[];
          entities: string[];
        } = {
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
        const keywords = new Set<string>();
        headings.forEach(heading => {
          if (heading.textContent) {
            const words = heading.textContent.toLowerCase().split(/\s+/);
            words.forEach(word => {
              if (word.length > 3) keywords.add(word);
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
  const generateContextualQuickActions = (): QuickAction[] => {
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
    baseActions.push(
      { text: "Evidence & Assertions", icon: "🔬" },
      { text: "Explore SEE", icon: "🔍" },
      { text: "Edit content", icon: "✏️" }
    );

    return baseActions;
  };

  const quickActions = generateContextualQuickActions();

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
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

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        sender: config.branding?.title || 'BrainKB Assistant'
      };

      setMessages(prev => [...prev, assistantMessage]);
      onResponseReceived?.(assistantMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
        sender: config.branding?.title || 'BrainKB Assistant'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    if (action === "Upload file") {
      setShowUpload(true);
      return;
    }
    
    if (action === "Show code example") {
      const codeExample = `// Example BrainKB API call
const response = await fetch('/api/brainkb/assertions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: 'brain regions',
    limit: 10
  })
});

const data = await response.json();
console.log('BrainKB data:', data);`;
      
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

  const handleFileUpload = async (file: File) => {
    setUploadedFiles(prev => [...prev, file]);
    
    // Create a message about the uploaded file
    const uploadMessage: ChatMessage = {
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
        const analysisMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: `I've analyzed your JSON file. It contains ${Object.keys(data).length} top-level keys. Here's a summary:\n\n\`\`\`json\n${JSON.stringify(data, null, 2).substring(0, 500)}...\n\`\`\``,
          timestamp: new Date(),
          sender: config.branding?.title || 'BrainKB Assistant'
        };
        setMessages(prev => [...prev, analysisMessage]);
      } catch (error) {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: "Sorry, I couldn't parse the JSON file. Please check the format.",
          timestamp: new Date(),
          sender: config.branding?.title || 'BrainKB Assistant'
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } else if (file.type.startsWith('image/')) {
      const imageMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I can see you've uploaded an image: ${file.name}. I can help you analyze image data or integrate it with BrainKB knowledge base.`,
        timestamp: new Date(),
        sender: config.branding?.title || 'BrainKB Assistant'
      };
      setMessages(prev => [...prev, imageMessage]);
    } else {
      const textMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I've received your file: ${file.name}. I can help you analyze this data or integrate it with BrainKB.`,
        timestamp: new Date(),
        sender: config.branding?.title || 'BrainKB Assistant'
      };
      setMessages(prev => [...prev, textMessage]);
    }
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, content: newContent }
        : msg
    ));
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
  useEffect(() => {
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

  return (
    <>
      {/* Floating Chat Button */}
      <div 
        className={`fixed z-50 ${className}`}
        style={{ bottom: `${position.bottom}rem`, right: `${position.right}rem` }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-gradient-to-r ${theme.primaryColor} text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <BrainKBLogo className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </button>
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div 
          className={`fixed ${theme.backgroundColor} rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col transition-all duration-300 ${
            isExpanded ? 'rounded-none' : ''
          }`}
          style={{ 
            bottom: `${position.bottom + 6}rem`, 
            right: `${position.right}rem`,
            width: `${size.width}px`,
            height: `${size.height}px`,
            maxWidth: 'calc(100vw - 48px)',
            maxHeight: 'calc(100vh - 120px)'
          }}
        >
          {/* Header with Controls */}
          <div className={`bg-gradient-to-r ${theme.primaryColor} text-white p-4 ${isExpanded ? 'rounded-t-none' : 'rounded-t-2xl'} relative`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BrainKBLogo className="w-8 h-8" />
                <div>
                  <h3 className="font-semibold">{config.branding?.title || 'BrainKB Assistant'}</h3>
                  <p className="text-xs text-blue-100">{config.branding?.subtitle || 'Knowledge Base Helper'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {/* Size Toggle Button */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-white hover:text-gray-200 transition-colors p-1 rounded"
                  title={isExpanded ? 'Minimize' : 'Maximize'}
                >
                  {isExpanded ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors p-1 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Current Page Context */}
          {effectivePageContext?.title && (
            <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
              <div className="flex items-center space-x-2 text-xs">
                <MapPin className="w-3 h-3 text-blue-600" />
                <span className="text-blue-700 font-medium">Current Page:</span>
                <span className="text-gray-700 truncate">{effectivePageContext.title}</span>
              </div>
              {effectivePageContext.description && (
                <p className="text-xs text-gray-600 mt-1 truncate">{effectivePageContext.description}</p>
              )}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs ${message.type === 'user' ? `bg-gradient-to-r ${theme.primaryColor} text-white` : 'bg-gray-100 text-gray-800'} rounded-lg p-3 text-sm shadow-sm`}>
                  {message.sender && (
                    <div className="flex items-center mb-1">
                      {message.type === 'assistant' ? (
                        <div className="flex items-center">
                          <BrainKBLogo className="w-3 h-3 mr-1" />
                          <span className="text-xs opacity-75">{message.sender}</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          <span className="text-xs opacity-75">{message.sender}</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Render markdown content */}
                  <MarkdownRenderer content={message.content} />
                  
                  {/* Edit button for user messages */}
                  {message.type === 'user' && (
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => setEditingMessageId(message.id)}
                        className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && config.features?.enableTypingIndicator !== false && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                    <span className="text-xs text-gray-600">Typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* File Upload Section */}
          {showUpload && (
            <FileUpload onFileUpload={handleFileUpload} />
          )}

          {/* Content Editor */}
          {editingMessageId && (
            <ContentEditor
              content={messages.find(m => m.id === editingMessageId)?.content || ''}
              onSave={(newContent) => handleEditMessage(editingMessageId, newContent)}
              onCancel={() => setEditingMessageId(null)}
              title="Edit Message"
            />
          )}

          {/* Quick Actions */}
          {messages.length <= 1 && config.features?.enableQuickActions !== false && (
            <div className="px-4 pb-3">
              <div className={`grid gap-2 ${isExpanded ? 'grid-cols-4' : 'grid-cols-2'}`}>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.text)}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-700 text-xs p-2 rounded-lg border border-blue-200 transition-all duration-200 hover:shadow-sm"
                  >
                    <div className="flex items-center justify-center space-x-1">
                      <span>{action.icon}</span>
                      <span className="truncate">{action.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contact Info */}
          {config.features?.enableContactInfo !== false && (
            <div className="px-4 pb-3">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 border border-green-200">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-3 h-3 text-green-600" />
                    <span className="text-green-700">beta.brainkb.org</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3 h-3 text-blue-600" />
                    <span className="text-blue-700">Senseable Intelligence Group</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={effectivePageContext?.title ? 
                  `Ask about ${effectivePageContext.title} or anything else...` : 
                  "Ask about evidence, genome data, anatomical structures..."
                }
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={`px-3 py-2 bg-gradient-to-r ${theme.primaryColor} text-white rounded-lg hover:${theme.secondaryColor} disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 