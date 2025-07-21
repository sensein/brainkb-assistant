import { MCPTool, MCPRequest, MCPResponse, BrainKBConfig } from '../types';
export declare class MCPService {
    private serverUrl;
    private apiKey;
    private tools;
    constructor(config: BrainKBConfig);
    callTool(toolName: string, params: Record<string, any>): Promise<any>;
    sendRequest(request: MCPRequest): Promise<MCPResponse>;
    listTools(): Promise<MCPTool[]>;
    callTools(toolCalls: Array<{
        name: string;
        params: Record<string, any>;
    }>): Promise<any[]>;
    getBrainKBTools(): MCPTool[];
}
//# sourceMappingURL=mcp.d.ts.map