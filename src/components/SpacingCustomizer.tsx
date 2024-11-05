import { SignatureTemplate } from '../types/signature';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { NumericSlider } from './ui/NumericSlider';

interface SpacingCustomizerProps {
  template: SignatureTemplate;
  onTemplateChange: (template: SignatureTemplate) => void;
}

export function SpacingCustomizer({ template, onTemplateChange }: SpacingCustomizerProps) {
  const handleChange = (field: keyof SignatureTemplate['padding']) => (value: number) => {
    onTemplateChange({
      ...template,
      padding: {
        ...template.padding,
        [field]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spacing Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <NumericSlider
            label="Top Padding"
            min={0}
            max={40}
            step={4}
            value={template.padding.top}
            onChange={handleChange('top')}
          />

          <NumericSlider
            label="Right Padding"
            min={0}
            max={40}
            step={4}
            value={template.padding.right}
            onChange={handleChange('right')}
          />

          <NumericSlider
            label="Bottom Padding"
            min={0}
            max={40}
            step={4}
            value={template.padding.bottom}
            onChange={handleChange('bottom')}
          />

          <NumericSlider
            label="Left Padding"
            min={0}
            max={40}
            step={4}
            value={template.padding.left}
            onChange={handleChange('left')}
          />
        </div>
      </CardContent>
    </Card>
  );
}
