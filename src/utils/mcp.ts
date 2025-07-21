import { MCPTool, MCPRequest, MCPResponse, BrainKBConfig } from '../types';

export class MCPService {
  private serverUrl: string;
  private apiKey: string;
  private tools: MCPTool[];

  constructor(config: BrainKBConfig) {
    this.serverUrl = config.mcp?.serverUrl || '';
    this.apiKey = config.mcp?.apiKey || '';
    this.tools = config.mcp?.tools || [];
  }

  async callTool(toolName: string, params: Record<string, any>): Promise<any> {
    const tool = this.tools.find(t => t.name === toolName);
    if (!tool) {
      throw new Error(`Tool ${toolName} not found`);
    }

    try {
      return await tool.function(params);
    } catch (error) {
      console.error(`Error calling tool ${toolName}:`, error);
      throw error;
    }
  }

  async sendRequest(request: MCPRequest): Promise<MCPResponse> {
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
    } catch (error) {
      console.error('MCP request error:', error);
      throw error;
    }
  }

  async listTools(): Promise<MCPTool[]> {
    try {
      const response = await this.sendRequest({
        method: 'tools/list',
        params: {},
        id: Date.now().toString(),
      });

      return response.result?.tools || [];
    } catch (error) {
      console.error('Error listing MCP tools:', error);
      return this.tools;
    }
  }

  async callTools(toolCalls: Array<{ name: string; params: Record<string, any> }>): Promise<any[]> {
    const results = [];
    
    for (const toolCall of toolCalls) {
      try {
        const result = await this.callTool(toolCall.name, toolCall.params);
        results.push({ name: toolCall.name, result });
      } catch (error) {
        results.push({ name: toolCall.name, error: (error as Error).message });
      }
    }

    return results;
  }

  // Built-in BrainKB tools
  getBrainKBTools(): MCPTool[] {
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
          const codeExamples: Record<string, string> = {
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
            code: codeExamples[params.language as keyof typeof codeExamples] || codeExamples.javascript,
            language: params.language,
            explanation: `Generated ${params.language} code for: ${params.task}`
          };
        }
      }
    ];
  }
} 