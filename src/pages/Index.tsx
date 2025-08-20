import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import ChatInterface, { ChatMessage } from "@/components/ChatInterface";
import HistorySidebar, { ChatSession } from "@/components/HistorySidebar";
import { generateText } from "@/lib/ibm-granite";
import {
  loadChatSessions,
  saveChatSessions,
  loadCurrentSessionId,
  saveCurrentSessionId,
  createNewSession,
  updateSessionWithMessage,
  cleanupOldSessions,
  loadUserPreferences,
} from "@/lib/storage";

const Index = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load data on component mount
  useEffect(() => {
    const loadedSessions = loadChatSessions();
    const loadedCurrentSessionId = loadCurrentSessionId();
    const userPrefs = loadUserPreferences();

    setSessions(cleanupOldSessions(loadedSessions, userPrefs.maxHistorySize));
    setCurrentSessionId(loadedCurrentSessionId);
  }, []);

  // Save sessions whenever they change
  useEffect(() => {
    if (sessions.length > 0) {
      saveChatSessions(sessions);
    }
  }, [sessions]);

  // Save current session ID whenever it changes
  useEffect(() => {
    saveCurrentSessionId(currentSessionId);
  }, [currentSessionId]);

  const currentSession = sessions.find((s) => s.id === currentSessionId);
  const messages = currentSession?.messages || [];

  const handleSendMessage = async (content: string) => {
    setIsLoading(true);

    try {
      // Create user message
      const userMessage: ChatMessage = {
        id: `msg_${Date.now()}_user`,
        type: "user",
        content,
        timestamp: new Date(),
      };

      let updatedSession: ChatSession;

      if (currentSession) {
        // Update existing session
        updatedSession = updateSessionWithMessage(currentSession, userMessage);
      } else {
        // Create new session
        updatedSession = createNewSession(userMessage);
        setCurrentSessionId(updatedSession.id);
      }

      // Update sessions with user message
      setSessions((prev) => {
        const filtered = prev.filter((s) => s.id !== updatedSession.id);
        return [updatedSession, ...filtered];
      });

      // Generate AI response
      const graniteResponse = await generateText(content);

      if (graniteResponse.success) {
        const assistantMessage: ChatMessage = {
          id: `msg_${Date.now()}_assistant`,
          type: "assistant",
          content: graniteResponse.text,
          timestamp: new Date(),
        };

        // Update session with assistant response
        const finalSession = updateSessionWithMessage(updatedSession, assistantMessage);
        setSessions((prev) => {
          const filtered = prev.filter((s) => s.id !== finalSession.id);
          return [finalSession, ...filtered];
        });
      } else {
        // Handle API error
        const errorMessage: ChatMessage = {
          id: `msg_${Date.now()}_error`,
          type: "assistant",
          content: `I apologize, but I encountered an error: ${graniteResponse.error}. Please try again.`,
          timestamp: new Date(),
        };

        const errorSession = updateSessionWithMessage(updatedSession, errorMessage);
        setSessions((prev) => {
          const filtered = prev.filter((s) => s.id !== errorSession.id);
          return [errorSession, ...filtered];
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
    }

    toast({
      title: "Session deleted",
      description: "The conversation has been removed from your history.",
    });
  };

  const handleNewSession = () => {
    setCurrentSessionId(null);
    setIsHistoryOpen(false);
  };

  const handleToggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar
        onToggleHistory={handleToggleHistory}
        isHistoryOpen={isHistoryOpen}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <HistorySidebar
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={handleSelectSession}
          onDeleteSession={handleDeleteSession}
          onNewSession={handleNewSession}
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
        />
        
        <main className={`flex-1 flex flex-col transition-all duration-300 ${
          isHistoryOpen ? 'md:ml-0' : ''
        }`}>
          <div className="flex-1 bg-background-surface">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
