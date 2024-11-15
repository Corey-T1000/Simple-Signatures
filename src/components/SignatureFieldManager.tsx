import { useMemo } from 'react';
import { 
  User, 
  Briefcase, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  Image, 
  Link,
  MapPin,
  Share,
} from 'lucide-react';

import { DndContext, DragEndEvent, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import { SortableField } from './SortableField';
import { SignatureTemplate, SignatureFieldType, SignatureData, SignatureField } from '../types/signature';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface SignatureFieldManagerProps {
  template: SignatureTemplate;
  data: SignatureData;
  onTemplateChange: (template: SignatureTemplate) => void;
  onDataChange: (field: keyof SignatureData) => (value: string) => void;
}

const fieldIcons: Record<SignatureFieldType, React.ReactNode> = {
  photo: <Image className="h-4 w-4" />,
  fullName: <User className="h-4 w-4" />,
  jobTitle: <Briefcase className="h-4 w-4" />,
  company: <Building2 className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  phone: <Phone className="h-4 w-4" />,
  website: <Globe className="h-4 w-4" />,
  cta: <Link className="h-4 w-4" />,
  additionalCta: <Link className="h-4 w-4" />,
  address: <MapPin className="h-4 w-4" />,
  socialLinks: <Share className="h-4 w-4" />,
};

const fieldLabels: Record<SignatureFieldType, string> = {
  photo: 'Photo',
  fullName: 'Full Name',
  jobTitle: 'Job Title',
  company: 'Company',
  email: 'Email',
  phone: 'Phone',
  website: 'Website',
  cta: 'Call to Action',
  additionalCta: 'Additional CTA',
  address: 'Address',
  socialLinks: 'Social Links',
};

export function SignatureFieldManager({ 
  template, 
  data, 
  onTemplateChange, 
  onDataChange 
}: SignatureFieldManagerProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = template.fieldOrder.findIndex(field => field.id === active.id);
      const newIndex = template.fieldOrder.findIndex(field => field.id === over.id);

      onTemplateChange({
        ...template,
        fieldOrder: arrayMove(template.fieldOrder, oldIndex, newIndex),
      });
    }
  };

  const toggleField = (fieldType: SignatureFieldType) => {
    const existingField = template.fieldOrder.find(field => field.type === fieldType);
    let newFieldOrder: SignatureField[];

    if (existingField) {
      newFieldOrder = template.fieldOrder.filter(field => field.type !== fieldType);
    } else {
      const newField: SignatureField = {
        type: fieldType,
        enabled: true,
        visible: true,
        id: `${fieldType}-${Date.now()}`,
        spacing: 16,
      };
      newFieldOrder = [...template.fieldOrder, newField];
    }

    onTemplateChange({
      ...template,
      fieldOrder: newFieldOrder,
    });
  };

  const handleFieldChange = (field: keyof SignatureData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange(field)(e.target.value);
  };

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={template.fieldOrder.map(field => field.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {template.fieldOrder.map((field) => (
              <SortableField
                key={field.id}
                id={field.id}
                icon={fieldIcons[field.type]}
                label={fieldLabels[field.type]}
                value={data[field.type] || ''}
                onChange={handleFieldChange(field.type)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Card className="p-4">
        <h3 className="text-sm font-medium mb-2">Available Fields</h3>
        <div className="space-y-2">
          {Object.keys(fieldIcons).map((fieldType) => {
            const isEnabled = template.fieldOrder.some(field => field.type === fieldType);
            return (
              <div
                key={fieldType}
                className="flex items-center justify-between py-1"
              >
                <div className="flex items-center gap-2">
                  {fieldIcons[fieldType as SignatureFieldType]}
                  <span className="text-sm">{fieldLabels[fieldType as SignatureFieldType]}</span>
                </div>
                <Switch
                  checked={isEnabled}
                  onCheckedChange={() => toggleField(fieldType as SignatureFieldType)}
                />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
