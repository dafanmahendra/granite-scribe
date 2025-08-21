import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, BookUp, X, Clock, Building } from 'lucide-react';
import { SavedApplication } from '@/lib/storage';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLoad: (application: SavedApplication) => void;
  onDelete: (id: string) => void;
  history: SavedApplication[];
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
  isOpen,
  onClose,
  onLoad,
  onDelete,
  history,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Beautiful backdrop blur */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
      
      {/* Enhanced sidebar with beautiful styling */}
      <div className="fixed inset-y-0 right-0 w-96 bg-gradient-to-b from-card to-card-elevated border-l border-border z-50 flex flex-col shadow-2xl animate-fade-in">
        {/* Beautiful header with gradient */}
        <div className="bg-gradient-to-r from-background-elevated to-card-elevated p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">History</h2>
                <p className="text-sm text-foreground-muted">{history.length} saved applications</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Enhanced content area */}
        <ScrollArea className="flex-grow">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="p-4 bg-muted/30 rounded-full mb-4">
                <BookUp className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No History Yet</h3>
              <p className="text-foreground-muted text-sm leading-relaxed">
                Your saved cover letters will appear here. Start creating to build your application history!
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {history.map((item, index) => (
                <div 
                  key={item.id} 
                  className="history-item group bg-gradient-to-r from-card to-card-elevated p-4 rounded-xl border border-border hover:border-border-subtle transition-all duration-300 hover:shadow-lg cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Job title and company */}
                  <div className="mb-3">
                    <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors truncate">
                      {item.jobTitle}
                    </h3>
                    <div className="flex items-center space-x-2 text-foreground-muted">
                      <Building className="h-4 w-4" />
                      <span className="text-sm truncate">{item.companyName || 'No Company'}</span>
                    </div>
                  </div>

                  {/* Preview of cover letter */}
                  {item.generatedLetter && (
                    <p className="text-sm text-foreground-subtle mb-3 line-clamp-2 leading-relaxed">
                      {item.generatedLetter.substring(0, 100)}...
                    </p>
                  )}

                  {/* Footer with date and actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex items-center space-x-2 text-xs text-foreground-subtle">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(item.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onLoad(item)}
                        className="h-8 px-3 text-xs bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      >
                        <BookUp className="h-3 w-3 mr-1" />
                        Load
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onDelete(item.id)}
                        className="h-8 w-8 text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </>
  );
};