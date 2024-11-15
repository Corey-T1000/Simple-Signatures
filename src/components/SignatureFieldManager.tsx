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
  ChevronDown,
} from 'lucide-react';

import { DndContext, DragEndEvent, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import * as Collapsible from '@radix-ui/react-collapsible';

import { SortableField } from './SortableField';
import { SignatureTemplate, SignatureFieldType, SignatureData, ImageSettings } from '../types/signature';
import { Switch } from '../components/ui/switch';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';

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

interface SignatureFieldManagerProps {
  template: SignatureTemplate;
  data: SignatureData;
  imageSettings: ImageSettings;
  onTemplateChange: (template: SignatureTemplate) => void;
  onDataChange: (field: keyof SignatureData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageSettingsChange: (settings: Partial<ImageSettings>) => void;
}

export function SignatureFieldManager({
  template,
  data,
  imageSettings,
  onTemplateChange,
  onDataChange,
  onImageSettingsChange
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

  const items = template.fieldOrder
    .filter(field => fieldLabels[field.type])
    .map(field => field.id);

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

  const handleSpacingChange = (fieldId: string, value: number) => {
    const newFieldOrder = template.fieldOrder.map(field =>
      field.id === fieldId ? { ...field, spacing: value } : field
    );
    onTemplateChange({
      ...template,
      fieldOrder: newFieldOrder,
    });
  };

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {template.fieldOrder
              .filter(field => fieldLabels[field.type])
              .map((field) => (
                <SortableField key={field.id} id={field.id}>
                  <div className="flex-1">
                    <Collapsible.Root>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          {fieldIcons[field.type]}
                          <span className="font-medium">{fieldLabels[field.type]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {field.visible ? (
                            <Input
                              value={data[field.type as keyof SignatureData] || ''}
                              onChange={onDataChange(field.type as keyof SignatureData)}
                              placeholder={`Enter ${fieldLabels[field.type].toLowerCase()}`}
                              className="flex-1 ml-4"
                            />
                          ) : (
                            <Switch
                              checked={field.visible}
                              onCheckedChange={() => {
                                const newFieldOrder = template.fieldOrder.map(f =>
                                  f.id === field.id ? { ...f, visible: !f.visible } : f
                                );
                                onTemplateChange({
                                  ...template,
                                  fieldOrder: newFieldOrder,
                                });
                              }}
                            />
                          )}
                          <Collapsible.Trigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </Collapsible.Trigger>
                        </div>
                      </div>
                      <Collapsible.Content>
                        <div className="pt-4 space-y-4">
                          <div className="space-y-2">
                            <Label>Spacing After</Label>
                            <Slider
                              value={[field.spacing]}
                              onValueChange={([value]) => handleSpacingChange(field.id, value)}
                              min={0}
                              max={48}
                              step={4}
                            />
                          </div>
                          
                          {field.type === 'photo' && (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Shape</Label>
                                <Select
                                  value={imageSettings.shape}
                                  onValueChange={(value: 'rounded' | 'square') => 
                                    onImageSettingsChange({ shape: value })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="rounded">Rounded</SelectItem>
                                    <SelectItem value="square">Square</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              {imageSettings.shape === 'rounded' && (
                                <div className="space-y-2">
                                  <Label>Border Radius</Label>
                                  <Slider
                                    value={[imageSettings.borderRadius]}
                                    onValueChange={([value]) => 
                                      onImageSettingsChange({ borderRadius: value })
                                    }
                                    min={0}
                                    max={24}
                                    step={2}
                                  />
                                </div>
                              )}

                              <div className="space-y-2">
                                <Label>Size Scale</Label>
                                <div className="space-y-4">
                                  <Slider
                                    value={[imageSettings.scale * 100]}
                                    onValueChange={([value]) => 
                                      onImageSettingsChange({ scale: value / 100 })
                                    }
                                    min={50}
                                    max={200}
                                    step={10}
                                  />
                                  <div className="text-sm text-muted-foreground text-center">
                                    {Math.round(imageSettings.scale * 100)}%
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </Collapsible.Content>
                    </Collapsible.Root>
                  </div>
                </SortableField>
              ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
