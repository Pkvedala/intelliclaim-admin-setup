
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Copy, FileText } from 'lucide-react';

interface ChatPanelProps {
  claimId: string;
  onClose: () => void;
}

interface ChatMessage {
  id: number;
  timestamp: string;
  sender: 'user' | 'bot';
  message: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ claimId, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      timestamp: '10:15 AM',
      sender: 'user',
      message: "What is the patient's age?"
    },
    {
      id: 2,
      timestamp: '10:15 AM',
      sender: 'bot',
      message: "Patient DOB: 02/14/1985 → Age = 40 years (Calculated)."
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const userMessage: ChatMessage = {
        id: messages.length + 1,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        sender: 'user',
        message: currentMessage.trim()
      };

      setMessages(prev => [...prev, userMessage]);

      // Simulate bot response
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: messages.length + 2,
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          sender: 'bot',
          message: generateBotResponse(currentMessage.trim())
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);

      setCurrentMessage('');
    }
  };

  const generateBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('age')) {
      return "Patient DOB: 02/14/1985 → Age = 40 years (Calculated).";
    } else if (lowerQuery.includes('confidence')) {
      return "Overall confidence for this claim is 52%, which is below the 60% threshold. Hospital City has the lowest confidence at 45%.";
    } else if (lowerQuery.includes('procedure') || lowerQuery.includes('surgery')) {
      return "Procedures: Appendectomy (44950, 44970). Surgery confidence: 90%. Post-operative care also documented.";
    } else if (lowerQuery.includes('policy')) {
      return "Policy POL789456123 is active. However, claim date (06/04/2025) is after policy end date (12/31/2024) - Out of Coverage.";
    } else if (lowerQuery.includes('rule')) {
      return "Rule R-014 was triggered: PatientAge < 18 & ProcedureCode=44950 – Pediatric Review Required. This requires manual review.";
    } else {
      return "I can help you with questions about patient data, medical procedures, policy details, confidence scores, and rule violations for this claim. What would you like to know?";
    }
  };

  const handleCopyToNotes = (message: string) => {
    console.log('Copying to notes:', message);
    // Logic to copy to overall comments would go here
  };

  const handleInsertToTab = (message: string) => {
    console.log('Inserting to current tab:', message);
    // Logic to highlight relevant field in current tab would go here
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full max-h-[calc(100vh-200px)] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Chat with IntelliClaim</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-gray-600">
          Ask about claim {claimId}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="text-sm mb-1">
                  <span className="font-medium">
                    {msg.sender === 'user' ? 'You' : 'IntelliBot'}
                  </span>
                  <span className="ml-2 opacity-70">{msg.timestamp}</span>
                </div>
                <div>{msg.message}</div>
                
                {/* Bot message actions */}
                {msg.sender === 'bot' && (
                  <div className="flex gap-1 mt-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 px-2 text-xs"
                      onClick={() => handleCopyToNotes(msg.message)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy to Notes
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 px-2 text-xs"
                      onClick={() => handleInsertToTab(msg.message)}
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      Insert to Tab
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 flex gap-2">
          <Input
            placeholder="Ask about this claim..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!currentMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatPanel;
