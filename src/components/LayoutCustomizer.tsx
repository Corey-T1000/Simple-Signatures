import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { SignatureTemplate } from '../types/signature';
import { AlignHorizontal, AlignVertical } from 'lucide-react';
import NumericSlider from './ui/NumericSlider';

interface LayoutCustomizerProps {
  template: SignatureTemplate;
  onChange: (template: SignatureTemplate) => void;
}

export function LayoutCustomizer({ template, onChange }: LayoutCustomizerProps) {
  const handleLayoutChange = (layout: 'horizontal' | 'vertical') => {
    onChange({
      ...template,
      layout
    });
  };

  const handleImagePositionChange = (x: number, y: number) => {
    onChange({
      ...template,
      imageStyle: {
        ...template.imageStyle,
        position: { x, y }
      }
    });
  };

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label>Layout Direction</Label>
            <div className="flex items-center gap-2">
              <Button
                variant={template.layout === 'horizontal' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleLayoutChange('horizontal')}
              >
                <AlignHorizontal className="h-4 w-4 mr-2" />
                Horizontal
              </Button>
              <Button
                variant={template.layout === 'vertical' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleLayoutChange('vertical')}
              >
                <AlignVertical className="h-4 w-4 mr-2" />
                Vertical
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Image Position</Label>
            <div className="grid grid-cols-2 gap-2">
              <NumericSlider
                label="X Position"
                value={template.imageStyle?.position?.x ?? 0}
                onChange={(value) => handleImagePositionChange(value, template.imageStyle?.position?.y ?? 0)}
                min={-100}
                max={100}
                step={1}
              />
              <NumericSlider
                label="Y Position"
                value={template.imageStyle?.position?.y ?? 0}
                onChange={(value) => handleImagePositionChange(template.imageStyle?.position?.x ?? 0, value)}
                min={-100}
                max={100}
                step={1}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
