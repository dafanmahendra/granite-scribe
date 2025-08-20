import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, Trash2, MessageSquare, Clock, X } from "lucide-react";
import { ChatMessage } from "./ChatInterface";

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  lastActive: Date;
}

interface HistorySidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onNewSession: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const HistorySidebar = ({
  sessions,
  currentSessionId,
  onSelectSession,
  onDeleteSession,
  onNewSession,
  isOpen,
  onClose,
}: HistorySidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.messages.some((msg) =>
      msg.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);
    const days = diff / (1000 * 60 * 60 * 24);

    if (hours < 1) return "Just now";
    if (hours < 24) return `${Math.floor(hours)}h ago`;
    if (days < 7) return `${Math.floor(days)}d ago`;
    return date.toLocaleDateString();
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-background-surface border-r border-border z-50 md:static md:z-auto flex flex-col animate-slide-up">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Chat History</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="md:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            onClick={onNewSession}
            className="w-full bg-primary hover:bg-primary-hover text-white mb-3"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            New Chat
          </Button>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-subtle" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-input-border focus:border-input-focus"
            />
          </div>
        </div>

        {/* Sessions List */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {filteredSessions.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-foreground-subtle mx-auto mb-3" />
                <p className="text-foreground-muted">
                  {searchQuery ? "No matching conversations" : "No conversations yet"}
                </p>
                <p className="text-sm text-foreground-subtle mt-1">
                  {searchQuery ? "Try a different search term" : "Start a new chat to begin"}
                </p>
              </div>
            ) : (
              filteredSessions.map((session, index) => (
                <div key={session.id}>
                  <Card
                    className={`p-3 cursor-pointer transition-all hover:bg-card-elevated border-border group ${
                      currentSessionId === session.id
                        ? "bg-primary/10 border-primary/30"
                        : "hover:border-border"
                    }`}
                    onClick={() => {
                      onSelectSession(session.id);
                      if (window.innerWidth < 768) onClose();
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-foreground mb-1 truncate">
                          {session.title}
                        </h3>
                        {session.messages.length > 0 && (
                          <p className="text-xs text-foreground-muted mb-2">
                            {truncateText(
                              session.messages[session.messages.length - 1].content,
                              50
                            )}
                          </p>
                        )}
                        <div className="flex items-center text-xs text-foreground-subtle">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(session.lastActive)}
                          <span className="mx-2">•</span>
                          {session.messages.length} messages
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession(session.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto text-foreground-subtle hover:text-error"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                  {index < filteredSessions.length - 1 && (
                    <Separator className="my-2 bg-border-subtle" />
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="text-xs text-foreground-subtle text-center">
            {sessions.length} total conversations
          </div>
        </div>
      </div>
    </>
  );
};

export default HistorySidebar;

export type { ChatSession };