import React from 'react';
import { ChatMessage, BrainKBConfig } from '../types';
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
export declare const BrainKBChatWidget: React.FC<BrainKBChatWidgetProps>;
export {};
//# sourceMappingURL=BrainKBChatWidget.d.ts.map