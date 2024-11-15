import React, { useCallback, useEffect, useState } from 'react';
import { GripVertical } from 'lucide-react';

interface ResizablePanelProps {
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}

export function ResizablePanel({
  defaultWidth = 600,
  minWidth = 400,
  maxWidth = 800,
  leftPanel,
  rightPanel
}: ResizablePanelProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [width, setWidth] = useState(defaultWidth);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newWidth = e.clientX;
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
      }
    },
    [isDragging, minWidth, maxWidth]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="flex h-full">
      <div style={{ width: `${width}px` }} className="flex-shrink-0">
        {leftPanel}
      </div>
      <div
        className={`w-1 bg-border hover:bg-accent cursor-col-resize flex items-center justify-center transition-colors ${
          isDragging ? 'bg-accent' : ''
        }`}
        onMouseDown={handleMouseDown}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="pl-6 flex-1">
        {rightPanel}
      </div>
    </div>
  );
}
