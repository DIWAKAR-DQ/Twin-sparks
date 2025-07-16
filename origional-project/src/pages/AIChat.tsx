import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant for catalog creation. I can help you with product descriptions, pricing strategies, marketing tips, and more. How can I assist you today?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Here you would integrate with OpenRouter API
      const API_KEY = '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';
      
      // For demo purposes, simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const aiResponse = generateAIResponse(content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Message failed",
        description: "Could not send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('pricing')) {
      return "For pricing your products effectively:\n\n1. Research competitor prices in your area\n2. Calculate your material and labor costs\n3. Add 30-50% markup for profit\n4. Consider your target customer's budget\n5. Start slightly higher - you can always discount\n\nWould you like help calculating prices for a specific product?";
    }
    
    if (lowerMessage.includes('description') || lowerMessage.includes('describe')) {
      return "Great product descriptions should include:\n\n✨ Product name and main benefit\n📏 Size, color, material details\n🎯 Who it's perfect for\n💫 What makes it special\n💰 Price and value proposition\n\nExample: 'Handwoven Cotton Saree - Beautiful royal blue with golden border, 6 yards, perfect for weddings and festivals. Made from pure cotton for comfort. Only ₹2,500'\n\nWhat product would you like help describing?";
    }
    
    if (lowerMessage.includes('marketing') || lowerMessage.includes('promote')) {
      return "Here are proven marketing strategies for rural businesses:\n\n📱 WhatsApp Business - Share catalogs with customers\n🤝 Word of mouth - Encourage customer referrals\n📸 Social media - Post product photos regularly\n🏪 Local events - Set up stalls at festivals/markets\n📢 Community groups - Join local business networks\n\nWhich marketing channel interests you most?";
    }
    
    if (lowerMessage.includes('catalog') || lowerMessage.includes('catalogue')) {
      return "Creating effective catalogs:\n\n📸 High-quality product photos are essential\n📝 Clear, compelling descriptions\n💰 Transparent pricing\n📞 Easy contact information\n✨ Professional layout and design\n🔄 Regular updates with new products\n\nOur app helps you create professional catalogs automatically. Have you tried our catalog creator yet?";
    }

    // Default response
    const responses = [
      "That's a great question! For rural businesses, I always recommend focusing on what makes your products unique. What specific challenge are you facing with your business?",
      "I'd be happy to help you with that! Rural entrepreneurs often succeed by highlighting the authentic, handmade quality of their products. Tell me more about what you're working on.",
      "Excellent point! Building trust with customers is crucial for rural businesses. Word-of-mouth recommendations and quality products go a long way. How can I assist you further?",
      "That's an interesting perspective! Rural markets have unique opportunities - local festivals, community events, and personal relationships. What aspect of your business would you like to improve?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const startVoiceRecording = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        toast({
          title: "Listening...",
          description: "Speak your question clearly.",
        });
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        toast({
          title: "Voice recognition error",
          description: "Please try typing your message instead.",
          variant: "destructive",
        });
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } else {
      toast({
        title: "Voice not supported",
        description: "Voice recognition is not supported in your browser.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
        {/* Header */}
        <div className="text-center mb-6 space-y-2">
          <h1 className="text-3xl font-bold text-gradient">AI Business Assistant</h1>
          <p className="text-muted-foreground">
            Get expert advice for your rural business and catalog creation
          </p>
        </div>

        {/* Chat Messages */}
        <Card className="flex-1 flex flex-col card-elevated">
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </p>
                    <div
                      className={`text-xs mt-2 opacity-70 ${
                        message.role === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>

                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-[hsl(35_100%_65%)] flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1 flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about pricing, marketing, product descriptions..."
                  disabled={isLoading || isRecording}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={startVoiceRecording}
                  disabled={isLoading || isRecording}
                  className={isRecording ? 'bg-red-500 text-white' : ''}
                >
                  {isRecording ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <Button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-primary to-primary-glow"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>

        {/* Quick Questions */}
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2 text-center">Quick questions:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "How to price my products?",
              "Writing better descriptions",
              "Marketing on WhatsApp",
              "Catalog best practices"
            ].map((question) => (
              <Button
                key={question}
                variant="outline"
                size="sm"
                onClick={() => sendMessage(question)}
                disabled={isLoading}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}