import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, BookUp, X } from 'lucide-react';
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
    <div className="fixed inset-y-0 right-0 w-80 bg-background-surface border-l border-border-subtle z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border-subtle">
        <h2 className="text-lg font-light tracking-wider uppercase text-foreground">History</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-foreground-muted hover:text-foreground">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        {history.length === 0 ? (
          <div className="flex items-center justify-center h-full p-4">
            <p className="text-foreground-subtle text-sm text-center">No saved cover letters found.</p>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {history.map((item) => (
              <div key={item.id} className="bg-background-elevated p-3 rounded-md border border-transparent hover:border-border-subtle transition-colors group">
                <p className="font-semibold text-foreground truncate">{item.jobTitle}</p>
                <p className="text-sm text-foreground-muted truncate mb-2">{item.companyName || 'No Company'}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground-subtle">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" title="Load" className="h-7 w-7" onClick={() => onLoad(item)}>
                      <BookUp className="h-4 w-4 text-foreground-muted hover:text-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete" className="h-7 w-7" onClick={() => onDelete(item.id)}>
                      <Trash2 className="h-4 w-4 text-foreground-muted hover:text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};