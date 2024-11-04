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
} from '@dnd-kit/sortable';
import { Switch } from './ui/switch';
import { SignatureElement } from '../types/signature';

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

interface Props {
  onChange: (elements: SignatureElement[]) => void;
}

export function SignatureElementsOrder({ onChange }: Props) {
  const [elements, setElements] = useState<SignatureElement[]>(defaultElements);

  const sensors = useSensors(
    useSensor(PointerSensor),
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
        <div className="space-y-2">
          {elements.map((element) => (
            <div
              key={element.id}
              className="flex items-center justify-between p-2 bg-background border rounded-md"
            >
              <span className="text-sm font-medium">
                {element.label}
              </span>
              <Switch
                checked={element.visible}
                onCheckedChange={(checked: boolean) => handleVisibilityChange(element.id, checked)}
                disabled={element.required}
              />
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
