import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, User, Bot, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

const ChatInterface = ({ messages, onSendMessage, isLoading }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput("");
    
    try {
      await onSendMessage(message);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-gradient-glow rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Welcome to IBM Granite AI
            </h3>
            <p className="text-foreground-muted max-w-md mx-auto">
              Start a conversation with our AI model. Ask questions, generate content, 
              or explore creative ideas.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
            >
              <div
                className={`flex items-start space-x-3 max-w-[80%] ${
                  message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`p-2 rounded-full flex-shrink-0 ${
                    message.type === "user"
                      ? "bg-primary text-white"
                      : "bg-background-elevated border border-border"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4 text-primary" />
                  )}
                </div>

                {/* Message */}
                <Card
                  className={`p-4 ${
                    message.type === "user"
                      ? "bg-primary text-white shadow-glow"
                      : "bg-card-elevated border-border"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <div className="mt-2 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </Card>
              </div>
            </div>
          ))
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start animate-slide-up">
            <div className="flex items-start space-x-3 max-w-[80%]">
              <div className="p-2 rounded-full bg-background-elevated border border-border">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <Card className="p-4 bg-card-elevated border-border">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-foreground-muted">
                    IBM Granite is thinking...
                  </span>
                </div>
              </Card>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border bg-background-surface p-4">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask IBM Granite AI anything..."
              className="min-h-[60px] max-h-32 resize-none bg-input border-input-border focus:border-input-focus transition-colors"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="self-end bg-primary hover:bg-primary-hover text-white px-6 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
        <p className="text-xs text-foreground-subtle mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;