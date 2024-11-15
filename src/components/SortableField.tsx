import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableFieldProps {
  id: string;
  children: React.ReactNode;
}

export function SortableField({ id, children }: SortableFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`relative flex items-center p-4 bg-background hover:bg-accent/50 rounded-lg border group transition-colors duration-200 touch-none ${
        isDragging ? 'opacity-50 bg-accent z-50 shadow-lg' : ''
      }`}
    >
      <button
        className="absolute left-2 cursor-grab active:cursor-grabbing focus:outline-none"
        {...listeners}
      >
        <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
      <div className="flex-1 pl-6">
        {children}
      </div>
    </div>
  );
}
