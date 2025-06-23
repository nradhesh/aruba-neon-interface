
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Aruba Networks AI assistant. I can help you with network management, documentation queries, and technical support. How can I assist you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // TODO: Replace with actual API call to your chatbot endpoint
    console.log('Sending message to AI:', inputText);
    console.log('API Endpoint: // Insert your chatbot API endpoint here');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I understand you're asking about "${inputText}". This is a simulated response. Please integrate your actual AI chatbot API endpoint to get real responses from your Aruba Networks AI system.`,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      
      // Here you would make the actual API call:
      // try {
      //   const response = await fetch('YOUR_CHATBOT_API_ENDPOINT', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': 'Bearer YOUR_API_KEY' // Insert your API key here
      //     },
      //     body: JSON.stringify({
      //       message: inputText,
      //       conversation_id: 'unique_conversation_id',
      //       // Add other required parameters
      //     })
      //   });
      //   const data = await response.json();
      //   // Handle the response and add AI message
      // } catch (error) {
      //   console.error('Error calling chatbot API:', error);
      // }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="glass-morphism rounded-xl overflow-hidden h-96 flex flex-col">
      {/* Chat Header */}
      <div className="bg-gray-900/50 px-6 py-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Aruba AI Assistant</h3>
            <p className="text-sm text-gray-400">Online • Ready to help</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-neon-blue scrollbar-track-gray-800"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.sender === 'user' 
                ? 'bg-neon-blue text-black' 
                : 'bg-gray-800 text-neon-blue'
            }`}>
              {message.sender === 'user' ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>
            
            <div className={`max-w-xs lg:max-w-md ${
              message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
            }`}>
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 opacity-70 ${
                message.sender === 'user' ? 'text-black' : 'text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-800 text-neon-blue rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="chat-bubble-ai">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-gray-900/50 px-6 py-4 border-t border-gray-800">
        <div className="flex space-x-3">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about Aruba Networks..."
            className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-neon-blue focus:ring-neon-blue"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="bg-neon-blue text-black hover:bg-neon-cyan transition-colors px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {/* API Integration Note */}
        <div className="mt-2 text-xs text-gray-500">
          💡 <strong>API Integration:</strong> Connect to{' '}
          <code className="bg-gray-800 px-1 rounded">// Insert your chatbot API endpoint here</code>
        </div>
      </div>
    </div>
  );
};
