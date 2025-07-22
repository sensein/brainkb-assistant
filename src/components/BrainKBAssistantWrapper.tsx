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
}

// API Service Class
class BrainKBAPIService {
  private config: BrainKBConfig;

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
      const response = await fetch(this.config.api!.endpoint!, {
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
    } catch (error) {
      console.error('REST API Error:', error);
      return this.generateLocalResponse(message, context);
    }
  }

  private generateLocalResponse(message: string, context?: any): any {
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
    } else if (lowerMessage.includes('?')) {
      return { content: responses.question };
    } else if (lowerMessage.includes('knowledge') || lowerMessage.includes('data')) {
      return { content: responses.knowledge };
    }
    
    return { content: responses.default };
  }
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
    <div className="bg-gray-900 rounded-lg overflow-hidden my-2 border border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
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
        <code className="text-green-400 text-sm font-mono">{code}</code>
      </pre>
    </div>
  );
};

// Markdown Renderer Component
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];

    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeLanguage = '';

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim() || 'javascript';
          codeBlockContent = [];
        } else {
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

      // Handle headers
      if (line.startsWith('#')) {
        const level = line.match(/^#+/)?.[0].length || 1;
        const text = line.replace(/^#+\s*/, '');
        const Tag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;
        elements.push(<Tag key={index} className="font-bold text-gray-900 mb-2">{text}</Tag>);
        return;
      }

      // Handle bold text
      if (line.includes('**')) {
        const parts = line.split('**');
        const elements2: React.ReactNode[] = [];
        parts.forEach((part, i) => {
          if (i % 2 === 1) {
            elements2.push(<strong key={i} className="font-bold">{part}</strong>);
          } else {
            elements2.push(part);
          }
        });
        elements.push(<p key={index} className="mb-2">{elements2}</p>);
        return;
      }

      // Handle italic text
      if (line.includes('*') && !line.startsWith('*')) {
        const parts = line.split('*');
        const elements2: React.ReactNode[] = [];
        parts.forEach((part, i) => {
          if (i % 2 === 1) {
            elements2.push(<em key={i} className="italic">{part}</em>);
          } else {
            elements2.push(part);
          }
        });
        elements.push(<p key={index} className="mb-2">{elements2}</p>);
        return;
      }

      // Handle links
      if (line.includes('[') && line.includes('](') && line.includes(')')) {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = line.split(linkRegex);
        const elements2: React.ReactNode[] = [];
        for (let i = 0; i < parts.length; i += 3) {
          if (parts[i]) elements2.push(parts[i]);
          if (parts[i + 1] && parts[i + 2]) {
            elements2.push(
              <a key={i} href={parts[i + 2]} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {parts[i + 1]}
              </a>
            );
          }
        }
        elements.push(<p key={index} className="mb-2">{elements2}</p>);
        return;
      }

      // Handle lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(<li key={index} className="ml-4 mb-1">• {line.slice(2)}</li>);
        return;
      }

      // Handle numbered lists
      if (/^\d+\.\s/.test(line)) {
        elements.push(<li key={index} className="ml-4 mb-1">{line}</li>);
        return;
      }

      // Regular text
      if (line.trim()) {
        elements.push(<p key={index} className="mb-2">{line}</p>);
      }
    });

    return elements;
  };

  return <div className="prose prose-sm max-w-none">{renderContent(content)}</div>;
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
        Supports: JSON, CSV, TXT, Images (PNG, JPG, GIF)
      </p>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".json,.csv,.txt,.png,.jpg,.jpeg,.gif"
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
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
          <MapPin className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-blue-800 mb-2">
            📍 Context Detected: <span className="font-semibold">{pageContext.title}</span>
          </div>
          {pageContext.description && (
            <p className="text-xs text-blue-700 mb-3">{pageContext.description}</p>
          )}
          <div className="text-sm text-blue-700 mb-3">
            Would you like me to answer based on the current page content?
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onUseContext}
              className="flex items-center space-x-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg transition-colors shadow-sm"
            >
              <span>✅</span>
              <span>Yes, use page content</span>
            </button>
            <button
              onClick={onSkipContext}
              className="flex items-center space-x-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white text-xs rounded-lg transition-colors shadow-sm"
            >
              <span>❌</span>
              <span>No, general questions only</span>
            </button>
          </div>
        </div>
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

  const apiService = new BrainKBAPIService(mergedConfig);

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

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: pageContext && pageContext.title && mergedConfig.features?.enableContextDetection
                        ? `${mergedConfig.customization?.welcomeMessage || 'Hello and welcome to BrainKB Assistant! 👋'}\n\nI can see you're on the **${pageContext?.title || 'this page'}** page. Would you like me to answer based on the current page content?`
        : mergedConfig.customization?.welcomeMessage || 'Hello and welcome to BrainKB Assistant! 👋',
      timestamp: new Date(),
      sender: mergedConfig.branding?.title || 'BrainKB Assistant'
    }
  ]);

  // Set context detected to true if page context is available
  useEffect(() => {
    if (pageContext && pageContext.title && !contextDetected && mergedConfig.features?.enableContextDetection) {
      setContextDetected(true);
    }
  }, [pageContext, contextDetected, mergedConfig.features?.enableContextDetection]);

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
        description: action.description
      }));
    }

    // Default quick actions with more options
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

  const handleQuickAction = (action: string) => {
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
    
    // Call custom callback if provided
    if (mergedConfig.callbacks?.onFileUpload) {
      mergedConfig.callbacks.onFileUpload(file);
    }
    
    // Simulate processing
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I've processed your file **${file.name}**. I can help you analyze its contents and integrate it with the knowledge base. What would you like to do with this data?`,
        timestamp: new Date(),
        sender: mergedConfig.branding?.title || 'BrainKB Assistant'
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
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
  const zIndex = mergedConfig.ui?.zIndex || 999999; // Much higher z-index for visibility
  const styling = mergedConfig.ui?.styling || {};

  const getPositionClasses = () => {
    // Always default to bottom-right for better visibility
    const finalPosition = mergedConfig.ui?.styling?.forcePosition ? position : 'bottom-right';
    
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

  return (
    <div 
      className={`brainkb-assistant-container ${getPositionClasses()} ${styling.customClasses?.container || ''}`}
      style={{
        width: sizeConfig.width,
        height: isOpen ? sizeConfig.height : 'auto',
        zIndex: zIndex,
        bottom: position.includes('bottom') ? '24px' : 'auto',
        right: position.includes('right') ? '24px' : 'auto',
        left: position.includes('left') ? '24px' : 'auto',
        top: position.includes('top') ? '24px' : 'auto',
      }}
    >
      {/* Chat Window */}
      {isOpen && (
        <div className={`brainkb-assistant-chat mb-4 ${styling.chatBackground || 'bg-white'} rounded-lg ${styling.shadowColor || 'shadow-xl'} ${styling.borderColor || 'border border-gray-200'} flex flex-col ${styling.customClasses?.chat || ''}`} style={{ height: sizeConfig.height }}>
          {/* Header */}
          <div className={`brainkb-assistant-header flex items-center justify-between p-4 border-b ${styling.borderColor || 'border-gray-200'} bg-gradient-to-r ${mergedConfig.branding?.primaryColor || 'from-purple-600 to-blue-600'} text-white rounded-t-lg ${styling.customClasses?.header || ''}`}>
            <div className="flex items-center">
              <BrainKBLogo config={mergedConfig} />
            </div>
            <div className="flex items-center space-x-2">
              {mergedConfig.features?.enableExpandableWindow && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-white hover:text-gray-200 transition-colors"
                  title={isExpanded ? "Minimize" : "Maximize"}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Current Page Context */}
          {showContext && pageContext && mergedConfig.features?.enableContextDetection && (
            <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-blue-800">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="font-medium">Current Page:</span>
                  <span className="ml-1 font-semibold">{pageContext.title}</span>
                </div>
                <button
                  onClick={() => setShowContext(false)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {pageContext.description && (
                <p className="text-xs text-blue-700 mt-1">{pageContext.description}</p>
              )}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start space-x-3 max-w-xs">
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
                  <div
                    className={`px-4 py-3 rounded-lg shadow-sm ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                        : 'bg-gray-50 text-gray-800 border border-gray-200'
                    }`}
                  >
                    {editingMessageId === message.id ? (
                      <ContentEditor
                        content={message.content}
                        onSave={(content) => handleEditMessage(message.id, content)}
                        onCancel={() => setEditingMessageId(null)}
                      />
                    ) : (
                      <div>
                        <MarkdownRenderer content={message.content} />
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
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
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-blue-800 mb-2">
                      📍 Context Detected: <span className="font-semibold">{pageContext.title}</span>
                    </div>
                    {pageContext.description && (
                      <p className="text-xs text-blue-700 mb-3">{pageContext.description}</p>
                    )}
                    <div className="text-sm text-blue-700 mb-3">
                      Would you like me to answer based on the current page content?
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setUsePageContext(true);
                          const responseMessage: ChatMessage = {
                            id: Date.now().toString(),
                            type: 'assistant',
                            content: `Perfect! I'll use the context from **${pageContext?.title || 'this page'}** to provide more relevant answers. You can ask me anything about this page or general questions.`,
                            timestamp: new Date(),
                            sender: mergedConfig.branding?.title || 'BrainKB Assistant'
                          };
                          setMessages(prev => [...prev, responseMessage]);
                        }}
                        className="flex items-center space-x-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg transition-colors shadow-sm"
                      >
                        <span>✅</span>
                        <span>Yes, use page content</span>
                      </button>
                      <button
                        onClick={() => {
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
                        className="flex items-center space-x-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white text-xs rounded-lg transition-colors shadow-sm"
                      >
                        <span>❌</span>
                        <span>No, general questions only</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

                      {/* Context Response Buttons */}
            {usePageContext === null && contextDetected && (
              <div className="px-4 py-3 border-t border-gray-200 bg-blue-50">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setUsePageContext(true);
                      const responseMessage: ChatMessage = {
                        id: Date.now().toString(),
                        type: 'assistant',
                        content: `Great! I'll answer based on the current page content: **${pageContext?.title || 'this page'}**. You can now ask me questions about this page.`,
                        timestamp: new Date(),
                        sender: mergedConfig.branding?.title || 'BrainKB Assistant'
                      };
                      setMessages(prev => [...prev, responseMessage]);
                    }}
                    className="flex items-center space-x-1 px-3 py-2 text-xs bg-green-100 hover:bg-green-200 text-green-800 rounded-lg border border-green-200 transition-colors shadow-sm"
                  >
                    <span>✅</span>
                    <span>Yes, use page content</span>
                  </button>
                  <button
                    onClick={() => {
                      setUsePageContext(false);
                      const responseMessage: ChatMessage = {
                        id: Date.now().toString(),
                        type: 'assistant',
                        content: "No problem! I'll answer general questions without using the current page content. What would you like to know?",
                        timestamp: new Date(),
                        sender: mergedConfig.branding?.title || 'BrainKB Assistant'
                      };
                      setMessages(prev => [...prev, responseMessage]);
                    }}
                    className="flex items-center space-x-1 px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg border border-gray-200 transition-colors shadow-sm"
                  >
                    <span>❌</span>
                    <span>No, general questions only</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {mergedConfig.features?.enableQuickActions && usePageContext !== null && (
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-wrap gap-2">
                  {generateContextualQuickActions().map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleQuickAction(action.action)}
                      className="flex items-center space-x-1 px-3 py-2 text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg border border-purple-200 transition-colors shadow-sm"
                      title={action.description}
                    >
                      {action.icon}
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
                
                {/* Related Links */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <button className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors">
                    <Globe className="w-3 h-3" />
                    <span>🌐 beta.brainkb.org</span>
                  </button>
                  <button className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors">
                    <Users className="w-3 h-3" />
                    <span>👥 Sensible Intelligence Group</span>
                  </button>
                  <button className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors">
                    <BookOpen className="w-3 h-3" />
                    <span>📚 Documentation</span>
                  </button>
                  <button className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors">
                    <MessageSquare className="w-3 h-3" />
                    <span>💬 Community Forum</span>
                  </button>
                  <button className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors">
                    <Zap className="w-3 h-3" />
                    <span>⚡ API Reference</span>
                  </button>
                  <button className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors">
                    <Settings className="w-3 h-3" />
                    <span>⚙️ Configuration</span>
                  </button>
                  <button className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors">
                    <Star className="w-3 h-3" />
                    <span>⭐ GitHub</span>
                  </button>
                  <button className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-200 transition-colors">
                    <TrendingUp className="w-3 h-3" />
                    <span>📈 Analytics</span>
                  </button>
                </div>
              </div>
            )}

          {/* File Upload */}
          {showUpload && mergedConfig.features?.enableFileUpload && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
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
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              {mergedConfig.features?.enableFileUpload && (
                <button
                  onClick={() => setShowUpload(!showUpload)}
                  className="px-3 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors border border-gray-300"
                  title="Upload file"
                >
                  <Upload className="w-4 h-4" />
                </button>
              )}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={mergedConfig.features?.enableKeyboardShortcuts ? handleKeyPress : undefined}
                placeholder={mergedConfig.customization?.placeholderText || 'Ask about Knowledge Graph or anything'}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md"
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