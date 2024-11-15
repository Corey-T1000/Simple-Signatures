import type { SignatureTemplate, SignatureStyle } from '../types/signature';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowRightLeft, ArrowUpDown, Grid, Table } from 'lucide-react';
import { FieldOrderManager } from './FieldOrderManager';
import { LayoutCustomizer } from './LayoutCustomizer';

interface SignatureCustomizerProps {
  template: SignatureTemplate;
  style: SignatureStyle;
  onTemplateChange: (template: SignatureTemplate) => void;
  onStyleChange: (style: SignatureStyle) => void;
}

export function SignatureCustomizer({
  template,
  style,
  onTemplateChange,
  onStyleChange
}: SignatureCustomizerProps) {
  const handleLayoutChange = (value: 'horizontal' | 'vertical') => {
    onTemplateChange({ 
      ...template, 
      layout: value 
    });
  };

  const handleContentStyleChange = (value: 'compact' | 'spacious') => {
    onTemplateChange({ 
      ...template, 
      contentStyle: value 
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Layout Direction</Label>
              <Select value={template.layout} onValueChange={handleLayoutChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="horizontal">
                    <div className="flex items-center gap-2">
                      <ArrowRightLeft className="h-4 w-4" />
                      Horizontal
                    </div>
                  </SelectItem>
                  <SelectItem value="vertical">
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      Vertical
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Content Style</Label>
              <Select value={template.contentStyle} onValueChange={handleContentStyleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">
                    <div className="flex items-center gap-2">
                      <Grid className="h-4 w-4" />
                      Compact
                    </div>
                  </SelectItem>
                  <SelectItem value="spacious">
                    <div className="flex items-center gap-2">
                      <Table className="h-4 w-4" />
                      Spacious
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <LayoutCustomizer 
        template={template}
        onChange={onTemplateChange}
      />

      <FieldOrderManager 
        template={template}
        onTemplateChange={onTemplateChange}
      />
    </div>
  );
}
