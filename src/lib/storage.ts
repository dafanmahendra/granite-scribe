import { ChatMessage } from "@/components/ChatInterface";
import { ChatSession } from "@/components/HistorySidebar";

const STORAGE_KEYS = {
  CHAT_SESSIONS: "ibm_granite_chat_sessions",
  CURRENT_SESSION: "ibm_granite_current_session",
  USER_PREFERENCES: "ibm_granite_user_preferences",
  COVER_LETTER_HISTORY: "cover_letter_history",
} as const;

export interface UserPreferences {
  theme: "light" | "dark";
  autoSave: boolean;
  showTimestamps: boolean;
  maxHistorySize: number;
}

/**
 * Save chat sessions to localStorage
 */
export function saveChatSessions(sessions: ChatSession[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(sessions));
  } catch (error) {
    console.error("Failed to save chat sessions:", error);
  }
}

/**
 * Load chat sessions from localStorage
 */
export function loadChatSessions(): ChatSession[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CHAT_SESSIONS);
    if (!stored) return [];
    
    const sessions = JSON.parse(stored);
    // Convert date strings back to Date objects
    return sessions.map((session: any) => ({
      ...session,
      createdAt: new Date(session.createdAt),
      lastActive: new Date(session.lastActive),
      messages: session.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })),
    }));
  } catch (error) {
    console.error("Failed to load chat sessions:", error);
    return [];
  }
}

/**
 * Save current session ID
 */
export function saveCurrentSessionId(sessionId: string | null): void {
  try {
    if (sessionId) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, sessionId);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    }
  } catch (error) {
    console.error("Failed to save current session ID:", error);
  }
}

/**
 * Load current session ID
 */
export function loadCurrentSessionId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
  } catch (error) {
    console.error("Failed to load current session ID:", error);
    return null;
  }
}

/**
 * Save user preferences
 */
export function saveUserPreferences(preferences: UserPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  } catch (error) {
    console.error("Failed to save user preferences:", error);
  }
}

/**
 * Load user preferences with defaults
 */
export function loadUserPreferences(): UserPreferences {
  const defaults: UserPreferences = {
    theme: "dark",
    autoSave: true,
    showTimestamps: true,
    maxHistorySize: 100,
  };

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    if (!stored) return defaults;
    
    return { ...defaults, ...JSON.parse(stored) };
  } catch (error) {
    console.error("Failed to load user preferences:", error);
    return defaults;
  }
}

/**
 * Create a new chat session
 */
export function createNewSession(firstMessage?: ChatMessage): ChatSession {
  const now = new Date();
  const sessionId = `session_${now.getTime()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Generate title from first message or use default
  let title = "New Conversation";
  if (firstMessage) {
    title = firstMessage.content.length > 30 
      ? firstMessage.content.substring(0, 30) + "..."
      : firstMessage.content;
  }
  
  return {
    id: sessionId,
    title,
    messages: firstMessage ? [firstMessage] : [],
    createdAt: now,
    lastActive: now,
  };
}

/**
 * Update session with new message
 */
export function updateSessionWithMessage(
  session: ChatSession, 
  message: ChatMessage
): ChatSession {
  return {
    ...session,
    messages: [...session.messages, message],
    lastActive: new Date(),
    // Update title if this is the first user message
    title: session.messages.length === 0 && message.type === "user" 
      ? (message.content.length > 30 ? message.content.substring(0, 30) + "..." : message.content)
      : session.title,
  };
}

/**
 * Clean up old sessions based on user preferences
 */
export function cleanupOldSessions(sessions: ChatSession[], maxHistorySize: number): ChatSession[] {
  if (sessions.length <= maxHistorySize) return sessions;
  
  // Sort by last active date (newest first) and keep only the most recent
  return sessions
    .sort((a, b) => b.lastActive.getTime() - a.lastActive.getTime())
    .slice(0, maxHistorySize);
}

/**
 * Export chat session as JSON
 */
export function exportSession(session: ChatSession): string {
  return JSON.stringify(session, null, 2);
}

/**
 * Export all sessions as JSON
 */
export function exportAllSessions(sessions: ChatSession[]): string {
  return JSON.stringify({ 
    exportDate: new Date().toISOString(),
    totalSessions: sessions.length,
    sessions 
  }, null, 2);
}

/**
 * Clear all stored data (for privacy/reset)
 */
export function clearAllData(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error("Failed to clear data:", error);
  }
}

// --- Cover Letter History ---

export interface SavedApplication {
  id: string;
  jobTitle: string;
  companyName: string;
  mySkills: string;
  experienceLevel: string;
  education: string;
  whyInterested: string;
  achievements: string;
  generatedLetter: string;
  createdAt: string; // ISO string
}

/**
 * Load all saved cover letters from localStorage
 */
export function loadCoverLetters(): SavedApplication[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.COVER_LETTER_HISTORY);
    if (!stored) return [];
    return JSON.parse(stored) as SavedApplication[];
  } catch (error) {
    console.error("Failed to load cover letters:", error);
    return [];
  }
}

/**
 * Save all cover letters to localStorage
 */
function saveAllCoverLetters(applications: SavedApplication[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COVER_LETTER_HISTORY, JSON.stringify(applications));
  } catch (error) {
    console.error("Failed to save cover letters:", error);
  }
}

/**
 * Add a new cover letter to the history
 */
export function saveCoverLetter(application: Omit<SavedApplication, 'id' | 'createdAt'>): void {
  const letters = loadCoverLetters();
  const newLetter: SavedApplication = {
    ...application,
    id: `cl_${new Date().getTime()}`,
    createdAt: new Date().toISOString(),
  };
  letters.unshift(newLetter); // Add to the beginning of the list
  saveAllCoverLetters(letters);
}

/**
 * Delete a cover letter from the history by its ID
 */
export function deleteCoverLetter(id: string): void {
  let letters = loadCoverLetters();
  letters = letters.filter(letter => letter.id !== id);
  saveAllCoverLetters(letters);
}
