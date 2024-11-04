import { SignatureTemplate } from '../types/signature';
import { Card, CardContent } from './ui/card';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface TemplateSelectorProps {
  templates: SignatureTemplate[];
  selectedTemplate: SignatureTemplate;
  onSelect: (template: SignatureTemplate) => void;
}

export function TemplateSelector({
  templates,
  selectedTemplate,
  onSelect
}: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {templates.map((template) => (
        <Card
          key={template.name}
          className={cn(
            "relative cursor-pointer transition-colors hover:bg-accent",
            template.name === selectedTemplate.name && "border-primary"
          )}
          onClick={() => onSelect(template)}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {template.layout === 'horizontal' ? 'Side by side' : 'Stacked'}
                  {template.contentStyle === 'spacious' ? ', Spacious' : ', Compact'}
                </p>
              </div>
              {template.name === selectedTemplate.name && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
