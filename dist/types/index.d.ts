export interface ChatMessage {
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    sender?: string;
}
export interface QuickAction {
    text: string;
    icon: string;
}
export interface BrainKBConfig {
    branding?: {
        title?: string;
        subtitle?: string;
        logo?: string;
    };
    theme?: {
        primaryColor?: string;
        secondaryColor?: string;
        backgroundColor?: string;
        textColor?: string;
    };
    position?: {
        bottom?: number;
        right?: number;
    };
    features?: {
        enableQuickActions?: boolean;
        enableContactInfo?: boolean;
        enableTypingIndicator?: boolean;
        enableSizeControls?: boolean;
        enableResponsiveDesign?: boolean;
        enableFileUpload?: boolean;
        enableCodeRendering?: boolean;
        enableContentEditing?: boolean;
        enableMCPIntegration?: boolean;
    };
    size?: {
        width?: number;
        height?: number;
        minWidth?: number;
        minHeight?: number;
        maxWidth?: number;
        maxHeight?: number;
        expandedWidth?: number;
        expandedHeight?: number;
    };
    responsive?: {
        mobileBreakpoint?: number;
        tabletBreakpoint?: number;
        desktopBreakpoint?: number;
        mobileSize?: {
            width?: number;
            height?: number;
        };
        tabletSize?: {
            width?: number;
            height?: number;
        };
        desktopSize?: {
            width?: number;
            height?: number;
        };
    };
    mcp?: {
        enabled?: boolean;
        serverUrl?: string;
        apiKey?: string;
        tools?: MCPTool[];
        model?: string;
        temperature?: number;
        maxTokens?: number;
    };
    backend?: {
        enabled?: boolean;
        apiUrl?: string;
        apiKey?: string;
        endpoints?: {
            chat?: string;
            upload?: string;
            search?: string;
            analytics?: string;
        };
    };
}
export interface MCPTool {
    name: string;
    description: string;
    parameters: Record<string, any>;
    function: (params: any) => Promise<any>;
}
export interface MCPRequest {
    method: string;
    params: Record<string, any>;
    id: string;
}
export interface MCPResponse {
    result?: any;
    error?: {
        code: number;
        message: string;
    };
    id: string;
}
export interface BrainKBRequest {
    message: string;
    context?: {
        currentPage?: string;
        selectedEntity?: string;
        userPreferences?: Record<string, any>;
        pageContext?: PageContext;
        mcpTools?: MCPTool[];
    };
}
export interface BrainKBResponse {
    content: string;
    tools?: MCPTool[];
    suggestions?: string[];
    metadata?: Record<string, any>;
}
export interface PageContext {
    title?: string;
    description?: string;
    keywords?: string[];
    entities?: string[];
}
export interface SetupConfig {
    websiteUrl?: string;
    apiKey?: string;
    mcpEnabled?: boolean;
    mcpServerUrl?: string;
    mcpApiKey?: string;
    backendEnabled?: boolean;
    backendUrl?: string;
    backendApiKey?: string;
    branding?: {
        title?: string;
        subtitle?: string;
        logo?: string;
    };
    features?: {
        fileUpload?: boolean;
        codeRendering?: boolean;
        contentEditing?: boolean;
        mcpIntegration?: boolean;
    };
}
export interface InstallationGuide {
    steps: string[];
    codeSnippet: string;
    configuration: Record<string, any>;
    troubleshooting: Record<string, string>;
}
//# sourceMappingURL=index.d.ts.map