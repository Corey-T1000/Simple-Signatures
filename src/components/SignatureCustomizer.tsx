import { SignatureStyle, SignatureTemplate } from '../types/signature';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ColorPicker } from './ui/ColorPicker';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/Slider';

interface SignatureCustomizerProps {
  style: SignatureStyle;
  template: SignatureTemplate;
  onStyleChange: (style: SignatureStyle) => void;
  onTemplateChange: (template: SignatureTemplate) => void;
}

const FONT_OPTIONS = [
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
  { value: 'system-ui, sans-serif', label: 'System UI' },
  { value: 'Roboto, sans-serif', label: 'Roboto' },
  { value: 'Inter, sans-serif', label: 'Inter' },
];

export function SignatureCustomizer({ style, template, onStyleChange, onTemplateChange }: SignatureCustomizerProps) {
  const handleStyleChange = (field: keyof SignatureStyle) => (value: string) => {
    onStyleChange({ ...style, [field]: value });
  };

  const handleTemplateChange = (key: keyof SignatureTemplate, value: unknown) => {
    onTemplateChange({
      ...template,
      [key]: value
    });
  };

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
    <Card>
      <CardHeader>
        <CardTitle>Customize Signature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Font Family</Label>
              <Select 
                value={style.fontFamily} 
                onValueChange={handleStyleChange('fontFamily')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  {FONT_OPTIONS.map(font => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Primary Color</Label>
              <ColorPicker
                color={style.primaryColor}
                onChange={handleStyleChange('primaryColor')}
              />
            </div>

            <div className="space-y-2">
              <Label>Secondary Color</Label>
              <ColorPicker
                color={style.secondaryColor}
                onChange={handleStyleChange('secondaryColor')}
              />
            </div>

            <div className="space-y-2">
              <Label>Layout</Label>
              <Select value={template.layout} onValueChange={(value) => handleTemplateChange('layout', value)}>
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
              <Select value={template.contentStyle} onValueChange={(value) => handleTemplateChange('contentStyle', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="spacious">Spacious</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Image Style</Label>
              <Select value={template.imageStyle} onValueChange={(value) => handleTemplateChange('imageStyle', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select image style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rounded">Rounded</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Image Fit</Label>
              <Select 
                value={style.imageFit} 
                onValueChange={(value) => handleStyleChange('imageFit')(value as 'cover' | 'contain' | 'fill')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cover">Cover (Crop to Fill)</SelectItem>
                  <SelectItem value="contain">Contain (Show All)</SelectItem>
                  <SelectItem value="fill">Fill (Stretch)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Image Alignment</Label>
              <Select value={template.imageAlignment} onValueChange={(value) => handleTemplateChange('imageAlignment', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select image alignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">Top/Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="end">Bottom/Right</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Image Scale</Label>
              <Slider
                min={50}
                max={200}
                step={10}
                value={[template.imageScale * 100]}
                onValueChange={([value]) => handleTemplateChange('imageScale', value / 100)}
                className="pt-2"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-icons"
                  checked={template.showIcons}
                  onCheckedChange={(checked) => handleTemplateChange('showIcons', checked)}
                />
                <Label htmlFor="show-icons">Show Icons</Label>
              </div>

              {template.showIcons && (
                <div className="space-y-2">
                  <Label>Icon Style</Label>
                  <Select 
                    value={template.iconStyle} 
                    onValueChange={(value) => handleTemplateChange('iconStyle', value)}
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
              )}
            </div>
          </div>
        </div>

        {/* Full Width Section */}
        <div className="mt-6">
          <Label>Padding</Label>
          <div className="grid grid-cols-2 gap-6 mt-2">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Top</Label>
              <Slider
                min={0}
                max={48}
                step={1}
                value={[template.padding.top]}
                onValueChange={([value]) => handlePaddingChange('top', value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Right</Label>
              <Slider
                min={0}
                max={48}
                step={1}
                value={[template.padding.right]}
                onValueChange={([value]) => handlePaddingChange('right', value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Bottom</Label>
              <Slider
                min={0}
                max={48}
                step={1}
                value={[template.padding.bottom]}
                onValueChange={([value]) => handlePaddingChange('bottom', value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Left</Label>
              <Slider
                min={0}
                max={48}
                step={1}
                value={[template.padding.left]}
                onValueChange={([value]) => handlePaddingChange('left', value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
