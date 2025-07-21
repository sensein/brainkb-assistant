import { BrainKBRequest, BrainKBResponse, BrainKBConfig } from '../types';
export declare class BrainKBAPI {
    private config;
    private mcpService;
    constructor(config: BrainKBConfig);
    sendMessage(request: BrainKBRequest): Promise<BrainKBResponse>;
    private handleMCPRequest;
    private analyzeRequestForTools;
    private generateResponseFromToolResults;
    private callMCPServer;
    private generateLocalResponse;
}
//# sourceMappingURL=api.d.ts.map