import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Switch } from './ui/switch';
import { SignatureElement } from '../types/signature';
import { GripVertical } from 'lucide-react';
import { cn } from '../lib/utils';

const defaultElements: SignatureElement[] = [
  { id: 'photo', type: 'photo', label: 'Photo', visible: true },
  { id: 'fullName', type: 'fullName', label: 'Full Name', visible: true, required: true },
  { id: 'jobTitle', type: 'jobTitle', label: 'Job Title', visible: true },
  { id: 'company', type: 'company', label: 'Company', visible: true },
  { id: 'phone', type: 'phone', label: 'Phone', visible: true },
  { id: 'cta', type: 'cta', label: 'Primary CTA', visible: true },
  { id: 'additionalCta', type: 'additionalCta', label: 'Secondary CTA', visible: true },
  { id: 'divider', type: 'divider', label: 'Divider', visible: true },
];

interface SortableItemProps {
  element: SignatureElement;
  onVisibilityChange: (id: string, checked: boolean) => void;
}

function SortableItem({ element, onVisibilityChange }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center justify-between p-3 bg-background border rounded-lg",
        "hover:border-accent/50 transition-colors duration-200",
        "group relative",
        isDragging && "shadow-lg scale-[1.02] bg-accent/5 border-accent",
      )}
    >
      <div className="flex items-center gap-3 flex-1">
        <button
          {...attributes}
          {...listeners}
          className={cn(
            "touch-none p-1 rounded-md hover:bg-accent/10 transition-colors duration-200",
            "text-muted-foreground hover:text-accent-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isDragging && "text-accent-foreground"
          )}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <span className={cn(
          "text-sm font-medium transition-colors duration-200",
          isDragging && "text-accent-foreground"
        )}>
          {element.label}
        </span>
      </div>
      <Switch
        checked={element.visible}
        onCheckedChange={(checked: boolean) => onVisibilityChange(element.id, checked)}
        disabled={element.required}
        className="data-[state=checked]:bg-success"
      />
    </div>
  );
}

interface Props {
  onChange: (elements: SignatureElement[]) => void;
}

export function SignatureElementsOrder({ onChange }: Props) {
  const [elements, setElements] = useState<SignatureElement[]>(defaultElements);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setElements((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        const newElements = arrayMove(items, oldIndex, newIndex);
        onChange(newElements);
        return newElements;
      });
    }
  };

  const handleVisibilityChange = (id: string, checked: boolean) => {
    setElements((items) =>
      items.map((item) =>
        item.id === id ? { ...item, visible: checked } : item
      )
    );
    onChange(elements);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={elements}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2 animate-in">
          {elements.map((element) => (
            <SortableItem
              key={element.id}
              element={element}
              onVisibilityChange={handleVisibilityChange}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
