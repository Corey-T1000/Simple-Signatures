import { SignatureTemplate } from '../types/signature';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface LayoutCustomizerProps {
  template: SignatureTemplate;
  onTemplateChange: (template: SignatureTemplate) => void;
}

export function LayoutCustomizer({ template, onTemplateChange }: LayoutCustomizerProps) {
  const handleTemplateChange = (key: keyof SignatureTemplate, value: unknown) => {
    onTemplateChange({
      ...template,
      [key]: value
    });
  };

  return (
    <Card className="animate-in scale-in shadow-lg">
      <CardHeader className="space-y-2 pb-4 border-b">
        <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Layout Options
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Layout Direction</Label>
          <Select value={template.layout} onValueChange={(value) => handleTemplateChange('layout', value)}>
            <SelectTrigger className="hover-lift focus-ring">
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="horizontal">Horizontal (Photo beside text)</SelectItem>
              <SelectItem value="vertical">Vertical (Photo above text)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Content Density</Label>
          <Select value={template.contentStyle} onValueChange={(value) => handleTemplateChange('contentStyle', value)}>
            <SelectTrigger className="hover-lift focus-ring">
              <SelectValue placeholder="Select content style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compact">Compact (Minimal spacing)</SelectItem>
              <SelectItem value="spacious">Spacious (More breathing room)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Title & Company Layout</Label>
          <Select value={template.titleLayout} onValueChange={(value) => handleTemplateChange('titleLayout', value)}>
            <SelectTrigger className="hover-lift focus-ring">
              <SelectValue placeholder="Select title layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stacked">Stacked (One per line)</SelectItem>
              <SelectItem value="inline">Inline (Side by side)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">CTA Button Layout</Label>
          <Select value={template.ctaLayout} onValueChange={(value) => handleTemplateChange('ctaLayout', value)}>
            <SelectTrigger className="hover-lift focus-ring">
              <SelectValue placeholder="Select CTA layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stacked">Stacked (One per line)</SelectItem>
              <SelectItem value="inline">Inline (Side by side)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
