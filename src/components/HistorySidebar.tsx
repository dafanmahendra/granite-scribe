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
    <div className="fixed inset-y-0 right-0 w-80 bg-gray-900 border-l border-gray-800 z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">History</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        {history.length === 0 ? (
          <div className="flex items-center justify-center h-full p-4">
            <p className="text-gray-500 text-sm text-center">No saved cover letters found.</p>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {history.map((item) => (
              <div key={item.id} className="bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-primary transition-colors group">
                <p className="font-semibold text-white truncate">{item.jobTitle}</p>
                <p className="text-sm text-gray-400 truncate mb-2">{item.companyName || 'No Company'}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" title="Load" className="h-8 w-8" onClick={() => onLoad(item)}>
                      <BookUp className="h-4 w-4 text-gray-400 hover:text-white" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete" className="h-8 w-8" onClick={() => onDelete(item.id)}>
                      <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
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