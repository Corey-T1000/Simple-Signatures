import { SignatureTemplate } from '../types/signature';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { NumericSlider } from './ui/NumericSlider';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp,
  Maximize2,
  Minimize2,
  RotateCcw
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface SpacingCustomizerProps {
  template: SignatureTemplate;
  onTemplateChange: (template: SignatureTemplate) => void;
}

const defaultPadding = {
  top: 16,
  right: 16,
  bottom: 16,
  left: 16
};

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

  const handleLinkChange = (linked: boolean) => {
    if (linked) {
      // When linking, set all values to the average of current values
      const avg = Math.round(
        Object.values(template.padding).reduce((a, b) => a + b, 0) / 4
      );
      onTemplateChange({
        ...template,
        padding: {
          top: avg,
          right: avg,
          bottom: avg,
          left: avg
        }
      });
    }
  };

  const expandSpacing = () => {
    onTemplateChange({
      ...template,
      padding: {
        top: 32,
        right: 32,
        bottom: 32,
        left: 32
      }
    });
  };

  const compactSpacing = () => {
    onTemplateChange({
      ...template,
      padding: {
        top: 8,
        right: 8,
        bottom: 8,
        left: 8
      }
    });
  };

  const resetToDefault = () => {
    onTemplateChange({
      ...template,
      padding: defaultPadding
    });
  };

  const areAllValuesEqual = Object.values(template.padding).every(
    (val) => val === Object.values(template.padding)[0]
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Spacing Settings</CardTitle>
            <CardDescription>Adjust the padding around your signature elements</CardDescription>
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={compactSpacing}
                    className="h-8 w-8"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Compact spacing</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={expandSpacing}
                    className="h-8 w-8"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Expand spacing</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={resetToDefault}
                    className="h-8 w-8"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset to default</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label>Link all sides</Label>
          <Switch
            checked={areAllValuesEqual}
            onCheckedChange={handleLinkChange}
          />
        </div>

        <Separator />

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ArrowUp className="h-4 w-4" />
              <Label className="flex-1">Top Padding</Label>
              <span className="text-sm text-muted-foreground">{template.padding.top}px</span>
            </div>
            <NumericSlider
              min={0}
              max={48}
              step={4}
              value={template.padding.top}
              onChange={handleChange('top')}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              <Label className="flex-1">Right Padding</Label>
              <span className="text-sm text-muted-foreground">{template.padding.right}px</span>
            </div>
            <NumericSlider
              min={0}
              max={48}
              step={4}
              value={template.padding.right}
              onChange={handleChange('right')}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ArrowDown className="h-4 w-4" />
              <Label className="flex-1">Bottom Padding</Label>
              <span className="text-sm text-muted-foreground">{template.padding.bottom}px</span>
            </div>
            <NumericSlider
              min={0}
              max={48}
              step={4}
              value={template.padding.bottom}
              onChange={handleChange('bottom')}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <Label className="flex-1">Left Padding</Label>
              <span className="text-sm text-muted-foreground">{template.padding.left}px</span>
            </div>
            <NumericSlider
              min={0}
              max={48}
              step={4}
              value={template.padding.left}
              onChange={handleChange('left')}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
