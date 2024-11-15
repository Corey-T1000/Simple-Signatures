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
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableField } from './SortableField';
import { SignatureTemplate, SignatureFieldType, SignatureData } from '../types/signature';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { 
  User, 
  Briefcase, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  Image, 
  MousePointer,
  Link,
} from 'lucide-react';

interface SignatureFieldManagerProps {
  template: SignatureTemplate;
  data: SignatureData;
  onTemplateChange: (template: SignatureTemplate) => void;
  onDataChange: (field: keyof SignatureData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const fieldIcons: Record<string, React.ReactNode> = {
  photo: <Image className="h-4 w-4" />,
  fullName: <User className="h-4 w-4" />,
  jobTitle: <Briefcase className="h-4 w-4" />,
  company: <Building2 className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  phone: <Phone className="h-4 w-4" />,
  website: <Globe className="h-4 w-4" />,
  cta: <MousePointer className="h-4 w-4" />,
  additionalCta: <Link className="h-4 w-4" />,
};

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
};

const fieldPlaceholders: Record<string, string> = {
  fullName: 'John Doe',
  jobTitle: 'Software Engineer',
  company: 'Acme Inc.',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  website: 'https://example.com',
  photo: 'https://example.com/photo.jpg',
  ctaText: 'Schedule a Meeting',
  ctaLink: 'https://calendly.com/johndoe',
  additionalCtaText: 'View Portfolio',
  additionalCtaLink: 'https://portfolio.example.com',
};

export function SignatureFieldManager({ 
  template, 
  data, 
  onTemplateChange, 
  onDataChange 
}: SignatureFieldManagerProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const items = useMemo(() => 
    template.fieldOrder
      .filter(field => fieldLabels[field.type])
      .map(field => field.type), 
    [template.fieldOrder]
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as SignatureFieldType);
      const newIndex = items.indexOf(over.id as SignatureFieldType);

      // Get only the fields that are in the items array (visible fields)
      const visibleFields = template.fieldOrder.filter(field => fieldLabels[field.type]);
      const reorderedFields = arrayMove(visibleFields, oldIndex, newIndex);

      // Preserve any fields that were filtered out
      const hiddenFields = template.fieldOrder.filter(field => !fieldLabels[field.type]);
      
      onTemplateChange({
        ...template,
        fieldOrder: [...reorderedFields, ...hiddenFields],
      });
    }
  };

  const toggleFieldVisibility = (fieldType: string) => {
    const visibleFields = template.fieldOrder.filter(field => fieldLabels[field.type]);
    const hiddenFields = template.fieldOrder.filter(field => !fieldLabels[field.type]);

    const updatedVisibleFields = visibleFields.map((field) =>
      field.type === fieldType ? { ...field, visible: !field.visible } : field
    );

    onTemplateChange({
      ...template,
      fieldOrder: [...updatedVisibleFields, ...hiddenFields],
    });
  };

  const renderFieldInput = (fieldType: string) => {
    const field = template.fieldOrder.find((f) => f.type === fieldType);
    if (!field?.visible) return null;

    switch (fieldType) {
      case 'fullName':
      case 'jobTitle':
      case 'company':
      case 'email':
      case 'phone':
      case 'website':
        return (
          <Input
            id={fieldType}
            value={data[fieldType as keyof SignatureData]}
            onChange={onDataChange(fieldType as keyof SignatureData)}
            placeholder={fieldPlaceholders[fieldType]}
            type={fieldType === 'email' ? 'email' : fieldType === 'phone' ? 'tel' : fieldType === 'website' ? 'url' : 'text'}
            className="flex-1"
          />
        );
      case 'photo':
        return (
          <Input
            id="photo"
            value={data.photo}
            onChange={onDataChange('photo')}
            placeholder={fieldPlaceholders.photo}
            type="url"
            className="flex-1"
          />
        );
      case 'cta':
        return (
          <div className="flex-1 space-y-2">
            <Input
              value={data.ctaText}
              onChange={onDataChange('ctaText')}
              placeholder={fieldPlaceholders.ctaText}
            />
            <Input
              value={data.ctaLink}
              onChange={onDataChange('ctaLink')}
              placeholder={fieldPlaceholders.ctaLink}
              type="url"
            />
          </div>
        );
      case 'additionalCta':
        return (
          <div className="flex-1 space-y-2">
            <Input
              value={data.additionalCtaText}
              onChange={onDataChange('additionalCtaText')}
              placeholder={fieldPlaceholders.additionalCtaText}
            />
            <Input
              value={data.additionalCtaLink}
              onChange={onDataChange('additionalCtaLink')}
              placeholder={fieldPlaceholders.additionalCtaLink}
              type="url"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Signature Fields</h3>
      <div className="space-y-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext  items={items} strategy={verticalListSortingStrategy}>
            {template.fieldOrder
              .filter(field => fieldLabels[field.type])
              .map((field) => (
                <SortableField key={field.type} id={field.type}>
            
                    <div className="space-y-2 h-8 w-full flex items-center justify-between">
                      {!field.visible ? (
                        <div className="flex items-center gap-2">
                          {fieldIcons[field.type]}
                          <span className="font-medium">{fieldLabels[field.type]}</span>
                        </div>
                      ) : (
                        <div className="flex flex-auto items-center gap-2">
                          {fieldIcons[field.type]}
                          {renderFieldInput(field.type)}
                        </div>
                      )}
                      <div className=""><Switch
                        checked={field.visible}
                        onCheckedChange={() => toggleFieldVisibility(field.type)}
                      /></div>
                    </div>
                  
                </SortableField>
              ))}
          </SortableContext>
        </DndContext>
      </div>
    </Card>
  );
}
