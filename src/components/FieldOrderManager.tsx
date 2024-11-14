import { useMemo } from 'react';
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
import { SortableField } from './SortableField';
import { SignatureTemplate, SignatureFieldType } from '../types/signature';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface FieldOrderManagerProps {
  template: SignatureTemplate;
  onTemplateChange: (template: SignatureTemplate) => void;
}

const fieldLabels: Record<string, string> = {
  photo: 'Profile Photo',
  fullName: 'Full Name',
  jobTitle: 'Job Title',
  company: 'Company',
  email: 'Email',
  phone: 'Phone',
  website: 'Website',
  cta: 'Call to Action',
  additionalCta: 'Additional CTA',
  'divider-1': 'Divider',
  'divider-2': 'Divider',
};

export function FieldOrderManager({ template, onTemplateChange }: FieldOrderManagerProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const items = useMemo(() => template.fieldOrder.map((field) => field.type), [template.fieldOrder]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as SignatureFieldType);
      const newIndex = items.indexOf(over.id as SignatureFieldType);

      const newFieldOrder = arrayMove([...template.fieldOrder], oldIndex, newIndex);
      onTemplateChange({
        ...template,
        fieldOrder: newFieldOrder,
      });
    }
  };

  const toggleFieldVisibility = (fieldType: string) => {
    const newFieldOrder = template.fieldOrder.map((field) =>
      field.type === fieldType ? { ...field, visible: !field.visible } : field
    );
    onTemplateChange({
      ...template,
      fieldOrder: newFieldOrder,
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Field Order & Visibility</h3>
      <div className="space-y-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {template.fieldOrder.map((field) => (
              <div
                key={field.type}
                className="flex items-center justify-between py-2 px-4 bg-white hover:bg-gray-50 rounded-lg border group"
              >
                <SortableField id={field.type}>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center cursor-grab active:cursor-grabbing">
                      <svg
                        className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="h-9 flex items-center">
                        <Label className={`${field.visible ? 'text-foreground' : 'text-muted-foreground'} select-none`}>
                          {fieldLabels[field.type]}
                          {field.required && (
                            <span className="text-xs text-muted-foreground ml-2">(Required)</span>
                          )}
                        </Label>
                      </div>
                    </div>
                    <Switch
                      checked={field.visible}
                      onCheckedChange={() => toggleFieldVisibility(field.type)}
                      disabled={field.required}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>
                </SortableField>
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </Card>
  );
}
