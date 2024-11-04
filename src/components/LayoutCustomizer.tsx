import { SignatureTemplate } from '../types/signature';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface LayoutCustomizerProps {
  template: SignatureTemplate;
  onTemplateChange: (template: SignatureTemplate) => void;
}

export function LayoutCustomizer({ template, onTemplateChange }: LayoutCustomizerProps) {
  const handleChange = (field: keyof SignatureTemplate) => (
    value: string | number | boolean
  ) => {
    onTemplateChange({
      ...template,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Layout Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Layout Direction</Label>
            <Select 
              value={template.layout} 
              onValueChange={(value: 'horizontal' | 'vertical') => handleChange('layout')(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horizontal">Horizontal</SelectItem>
                <SelectItem value="vertical">Vertical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Content Style</Label>
            <Select 
              value={template.contentStyle} 
              onValueChange={(value: 'compact' | 'spacious') => handleChange('contentStyle')(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select content style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="spacious">Spacious</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Title Layout</Label>
            <Select 
              value={template.titleLayout} 
              onValueChange={(value: 'stacked' | 'inline') => handleChange('titleLayout')(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select title layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stacked">Stacked</SelectItem>
                <SelectItem value="inline">Inline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>CTA Layout</Label>
            <Select 
              value={template.ctaLayout} 
              onValueChange={(value: 'stacked' | 'inline') => handleChange('ctaLayout')(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select CTA layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stacked">Stacked</SelectItem>
                <SelectItem value="inline">Inline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Icon Style</Label>
            <Select 
              value={template.iconStyle} 
              onValueChange={(value: 'outline' | 'solid') => handleChange('iconStyle')(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select icon style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="outline">Outline</SelectItem>
                <SelectItem value="solid">Solid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
