import { BrainKBRequest, BrainKBResponse, BrainKBConfig, MCPTool } from '../types';
import { MCPService } from './mcp';

export class BrainKBAPI {
  private config: BrainKBConfig;
  private mcpService: MCPService | null = null;

  constructor(config: BrainKBConfig) {
    this.config = config;
    
    // Initialize MCP service if enabled
    if (config.mcp?.enabled) {
      this.mcpService = new MCPService(config);
    }
  }

  async sendMessage(request: BrainKBRequest): Promise<BrainKBResponse> {
    try {
      // If MCP is enabled, use agentic capabilities
      if (this.mcpService && this.config.mcp?.enabled) {
        return await this.handleMCPRequest(request);
      }

      // Fallback to local response generation
      return this.generateLocalResponse(request);
    } catch (error) {
      console.error('Error sending message:', error);
      return {
        content: "I'm sorry, I encountered an error. Please try again.",
        suggestions: ["Try rephrasing your question", "Check your connection"],
        metadata: { error: true }
      };
    }
  }

  private async handleMCPRequest(request: BrainKBRequest): Promise<BrainKBResponse> {
    const tools = this.mcpService!.getBrainKBTools();
    
    // Analyze the request to determine which tools to call
    const toolCalls = await this.analyzeRequestForTools(request.message, tools);
    
    if (toolCalls.length > 0) {
      // Execute the tools
      const results = await this.mcpService!.callTools(toolCalls);
      
      // Generate response based on tool results
      return this.generateResponseFromToolResults(request.message, results);
    }

    // If no specific tools are needed, use the MCP server for general chat
    return await this.callMCPServer(request);
  }

  private async analyzeRequestForTools(message: string, tools: MCPTool[]): Promise<Array<{ name: string; params: Record<string, any> }>> {
    const toolCalls: Array<{ name: string; params: Record<string, any> }> = [];

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

  private generateResponseFromToolResults(message: string, results: any[]): BrainKBResponse {
    let content = '';
    const suggestions: string[] = [];

    for (const result of results) {
      if (result.error) {
        content += `I encountered an error with ${result.name}: ${result.error}\n\n`;
      } else {
        switch (result.name) {
          case 'search_knowledge_base':
            content += `Here are the search results:\n\n`;
            if (result.result.results) {
              result.result.results.forEach((item: any, index: number) => {
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
              analysis.insights.forEach((insight: string) => {
                content += `- ${insight}\n`;
              });
              content += `\n**Recommendations:**\n`;
              analysis.recommendations.forEach((rec: string) => {
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

  private async callMCPServer(request: BrainKBRequest): Promise<BrainKBResponse> {
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

      const response = await this.mcpService!.sendRequest(mcpRequest);
      
      return {
        content: response.result?.choices?.[0]?.message?.content || 'I apologize, but I couldn\'t generate a response.',
        suggestions: ['Ask a follow-up question', 'Try a different approach'],
        metadata: {
          model: this.config.mcp?.model,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('MCP server error:', error);
      return this.generateLocalResponse(request);
    }
  }

  private generateLocalResponse(request: BrainKBRequest): BrainKBResponse {
    const message = request.message.toLowerCase();
    const context = request.context?.pageContext;

    let content = '';
    const suggestions: string[] = [];

    // Context-aware responses
    if (context?.title) {
      content += `I can help you with **${context.title}**. `;
    }

    if (message.includes('hello') || message.includes('hi')) {
      content += "Hello! I'm your BrainKB Assistant. How can I help you explore neuroscience knowledge today?";
      suggestions.push('Ask about brain regions', 'Search for research data', 'Upload files for analysis');
    } else if (message.includes('brain') || message.includes('neural')) {
      content += "I can help you explore brain regions, neural pathways, and neuroscience research. What specific aspect would you like to learn about?";
      suggestions.push('Search for brain regions', 'Explore neural pathways', 'Find research papers');
    } else if (message.includes('upload') || message.includes('file')) {
      content += "You can upload files like JSON data, CSV files, or images for analysis. I'll help you process and understand the data.";
      suggestions.push('Upload a JSON file', 'Upload research data', 'Upload brain scan images');
    } else if (message.includes('code') || message.includes('api')) {
      content += "I can help you with BrainKB API integration and code examples. What programming language would you prefer?";
      suggestions.push('JavaScript examples', 'Python examples', 'TypeScript examples');
    } else if (message.includes('search') || message.includes('find')) {
      content += "I can search the BrainKB knowledge base for specific information. What would you like to search for?";
      suggestions.push('Search for brain regions', 'Find research papers', 'Look for neural pathways');
    } else {
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