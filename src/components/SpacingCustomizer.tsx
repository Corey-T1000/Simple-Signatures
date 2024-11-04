import { SignatureTemplate } from '../types/signature';
import { Label } from './ui/label';
import { Slider } from './ui/Slider';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface SpacingCustomizerProps {
  template: SignatureTemplate;
  onTemplateChange: (template: SignatureTemplate) => void;
}

export function SpacingCustomizer({ template, onTemplateChange }: SpacingCustomizerProps) {
  const handlePaddingChange = (key: keyof SignatureTemplate['padding'], value: number) => {
    onTemplateChange({
      ...template,
      padding: {
        ...template.padding,
        [key]: value
      }
    });
  };

  return (
    <Card className="animate-in scale-in shadow-lg">
      <CardHeader className="space-y-2 pb-4 border-b">
        <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Spacing Options
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Outer Spacing</Label>
            <p className="text-sm text-muted-foreground">
              Adjust the space around your signature
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4 bg-muted/10 p-4 rounded-lg">
              <Label className="text-xs text-muted-foreground">Top Space</Label>
              <div className="flex items-center gap-3">
                <Slider
                  min={0}
                  max={48}
                  step={4}
                  value={[template.padding.top]}
                  onValueChange={([value]) => handlePaddingChange('top', value)}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-8 text-center">{template.padding.top}</span>
              </div>
            </div>
            <div className="space-y-4 bg-muted/10 p-4 rounded-lg">
              <Label className="text-xs text-muted-foreground">Right Space</Label>
              <div className="flex items-center gap-3">
                <Slider
                  min={0}
                  max={48}
                  step={4}
                  value={[template.padding.right]}
                  onValueChange={([value]) => handlePaddingChange('right', value)}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-8 text-center">{template.padding.right}</span>
              </div>
            </div>
            <div className="space-y-4 bg-muted/10 p-4 rounded-lg">
              <Label className="text-xs text-muted-foreground">Bottom Space</Label>
              <div className="flex items-center gap-3">
                <Slider
                  min={0}
                  max={48}
                  step={4}
                  value={[template.padding.bottom]}
                  onValueChange={([value]) => handlePaddingChange('bottom', value)}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-8 text-center">{template.padding.bottom}</span>
              </div>
            </div>
            <div className="space-y-4 bg-muted/10 p-4 rounded-lg">
              <Label className="text-xs text-muted-foreground">Left Space</Label>
              <div className="flex items-center gap-3">
                <Slider
                  min={0}
                  max={48}
                  step={4}
                  value={[template.padding.left]}
                  onValueChange={([value]) => handlePaddingChange('left', value)}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-8 text-center">{template.padding.left}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
