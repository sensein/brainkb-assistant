'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Phone, Mail, Globe, ArrowRight, User, Bot, MapPin, FileText, Search, Maximize2, Minimize2, Move, Upload, Edit3, Code, File, Image, Download, Copy, Check, Brain, Settings, MessageSquare, Zap, Lightbulb, Database, Network, BarChart3, ChevronDown, ChevronUp, Star, BookOpen, Target, TrendingUp, Users } from 'lucide-react';
import '../styles/brainkb-assistant.css';

// Configuration Types
export interface BrainKBConfig {
  // Branding
  branding?: {
    title?: string;
    subtitle?: string;
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
  };
  
  // Features
  features?: {
    enableQuickActions?: boolean;
    enableFileUpload?: boolean;
    enableMessageEditing?: boolean;
    enableCodeRendering?: boolean;
    enableMarkdown?: boolean;
    enableContextDetection?: boolean;
    enableTypingIndicator?: boolean;
    enableExpandableWindow?: boolean;
    enableDragAndDrop?: boolean;
    enableKeyboardShortcuts?: boolean;
  };
  
  // API Configuration
  api?: {
    endpoint?: string;
    type?: 'rest' | 'websocket';
    headers?: Record<string, string>;
    timeout?: number;
    retryAttempts?: number;
  };
  
  // UI Configuration
  ui?: {
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    size?: {
      width?: string;
      height?: string;
      expandedWidth?: string;
      expandedHeight?: string;
    };
    theme?: 'light' | 'dark' | 'auto';
    language?: string;
    zIndex?: number;
    // Enhanced styling options
    styling?: {
      buttonColor?: string;
      buttonHoverColor?: string;
      chatBackground?: string;
      textColor?: string;
      borderColor?: string;
      shadowColor?: string;
      // Force positioning to override site CSS
      forcePosition?: boolean;
      // Custom CSS classes
      customClasses?: {
        container?: string;
        button?: string;
        chat?: string;
        header?: string;
      };
    };
  };
  
  // Quick Actions
  quickActions?: Array<{
    id: string;
    label: string;
    icon?: string;
    action: string;
    description?: string;
    url?: string; // New field for external links
    external?: boolean; // Whether to open in new tab
  }>;
  
  // Context Detection
  contextDetection?: {
    enabled?: boolean;
    selectors?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
    autoDetect?: boolean;
  };
  
  // Customization
  customization?: {
    welcomeMessage?: string;
    placeholderText?: string;
    errorMessage?: string;
    loadingMessage?: string;
  };
  
  // Callbacks
  callbacks?: {
    onMessageSend?: (message: string) => void;
    onResponseReceived?: (response: any) => void;
    onError?: (error: any) => void;
    onFileUpload?: (file: File) => void;
    onQuickAction?: (action: string) => void;
  };
}

interface BrainKBAssistantWrapperProps {
  config?: BrainKBConfig;
  currentPage?: string;
  pageContext?: {
    title?: string;
    description?: string;
    keywords?: string[];
    entities?: string[];
  };
  isBrainKB?: boolean;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sender?: string;
  isEditing?: boolean;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: string;
  description?: string;
  url?: string; // New field for external links
  external?: boolean; // Whether to open in new tab
}

// API Service Class
// Create a persistent API service instance
let apiServiceInstance: BrainKBAPIService | null = null;

class BrainKBAPIService {
  private config: BrainKBConfig;
  private sessionId: string | null = null;

  constructor(config: BrainKBConfig) {
    this.config = config;
  }

  async sendMessage(message: string, context?: any): Promise<any> {
    const { api } = this.config;
    
    if (api?.endpoint) {
      return this.sendRESTMessage(message, context);
    }
    
    // Fallback to local response
    return this.generateLocalResponse(message, context);
  }

  private async sendRESTMessage(message: string, context?: any): Promise<any> {
    try {
      const requestBody = {
        message,
        session_id: this.sessionId, // Include session ID
        currentPage: context?.currentPage,
        pageContext: context?.pageContext,
        pageContent: context?.pageContent,
        selectedPageContent: context?.selectedPageContent,
        chatHistory: context?.chatHistory,
        timestamp: new Date().toISOString(),
      };

      console.log('📤 Sending request to API:', {
        endpoint: this.config.api!.endpoint,
        sessionId: this.sessionId,
        messageLength: message.length,
        hasContext: !!context
      });

      const response = await fetch(this.config.api!.endpoint!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.config.api?.headers,
        },
        body: JSON.stringify(requestBody),
      });
      
      const responseData = await response.json();
      
      // Store session ID from response for future requests
      if (responseData.session_id) {
        this.sessionId = responseData.session_id;
        console.log('🔗 Session ID received and stored:', this.sessionId);
      }
      
      return responseData;
    } catch (error) {
      console.error('REST API Error:', error);
      return this.generateLocalResponse(message, context);
    }
  }

  private generateLocalResponse(message: string, context?: any): any {
    // Generate contextual response based on message content and page context
    const responses = {
      greeting: "Hello! I'm your BrainKB Assistant. How can I help you today?",
      question: "I understand your question. Let me help you find the information you need.",
      knowledge: "I can help you explore the knowledge base and find relevant information.",
      default: "I'm here to help! What would you like to know about?"
    };

    const lowerMessage = message.toLowerCase();
    
    // If selected page content is available, provide more contextual response
    if (context?.selectedPageContent) {
      const selectedContent = context.selectedPageContent;
      
      return {
        content: `I can see you've selected specific content from the page (${selectedContent.length} characters). I can help you analyze this content and answer questions about it. What would you like to know about the selected text?`
      };
    }
    
    // If page content is available, provide more contextual response
    if (context?.pageContent) {
      const pageContent = context.pageContent;
      const pageContext = context.pageContext;
      
      return {
        content: `I can see you're on the ${pageContext?.title || 'current page'}. I have access to the page content and can help you with questions about what's displayed here. What would you like to know about this page?`
      };
    }
    
    // If page context is available but no content
    if (context?.pageContext) {
      return {
        content: `I can help you with questions about ${context.pageContext.title || 'this page'}. What would you like to know?`
      };
    }

    // Default responses based on message content
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return { content: responses.greeting };
    } else if (lowerMessage.includes('?')) {
      return { content: responses.question };
    } else if (lowerMessage.includes('knowledge') || lowerMessage.includes('data')) {
      return { content: responses.knowledge };
    }
    
    return { content: responses.default };
  }
}

// Code Block Component with Syntax Highlighting
const CodeBlock: React.FC<{ code: string; language?: string; isExpanded?: boolean }> = ({ code, language = 'javascript', isExpanded = false }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 my-2" style={{ 
      maxWidth: '100%',
      width: '100%'
    }}>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-xs font-medium text-gray-300 uppercase">{language}</span>
        <button
          onClick={copyToClipboard}
          className="text-xs text-gray-400 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          Copy
        </button>
      </div>
      <pre 
        className="p-4 overflow-x-auto" 
        style={{ 
          fontSize: isExpanded ? '14px' : '13px', 
          lineHeight: isExpanded ? '1.5' : '1.4',
          maxWidth: '100%',
          width: '100%',
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
        }}
      >
        <code className="text-gray-100" style={{ 
          wordWrap: 'break-word', 
          overflowWrap: 'break-word',
          width: '100%'
        }}>{code}</code>
      </pre>
    </div>
  );
};

// Markdown Renderer Component
const MarkdownRenderer: React.FC<{ content: string; isExpanded?: boolean }> = ({ content, isExpanded = false }) => {
  const renderContent = (text: string) => {
    // Split by code blocks first
    const parts = text.split(/(```[\s\S]*?```)/);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        // Extract language and code
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        if (match) {
          const language = match[1] || 'text';
          const code = match[2];
          
          return (
            <CodeBlock 
              key={index} 
              code={code} 
              language={language} 
              isExpanded={isExpanded}
            />
          );
        }
      }
      
      // Regular text with markdown
      return (
        <div 
          key={index} 
          className="prose prose-sm max-w-none"
          style={{ 
            fontSize: isExpanded ? '16px' : '14px', 
            lineHeight: isExpanded ? '1.6' : '1.5',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            maxWidth: '100%',
            width: '100%',
            whiteSpace: 'pre-wrap'
          }}
          dangerouslySetInnerHTML={{ 
            __html: text
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
              .replace(/\n/g, '<br>')
          }} 
        />
      );
    });
  };

  return (
    <div 
      className="prose prose-sm max-w-none" 
      style={{ 
        wordWrap: 'break-word', 
        overflowWrap: 'break-word',
        maxWidth: '100%',
        width: '100%'
      }}
    >
      {renderContent(content)}
    </div>
  );
};

// File Renderer Component
const FileRenderer: React.FC<{ file: File; content: string }> = ({ file, content }) => {
  const getLanguage = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'json': return 'json';
      case 'jsonld': return 'json';
      case 'ttl': return 'turtle';
      case 'csv': return 'csv';
      case 'txt': return 'text';
      default: return 'text';
    }
  };

  const formatContent = (content: string, filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    
    if (ext === 'json' || ext === 'jsonld') {
      try {
        return JSON.stringify(JSON.parse(content), null, 2);
      } catch {
        return content;
      }
    }
    
    if (ext === 'csv') {
      return content;
    }
    
    if (ext === 'ttl') {
      return content;
    }
    
    return content;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Upload className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">{file.name}</span>
          <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
        </div>
      </div>
      <CodeBlock 
        code={formatContent(content, file.name)} 
        language={getLanguage(file.name)} 
      />
    </div>
  );
};

// File Upload Component
const FileUpload: React.FC<{ onFileUpload: (file: File) => void; enabled?: boolean }> = ({ onFileUpload, enabled = true }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!enabled) return null;

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragOver={handleDrag}
      onDragEnter={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }}
      onDrop={handleDrop}
    >
      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
      <p className="text-sm text-gray-600 mb-2">
        Drag and drop files here, or{' '}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-blue-600 hover:text-blue-700 underline"
        >
          browse
        </button>
      </p>
      <p className="text-xs text-gray-500">
        Supports: JSON, JSON-LD, TTL, CSV, TXT, Images (PNG, JPG, GIF)
      </p>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".json,.jsonld,.ttl,.csv,.txt,.png,.jpg,.jpeg,.gif"
        onChange={(e) => handleFileSelect(e.target.files)}
      />
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
    <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Edit your content here..."
      />
      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => onSave(editedContent)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Context Detection Prompt Component
const ContextDetectionPrompt: React.FC<{
  pageContext: any;
  onUseContext: () => void;
  onSkipContext: () => void;
  branding?: any;
}> = ({ pageContext, onUseContext, onSkipContext, branding }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 mb-4">
      <div className="flex items-center space-x-3 mb-3">
        <div 
          className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
        >
          <MapPin className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-700">
          Would you like me to answer based on the current page content?
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onUseContext}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Check className="w-4 h-4" />
          <span>Yes, use page content</span>
        </button>
        <button
          onClick={onSkipContext}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
          title="No, skip context"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// BrainKB Logo Component
const BrainKBLogo: React.FC<{ config?: BrainKBConfig; className?: string }> = ({ config, className = '' }) => {
  const branding = config?.branding;
  const primaryColor = branding?.primaryColor || 'from-blue-600 to-purple-600';
  const title = branding?.title || 'BrainKB Assistant';
  const subtitle = branding?.subtitle || 'Knowledge Base Helper';

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`w-8 h-8 bg-gradient-to-br ${primaryColor} rounded-lg flex items-center justify-center mr-3 shadow-lg`}>
        <Brain className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="font-bold text-lg text-white">{title}</div>
        <div className="text-xs text-purple-100">{subtitle}</div>
      </div>
    </div>
  );
};

export default function BrainKBAssistantWrapper({ 
  config = {},
  currentPage, 
  pageContext,
  isBrainKB = false
}: BrainKBAssistantWrapperProps) {
  // Default configuration
  const defaultConfig: BrainKBConfig = {
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
      zIndex: 999999,
      styling: {
        buttonColor: 'from-blue-600 to-purple-600',
        buttonHoverColor: 'from-blue-700 to-purple-700',
        chatBackground: 'bg-white',
        textColor: 'text-gray-800',
        borderColor: 'border-gray-200',
        shadowColor: 'shadow-lg',
        forcePosition: false,
        customClasses: {
          container: 'fixed',
          button: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110',
          chat: 'mb-4 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col',
          header: 'flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg'
        }
      }
    },
    customization: {
      welcomeMessage: 'Hello and welcome to BrainKB Assistant! 👋',
      placeholderText: 'Ask about Knowledge Graph or anything',
      errorMessage: 'Sorry, I encountered an error. Please try again.',
      loadingMessage: 'Thinking...'
    }
  };

  // Merge configurations
  const mergedConfig: BrainKBConfig = {
    ...defaultConfig,
    ...config,
    branding: { ...defaultConfig.branding, ...config.branding },
    features: { ...defaultConfig.features, ...config.features },
    ui: { ...defaultConfig.ui, ...config.ui },
    customization: { ...defaultConfig.customization, ...config.customization }
  };

  // Initialize the API service instance if it's not already set
  if (!apiServiceInstance) {
    apiServiceInstance = new BrainKBAPIService(mergedConfig);
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showUpload, setShowUpload] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showContext, setShowContext] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  
  const [inputValue, setInputValue] = useState('');
  const [contextDetected, setContextDetected] = useState(false);
  const [usePageContext, setUsePageContext] = useState<boolean | null>(null);

  // State for selected page content
  const [selectedPageContent, setSelectedPageContent] = useState<string>('');
  const [showContentSelector, setShowContentSelector] = useState(false);

  // Track current page for navigation detection
  const [currentPageUrl, setCurrentPageUrl] = React.useState<string>('');
  const [lastPageContext, setLastPageContext] = React.useState<any>(null);

  // Detect page navigation
  React.useEffect(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== currentPageUrl) {
      setCurrentPageUrl(currentUrl);
      
      // If user navigated to a different page, reset context detection
      if (usePageContext !== null && lastPageContext !== pageContext) {
        setUsePageContext(null);
        setContextDetected(false);
        setLastPageContext(pageContext);
      }
    }
  }, [currentPageUrl, usePageContext, pageContext, lastPageContext]);

  // Detect page context on mount and page changes
  React.useEffect(() => {
    if (pageContext && mergedConfig.features?.enableContextDetection && !contextDetected) {
      setContextDetected(true);
      setLastPageContext(pageContext);
    }
  }, [pageContext, mergedConfig.features?.enableContextDetection, contextDetected]);

  // Initialize messages with welcome message
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: pageContext && pageContext.title && mergedConfig.features?.enableContextDetection
                ? `${mergedConfig.customization?.welcomeMessage || 'Hello and welcome to BrainKB Assistant! 👋'}\n\nWould you like me to answer based on the current page content?`
        : mergedConfig.customization?.welcomeMessage || 'Hello and welcome to BrainKB Assistant! 👋',
      timestamp: new Date(),
      sender: mergedConfig.branding?.title || 'BrainKB Assistant'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('BrainKBAssistantWrapper mounted with config:', mergedConfig);
  }, [mergedConfig]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateContextualQuickActions = (): QuickAction[] => {
    // Use custom quick actions if provided
    if (mergedConfig.quickActions && mergedConfig.quickActions.length > 0) {
      return mergedConfig.quickActions.map(action => ({
        id: action.id,
        label: action.label,
        icon: <span>{action.icon || '💬'}</span>,
        action: action.action,
        description: action.description,
        url: action.url,
        external: action.external
      }));
    }

    // Only show default actions if no custom actions are provided
    const baseActions: QuickAction[] = [
      {
        id: 'question',
        label: '❓ I have a question',
        icon: <span>❓</span>,
        action: 'ask_question',
        description: 'Ask any question about the knowledge base'
      },
      {
        id: 'tell_more',
        label: '💡 Tell me more',
        icon: <span>💡</span>,
        action: 'tell_more',
        description: 'Get more detailed information'
      },
      {
        id: 'about_knowledge',
        label: '📄 Tell me about Knowledge...',
        icon: <span>📄</span>,
        action: 'about_knowledge',
        description: 'Learn about knowledge graphs and concepts'
      },
      {
        id: 'explain_knowledge',
        label: '🔍 Explain knowledge',
        icon: <span>🔍</span>,
        action: 'explain_knowledge',
        description: 'Get explanations about knowledge concepts'
      },
      {
        id: 'show_entities',
        label: '📈 Show entities data',
        icon: <span>📈</span>,
        action: 'show_entities',
        description: 'View entity data and relationships'
      },
      {
        id: 'evidence_assertions',
        label: '📊 Evidence & Assertions',
        icon: <span>📊</span>,
        action: 'evidence_assertions',
        description: 'Explore evidence and assertions'
      },
      {
        id: 'explore_wiki',
        label: '🔎 Explore Wiki',
        icon: <span>🔎</span>,
        action: 'explore_wiki',
        description: 'Browse the knowledge wiki'
      },
      {
        id: 'search_data',
        label: '🔍 Search Data',
        icon: <span>🔍</span>,
        action: 'search_data',
        description: 'Search through the knowledge base'
      },
      {
        id: 'analyze_patterns',
        label: '📊 Analyze Patterns',
        icon: <span>📊</span>,
        action: 'analyze_patterns',
        description: 'Find patterns and trends in data'
      },
      {
        id: 'get_recommendations',
        label: '💡 Get Recommendations',
        icon: <span>💡</span>,
        action: 'get_recommendations',
        description: 'Get personalized recommendations'
      },
      {
        id: 'export_data',
        label: '📤 Export Data',
        icon: <span>📤</span>,
        action: 'export_data',
        description: 'Export data in various formats'
      },
      {
        id: 'visualize_graph',
        label: '🎨 Visualize Graph',
        icon: <span>🎨</span>,
        action: 'visualize_graph',
        description: 'Create custom graph visualizations'
      },
      {
        id: 'compare_entities',
        label: '⚖️ Compare Entities',
        icon: <span>⚖️</span>,
        action: 'compare_entities',
        description: 'Compare different entities'
      },
      {
        id: 'find_connections',
        label: '🔗 Find Connections',
        icon: <span>🔗</span>,
        action: 'find_connections',
        description: 'Discover hidden connections'
      },
      {
        id: 'generate_report',
        label: '📋 Generate Report',
        icon: <span>📋</span>,
        action: 'generate_report',
        description: 'Generate comprehensive reports'
      }
    ];

    return baseActions;
  };

  // Function to read current page content
  const getCurrentPageContent = (): string => {
    if (typeof window === 'undefined') return '';
    
    try {
      console.log('🔍 Starting page content extraction...');
      
      // Get the main content areas
      const contentSelectors = [
        'main',
        'article',
        '.content',
        '.main-content',
        '#content',
        '#main',
        '.container',
        'body'
      ];
      
      let pageContent = '';
      
      // Try to find content in order of preference
      for (const selector of contentSelectors) {
        const element = document.querySelector(selector);
        if (element && element.textContent) {
          // Clean up the text content
          const text = element.textContent
            .replace(/\s+/g, ' ')
            .replace(/\n+/g, '\n')
            .trim();
          
          console.log(`🔍 Checking selector '${selector}':`, {
            found: !!element,
            textLength: text.length,
            preview: text.substring(0, 100) + '...'
          });
          
          if (text.length > 100) { // Only use if there's substantial content
            pageContent = text;
            console.log(`✅ Using content from '${selector}' (${text.length} chars)`);
            break;
          }
        }
      }
      
      // If no substantial content found, get the page title and meta description
      if (!pageContent) {
        const title = document.title || '';
        const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        pageContent = `${title}\n${metaDescription}`.trim();
        console.log('📄 Using fallback content (title + meta):', pageContent);
      }
      
      console.log('📄 Final page content length:', pageContent.length);
      return pageContent;
    } catch (error) {
      console.error('❌ Error reading page content:', error);
      return '';
    }
  };

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
    setIsTyping(true);

    // Call custom callback if provided
    if (mergedConfig.callbacks?.onMessageSend) {
      mergedConfig.callbacks.onMessageSend(inputValue);
    }

    // Check if the message contains JSON-like content and format it
    const formattedContent = formatMessageContent(inputValue);
    
    // Update the message with formatted content if needed
    if (formattedContent !== inputValue) {
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id 
          ? { ...msg, content: formattedContent }
          : msg
      ));
    }

    try {
      // Get current page content if context is enabled
      const currentPageContent = usePageContext ? getCurrentPageContent() : '';
      
      // Log the page content for debugging
      console.log('🔍 Page Context Enabled:', usePageContext);
      console.log('📄 Page Content Length:', currentPageContent.length);
      console.log('📄 Page Content Preview:', currentPageContent.substring(0, 200) + '...');
      
      // Prepare context with chat history and page context
      const contextData = {
        currentPage,
        pageContext: usePageContext ? pageContext : null,
        pageContent: currentPageContent, // Add actual page content
        selectedPageContent: selectedPageContent, // Add selected page content
        chatHistory: messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content,
          timestamp: msg.timestamp.toISOString()
        })),
        timestamp: new Date().toISOString()
      };

      console.log('📤 Sending context data:', {
        hasPageContent: !!contextData.pageContent,
        pageContentLength: contextData.pageContent?.length || 0,
        hasSelectedContent: !!contextData.selectedPageContent,
        selectedContentLength: contextData.selectedPageContent?.length || 0,
        pageContext: contextData.pageContext,
        currentPage: contextData.currentPage
      });

      // Send message to API service with full context
      const response = await apiServiceInstance!.sendMessage(inputValue, contextData);

      const aiResponse: ChatMessage = {
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
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorResponse: ChatMessage = {
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
    } finally {
      setIsTyping(false);
    }
  };

  // Function to format message content and preserve structure for all types
  const formatMessageContent = (content: string): string => {
    const trimmed = content.trim();
    
    // If content is already formatted with code blocks, return as is
    if (content.includes('```')) {
      return content;
    }
    
    // Don't auto-format natural language messages - return as plain text
    const naturalLanguagePatterns = [
      /^(get|give|show|tell|find|search|analyze|explain|help|what|how|why|when|where|who|which)/i,
      /\b(me|you|this|that|the|a|an|is|are|was|were|will|can|could|should|would)\b/i,
      /\b(page|data|dataset|information|content|text|file|document)\b/i
    ];
    
    // If the message looks like natural language, don't format it as code
    const isNaturalLanguage = naturalLanguagePatterns.some(pattern => pattern.test(trimmed));
    if (isNaturalLanguage && !trimmed.includes('{') && !trimmed.includes('[') && !trimmed.includes('<')) {
      return content; // Return as plain text
    }
    
    // Only apply code formatting for actual code patterns
    // Check for JSON objects/arrays
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || 
        (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      try {
        const parsed = JSON.parse(trimmed);
        const formatted = JSON.stringify(parsed, null, 2);
        return `\`\`\`json\n${formatted}\n\`\`\``;
      } catch {
        // If parsing fails, it's not valid JSON, continue to other checks
      }
    }
    
    // Check for XML/HTML content
    if (trimmed.startsWith('<') && trimmed.includes('>')) {
      return `\`\`\`xml\n${trimmed}\n\`\`\``;
    }
    
    // Check for SQL queries - more specific patterns
    if ((trimmed.toLowerCase().includes('select') && trimmed.toLowerCase().includes('from')) || 
        (trimmed.toLowerCase().includes('insert') && trimmed.toLowerCase().includes('into')) || 
        (trimmed.toLowerCase().includes('update') && trimmed.toLowerCase().includes('set')) ||
        (trimmed.toLowerCase().includes('delete') && trimmed.toLowerCase().includes('from')) ||
        (trimmed.toLowerCase().includes('create') && trimmed.toLowerCase().includes('table')) ||
        (trimmed.toLowerCase().includes('drop') && trimmed.toLowerCase().includes('table'))) {
      return `\`\`\`sql\n${trimmed}\n\`\`\``;
    }
    
    // Check for JavaScript/TypeScript code - more specific patterns
    if ((trimmed.includes('function') && trimmed.includes('(')) || 
        (trimmed.includes('const ') && trimmed.includes('=')) || 
        (trimmed.includes('let ') && trimmed.includes('=')) || 
        (trimmed.includes('var ') && trimmed.includes('=')) ||
        (trimmed.includes('=>') && trimmed.includes('(')) ||
        (trimmed.includes('import ') && trimmed.includes('from')) ||
        (trimmed.includes('export ') && (trimmed.includes('default') || trimmed.includes('{'))) ||
        (trimmed.includes('console.log(') && trimmed.includes(')'))) {
      return `\`\`\`javascript\n${trimmed}\n\`\`\``;
    }
    
    // Check for Python code - more specific patterns
    if ((trimmed.includes('def ') && trimmed.includes(':')) || 
        (trimmed.includes('import ') && !trimmed.includes(' ')) ||
        (trimmed.includes('from ') && trimmed.includes(' import ')) ||
        (trimmed.includes('class ') && trimmed.includes(':')) ||
        trimmed.includes('if __name__') ||
        (trimmed.includes('print(') && trimmed.includes(')'))) {
      return `\`\`\`python\n${trimmed}\n\`\`\``;
    }
    
    // Check for CSS
    if (trimmed.includes('{') && trimmed.includes('}') && 
        (trimmed.includes(':') || trimmed.includes(';'))) {
      return `\`\`\`css\n${trimmed}\n\`\`\``;
    }
    
    // Check for YAML
    if (trimmed.includes(':') && !trimmed.includes('{') && !trimmed.includes('}')) {
      const lines = trimmed.split('\n');
      if (lines.some(line => line.includes(':') && !line.includes('='))) {
        return `\`\`\`yaml\n${trimmed}\n\`\`\``;
      }
    }
    
    // Check for shell commands
    if (trimmed.startsWith('$') || 
        trimmed.startsWith('npm ') || 
        trimmed.startsWith('yarn ') ||
        trimmed.startsWith('git ') ||
        trimmed.startsWith('cd ') ||
        trimmed.startsWith('ls ') ||
        trimmed.startsWith('cat ') ||
        trimmed.startsWith('echo ')) {
      return `\`\`\`bash\n${trimmed}\n\`\`\``;
    }
    
    // Check for URLs
    if (trimmed.match(/^https?:\/\/.+/)) {
      return `\`\`\`url\n${trimmed}\n\`\`\``;
    }
    
    // Check for file paths
    if (trimmed.includes('/') && (trimmed.includes('.js') || 
        trimmed.includes('.ts') || 
        trimmed.includes('.json') || 
        trimmed.includes('.css') || 
        trimmed.includes('.html'))) {
      return `\`\`\`file\n${trimmed}\n\`\`\``;
    }
    
    // Check for structured data with multiple lines
    if (trimmed.includes('\n') && trimmed.length > 100) {
      // If it's multi-line and looks like structured data, format as text
      return `\`\`\`text\n${trimmed}\n\`\`\``;
    }
    
    // Check for JSON-like strings within the content
    const jsonPattern = /\{[^{}]*\}|\[[\[\]]*\]/g;
    const matches = content.match(jsonPattern);
    
    if (matches) {
      let formattedContent = content;
      matches.forEach(match => {
        try {
          const parsed = JSON.parse(match);
          const formatted = JSON.stringify(parsed, null, 2);
          formattedContent = formattedContent.replace(match, `\`\`\`json\n${formatted}\n\`\`\``);
        } catch {
          // Keep original if parsing fails
        }
      });
      return formattedContent;
    }
    
    // Return as plain text if no code patterns detected
    return content;
  };

  const handleQuickAction = (action: string, url?: string, external?: boolean) => {
    // Call custom callback if provided
    if (mergedConfig.callbacks?.onQuickAction) {
      mergedConfig.callbacks.onQuickAction(action);
    }

    // Handle external links
    if (url) {
      if (external) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = url;
      }
      return;
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
      const aiResponse: ChatMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: message,
        timestamp: new Date(),
        sender: mergedConfig.branding?.title || 'BrainKB Assistant'
      };
      setMessages(prev => [...prev, aiResponse]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setShowUpload(false);
    
    const uploadMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: `📎 Uploaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
      timestamp: new Date(),
      sender: 'You'
    };
    
    setMessages(prev => [...prev, uploadMessage]);
    setUploadedFiles(prev => [...prev, file]);
    
    // Read file content
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      
      // Format content based on file type
      const ext = file.name.split('.').pop()?.toLowerCase();
      let formattedContent = content;
      let language = ext || 'text';
      
      // Determine language and format content
      switch (ext) {
        case 'json':
        case 'jsonld':
          try {
            const parsed = JSON.parse(content);
            formattedContent = JSON.stringify(parsed, null, 2);
            language = 'json';
          } catch {
            // Keep original if parsing fails
          }
          break;
        case 'xml':
        case 'html':
          language = 'xml';
          break;
        case 'sql':
          language = 'sql';
          break;
        case 'py':
          language = 'python';
          break;
        case 'js':
        case 'ts':
        case 'jsx':
        case 'tsx':
          language = 'javascript';
          break;
        case 'css':
        case 'scss':
        case 'sass':
          language = 'css';
          break;
        case 'yaml':
        case 'yml':
          language = 'yaml';
          break;
        case 'md':
        case 'markdown':
          language = 'markdown';
          break;
        case 'txt':
          language = 'text';
          break;
        case 'csv':
          language = 'csv';
          break;
        case 'ttl':
          language = 'turtle';
          break;
        case 'sh':
        case 'bash':
          language = 'bash';
          break;
        default:
          // Try to detect language from content
          if (content.includes('<?xml') || content.includes('<html')) {
            language = 'xml';
          } else if (content.includes('function') || content.includes('const ')) {
            language = 'javascript';
          } else if (content.includes('def ') || content.includes('import ')) {
            language = 'python';
          } else if (content.includes('SELECT') || content.includes('INSERT')) {
            language = 'sql';
          } else if (content.includes('{') && content.includes('}') && content.includes(':')) {
            language = 'json';
          }
          break;
      }
      
      // Add file content message with proper code block
      const fileContentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'user',
        content: `File content:\n\`\`\`${language}\n${formattedContent}\n\`\`\``,
        timestamp: new Date(),
        sender: 'You'
      };
      
      setMessages(prev => [...prev, fileContentMessage]);
      
      // Call custom callback if provided
      if (mergedConfig.callbacks?.onFileUpload) {
        mergedConfig.callbacks.onFileUpload(file);
      }
      
      // Simulate processing
      setTimeout(() => {
        const response: ChatMessage = {
          id: (Date.now() + 2).toString(),
          type: 'assistant',
          content: `I've processed your file **${file.name}**. I can help you analyze its contents and integrate it with the knowledge base. What would you like to do with this data?`,
          timestamp: new Date(),
          sender: mergedConfig.branding?.title || 'BrainKB Assistant'
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    };
    
    reader.readAsText(file);
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, content: newContent } : msg
    ));
    setEditingMessageId(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Add keyboard shortcuts for expanded mode
  useEffect(() => {
    const handleGlobalKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded && isOpen) {
        e.preventDefault();
        handleToggleExpanded();
      }
    };

    if (isExpanded && isOpen) {
      document.addEventListener('keydown', handleGlobalKeyPress);
      return () => document.removeEventListener('keydown', handleGlobalKeyPress);
    }
  }, [isExpanded, isOpen]);

  const getSizeConfig = () => {
    const size = mergedConfig.ui?.size;
    if (isExpanded) {
      return {
        width: size?.expandedWidth || '90vw',
        height: size?.expandedHeight || '80vh'
      };
    }
    return {
      width: size?.width || '450px',
      height: size?.height || '550px'
    };
  };

  const sizeConfig = getSizeConfig();
  const position = mergedConfig.ui?.position || 'bottom-right';
  const zIndex = mergedConfig.ui?.zIndex || 999999; // Much higher z-index for visibility
  const styling = mergedConfig.ui?.styling || {};

  const getPositionClasses = () => {
    // Always default to bottom-right for better visibility
    const finalPosition = mergedConfig.ui?.styling?.forcePosition ? position : 'bottom-right';
    
    // When expanded, center the window and ensure it's fully visible
    if (isExpanded) {
      return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    }
    
    switch (finalPosition) {
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

  // Store the original position when expanding
  const [originalPosition, setOriginalPosition] = useState<string>('bottom-right');
  const [originalSize, setOriginalSize] = useState({ width: '450px', height: '550px' });

  // Handle expand/minimize with position preservation
  const handleToggleExpanded = () => {
    if (!isExpanded) {
      // Store current position and size before expanding
      setOriginalPosition(position || 'bottom-right');
      setOriginalSize({
        width: sizeConfig.width,
        height: sizeConfig.height
      });
    }
    setIsExpanded(!isExpanded);
  };

  // Enhanced styling with fallbacks
  const getButtonStyles = () => {
    const buttonColor = styling.buttonColor || 'from-blue-600 to-purple-600';
    const buttonHoverColor = styling.buttonHoverColor || 'from-blue-700 to-purple-700';
    
    return {
      background: `linear-gradient(to right, var(--tw-gradient-stops))`,
      '--tw-gradient-from': buttonColor.includes('from-') ? 
        `var(--${buttonColor.split('-')[1]}-600)` : '#2563eb',
      '--tw-gradient-to': buttonColor.includes('to-') ? 
        `var(--${buttonColor.split('-')[1]}-600)` : '#7c3aed',
    };
  };

  // Function to capture selected text from page
  const captureSelectedText = () => {
    if (typeof window === 'undefined') return;
    
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const selectedText = selection.toString().trim();
      setSelectedPageContent(selectedText);
      
      // Add the selected content as a user message
      const contentMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: `📄 **Selected Page Content:**\n\`\`\`text\n${selectedText}\n\`\`\``,
        timestamp: new Date(),
        sender: 'You'
      };
      
      setMessages(prev => [...prev, contentMessage]);
      
      // Clear the selection
      selection.removeAllRanges();
      
      // Show success message
      const successMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `✅ **Content Captured!** I've captured ${selectedText.length} characters from your selection. You can now ask specific questions about this content!`,
        timestamp: new Date(),
        sender: mergedConfig.branding?.title || 'BrainKB Assistant'
      };
      
      setMessages(prev => [...prev, successMessage]);
      
      console.log('📄 Captured selected text:', {
        length: selectedText.length,
        preview: selectedText.substring(0, 100) + '...'
      });
    } else {
      // Show instruction message
      const instructionMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `📝 **How to select page content:**\n\n1. **Select text** on this page by clicking and dragging\n2. **Click the 📄 button** below\n3. **Ask questions** about the selected content\n\nTry selecting some text from this page first!`,
        timestamp: new Date(),
        sender: mergedConfig.branding?.title || 'BrainKB Assistant'
      };
      
      setMessages(prev => [...prev, instructionMessage]);
    }
  };

  // Function to show current page content in chat
  const showCurrentPageContent = () => {
    const currentContent = getCurrentPageContent();
    
    if (currentContent && currentContent.length > 50) {
      const contentMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `📄 **Current Page Content (${currentContent.length} characters):**\n\`\`\`text\n${currentContent.substring(0, 500)}${currentContent.length > 500 ? '\n... (truncated)' : ''}\n\`\`\``,
        timestamp: new Date(),
        sender: mergedConfig.branding?.title || 'BrainKB Assistant'
      };
      
      setMessages(prev => [...prev, contentMessage]);
      
      const followUpMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `✅ I've read the current page content. You can now ask questions about this page, or use the 📄 button to select specific content if you need more precise analysis.`,
        timestamp: new Date(),
        sender: mergedConfig.branding?.title || 'BrainKB Assistant'
      };
      
      setMessages(prev => [...prev, followUpMessage]);
    } else {
      const noContentMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `⚠️ **Limited Page Content Detected**\n\nI couldn't find substantial content on this page. Please:\n\n1. **Use the 📄 button** to manually select specific text\n2. **Or tell me** what you'd like to know about\n\nThis will help me provide better answers!`,
        timestamp: new Date(),
        sender: mergedConfig.branding?.title || 'BrainKB Assistant'
      };
      
      setMessages(prev => [...prev, noContentMessage]);
    }
  };

  const handleUseContext = () => {
    setUsePageContext(true);
    setContextDetected(true);
    showCurrentPageContent(); // Show the current page content in chat
  };

  return (
    <div 
      className={`brainkb-assistant-container ${getPositionClasses()} ${styling.customClasses?.container || ''}`}
      style={{
        zIndex: zIndex,
        position: 'fixed',
        transition: 'all 0.3s ease-in-out',
        ...(isExpanded ? {
          // When expanded, ensure it's centered and fully visible
          top: '2vh',
          left: '2vw',
          right: '2vw',
          bottom: '2vh',
          width: '96vw',
          height: '96vh',
          transform: 'none',
          maxWidth: '96vw',
          maxHeight: '96vh'
        } : {
          // Normal positioning - use stored original position
          width: sizeConfig.width,
          height: isOpen ? sizeConfig.height : 'auto',
          bottom: originalPosition.includes('bottom') ? '24px' : 'auto',
          right: originalPosition.includes('right') ? '24px' : 'auto',
          left: originalPosition.includes('left') ? '24px' : 'auto',
          top: originalPosition.includes('top') ? '24px' : 'auto',
        })
      }}
    >
      {/* Chat Window */}
      {isOpen && (
        <div className={`brainkb-assistant-chat mb-4 ${styling.chatBackground || 'bg-white'} rounded-lg ${styling.shadowColor || 'shadow-xl'} ${styling.borderColor || 'border border-gray-200'} flex flex-col ${styling.customClasses?.chat || ''}`} style={{ 
          height: isExpanded ? 'calc(90vh - 120px)' : sizeConfig.height,
          maxHeight: isExpanded ? 'calc(90vh - 120px)' : sizeConfig.height,
          overflow: 'hidden'
        }}>
          {/* Fallback Close Button for Expanded Mode */}
          {isExpanded && (
            <button
              onClick={handleToggleExpanded}
              className="absolute top-4 right-4 z-20 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
              title="Minimize Assistant"
              style={{ minWidth: '40px', minHeight: '40px' }}
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          )}
          {/* Header */}
          <div className={`brainkb-assistant-header flex items-center justify-between p-4 border-b ${styling.borderColor || 'border-gray-200'} bg-gradient-to-r ${mergedConfig.branding?.primaryColor || 'from-purple-600 to-blue-600'} text-white rounded-t-lg ${styling.customClasses?.header || ''}`} style={{ position: 'sticky', top: 0, zIndex: 10 }}>
            <div className="flex items-center">
              <BrainKBLogo config={mergedConfig} />
            </div>
            <div className="flex items-center space-x-2">
              {mergedConfig.features?.enableExpandableWindow && (
                <button
                  onClick={handleToggleExpanded}
                  className="text-white hover:text-gray-200 transition-colors p-2 rounded hover:bg-white hover:bg-opacity-20"
                  title={isExpanded ? "Minimize" : "Maximize"}
                  style={{ minWidth: '32px', minHeight: '32px' }}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors p-2 rounded hover:bg-white hover:bg-opacity-20"
                style={{ minWidth: '32px', minHeight: '32px' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ 
            fontSize: isExpanded ? '16px' : '14px', 
            lineHeight: '1.5',
            maxWidth: '100%',
            width: '100%',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            minHeight: 0,
            flex: 1
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{ width: '100%' }}
              >
                <div className="flex items-start space-x-3" style={{ 
                  maxWidth: isExpanded ? 'calc(100% - 120px)' : 'calc(100% - 16px)', 
                  minWidth: '0',
                  width: '100%',
                  paddingRight: isExpanded ? '32px' : '0',
                  paddingLeft: isExpanded ? '32px' : '0',
                  flexDirection: message.type === 'user' ? 'row-reverse' : 'row'
                }}>
                  {message.type === 'assistant' && (
                    <div 
                      style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {message.type === 'user' && (
                    <div 
                      style={{
                        width: '32px',
                        height: '32px',
                        background: '#d1d5db',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                  <div
                    style={{
                      padding: isExpanded ? '16px 20px' : '12px 16px',
                      borderRadius: '8px',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                      maxWidth: isExpanded ? 'calc(100% - 200px)' : 'calc(100% - 48px)',
                      minWidth: '0',
                      width: '100%',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      fontSize: isExpanded ? '16px' : '14px',
                      lineHeight: isExpanded ? '1.6' : '1.5',
                      whiteSpace: 'pre-wrap',
                      ...(message.type === 'user'
                        ? {
                            background: '#f9fafb',
                            color: '#374151',
                            border: '1px solid #e5e7eb'
                          }
                        : {
                            background: '#f9fafb',
                            color: '#374151',
                            border: '1px solid #e5e7eb'
                          })
                    }}
                  >
                    {editingMessageId === message.id ? (
                      <ContentEditor
                        content={message.content}
                        onSave={(content) => handleEditMessage(message.id, content)}
                        onCancel={() => setEditingMessageId(null)}
                      />
                    ) : (
                      <div style={{ 
                        wordWrap: 'break-word', 
                        overflowWrap: 'break-word',
                        maxWidth: '100%',
                        width: '100%'
                      }}>
                        <MarkdownRenderer content={message.content} isExpanded={isExpanded} />
                        <div className="flex items-center justify-between mt-3" style={{ flexWrap: 'wrap', gap: '4px' }}>
                          <div className="flex items-center space-x-2" style={{ flexWrap: 'wrap' }}>
                            <p className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                            {message.sender && (
                              <span className="text-xs opacity-70">• {message.sender}</span>
                            )}
                          </div>
                          {message.type === 'user' && mergedConfig.features?.enableMessageEditing && (
                            <button
                              onClick={() => setEditingMessageId(message.id)}
                              className="text-xs opacity-70 hover:opacity-100 transition-opacity"
                              title="Edit message"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && mergedConfig.features?.enableTypingIndicator && (
              <div className="flex items-start space-x-3">
                <div 
                  style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-50 text-gray-800 px-4 py-3 rounded-lg border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Context Detection Prompt */}
            {contextDetected && usePageContext === null && pageContext && mergedConfig.features?.enableContextDetection && (
              <ContextDetectionPrompt
                pageContext={pageContext}
                onUseContext={handleUseContext}
                onSkipContext={() => {
                  setUsePageContext(false);
                  const responseMessage: ChatMessage = {
                    id: Date.now().toString(),
                    type: 'assistant',
                    content: "Got it! I'll answer general questions without using the current page context. Feel free to ask me anything!",
                    timestamp: new Date(),
                    sender: mergedConfig.branding?.title || 'BrainKB Assistant'
                  };
                  setMessages(prev => [...prev, responseMessage]);
                }}
                branding={mergedConfig.branding}
              />
            )}
            
            <div ref={messagesEndRef} />
            {isExpanded && messages.length > 3 && (
              <div className="text-center py-2 text-xs text-gray-500 bg-gray-50 border-t border-gray-200">
                Scroll to see more messages
              </div>
            )}
          </div>

            {/* Quick Actions */}
            {mergedConfig.features?.enableQuickActions && usePageContext !== null && (
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50" style={{ flexShrink: 0 }}>
                <div className="flex flex-wrap gap-2" style={{ 
                  maxWidth: '100%',
                  width: '100%',
                  paddingRight: isExpanded ? '32px' : '0',
                  paddingLeft: isExpanded ? '32px' : '0'
                }}>
                  {generateContextualQuickActions().map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleQuickAction(action.action, action.url, action.external)}
                      className="flex items-center space-x-1 px-3 py-2 text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg border border-purple-200 transition-colors shadow-sm"
                      style={{ 
                        maxWidth: isExpanded ? '280px' : '100%',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        flexShrink: 0,
                        fontSize: isExpanded ? '14px' : '12px',
                        padding: isExpanded ? '8px 12px' : '6px 10px',
                        minWidth: isExpanded ? '160px' : 'auto'
                      }}
                      title={action.description}
                    >
                      <span style={{ flexShrink: 0 }}>{action.icon}</span>
                      <span style={{ 
                        wordWrap: 'break-word', 
                        overflowWrap: 'break-word',
                        maxWidth: isExpanded ? '240px' : '100%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* File Upload */}
          {showUpload && mergedConfig.features?.enableFileUpload && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50" style={{ flexShrink: 0 }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-700">Upload File</h4>
                <button
                  onClick={() => setShowUpload(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <FileUpload 
                onFileUpload={handleFileUpload} 
                enabled={mergedConfig.features?.enableFileUpload}
              />
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white" style={{ flexShrink: 0 }}>
            <div className="flex space-x-2" style={{ maxWidth: '100%', minWidth: '0' }}>
              {mergedConfig.features?.enableFileUpload && (
                <button
                  onClick={() => setShowUpload(!showUpload)}
                  className="px-3 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors border border-gray-300"
                  style={{ flexShrink: 0 }}
                  title="Upload file"
                >
                  <Upload className="w-4 h-4" />
                </button>
              )}
              
              {/* Page Content Selection Button */}
              <button
                onClick={captureSelectedText}
                className="px-3 py-3 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors border border-blue-300"
                style={{ flexShrink: 0 }}
                title="Add selected page content"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={mergedConfig.features?.enableKeyboardShortcuts ? handleKeyPress : undefined}
                placeholder={mergedConfig.customization?.placeholderText || 'Ask about Knowledge Graph or anything'}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ minWidth: '0', maxWidth: '100%' }}
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md"
                style={{ flexShrink: 0 }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button with Brain Icon */}
      <button
        className={`brainkb-assistant-button ${styling.customClasses?.button || ''}`}
        style={{
          background: styling.buttonColor ? 
            `linear-gradient(135deg, ${styling.buttonColor.includes('from-') ? styling.buttonColor.split('-')[1] : '#667eea'}, ${styling.buttonColor.includes('to-') ? styling.buttonColor.split('-')[1] : '#764ba2'})` :
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#ffffff',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          zIndex: zIndex + 1,
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <Brain className="w-8 h-8" />
        )}
      </button>
    </div>
  );
} 