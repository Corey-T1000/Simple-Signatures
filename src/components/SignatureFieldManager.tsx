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
import { SignatureTemplate, SignatureFieldType, SignatureData } from '../types/signature';
import { Card } from './UI/Card';
import { Switch } from './UI/Switch';
import { Label } from './UI/Label';
import { Input } from './UI/Input';
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
  GripVertical
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
    useSensor(PointerSensor),
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

      const newFieldOrder = arrayMove(
        template.fieldOrder.filter(field => fieldLabels[field.type]), 
        oldIndex, 
        newIndex
      );
      onTemplateChange({
        ...template,
        fieldOrder: newFieldOrder,
      });
    }
  };

  const toggleFieldVisibility = (fieldType: string) => {
    const newFieldOrder = template.fieldOrder
      .filter(field => fieldLabels[field.type])
      .map((field) =>
        field.type === fieldType ? { ...field, visible: !field.visible } : field
      );
    onTemplateChange({
      ...template,
      fieldOrder: newFieldOrder,
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
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {template.fieldOrder
              .filter(field => fieldLabels[field.type])
              .map((field) => (
              <div
                key={field.type}
                className="flex flex-col py-2 px-4 bg-background hover:bg-accent rounded-lg border group"
              >
                {!field.visible ? (
                  <div className="flex items-center justify-between">
                    <SortableField id={field.type}>
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center cursor-grab active:cursor-grabbing">
                          <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex items-center gap-2">
                          {fieldIcons[field.type]}
                          <span className="font-medium">{fieldLabels[field.type]}</span>
                          {field.required && (
                            <span className="text-xs text-muted-foreground">(Required)</span>
                          )}
                        </div>
                      </div>
                    </SortableField>
                    <Switch
                      checked={field.visible}
                      onCheckedChange={() => toggleFieldVisibility(field.type)}
                      disabled={field.required}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center cursor-grab active:cursor-grabbing">
                      <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {renderFieldInput(field.type)}
                    <Switch
                      checked={field.visible}
                      onCheckedChange={() => toggleFieldVisibility(field.type)}
                      disabled={field.required}
                    />
                  </div>
                )}
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </Card>
  );
}
