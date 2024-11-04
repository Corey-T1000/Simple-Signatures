import { ImageSettings } from '../types/signature';
import { ColorPicker } from './ui/ColorPicker';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Card, CardContent } from './ui/card';
import { NumericSlider } from './ui/NumericSlider';

interface ImageCustomizerProps {
  settings: ImageSettings;
  onChange: (settings: ImageSettings) => void;
}

export function ImageCustomizer({ settings, onChange }: ImageCustomizerProps) {
  const handleChange = (field: keyof ImageSettings) => (
    value: number | string | boolean
  ) => {
    const newSettings = { ...settings, [field]: value };
    
    if (field === 'width' && settings.lockAspectRatio) {
      const aspectRatio = settings.height / settings.width;
      newSettings.height = (value as number) * aspectRatio;
    }
    
    if (field === 'height' && settings.lockAspectRatio) {
      const aspectRatio = settings.width / settings.height;
      newSettings.width = (value as number) * aspectRatio;
    }
    
    onChange(newSettings);
  };

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <NumericSlider
              label="Width"
              min={40}
              max={200}
              step={1}
              value={settings.width}
              onChange={handleChange('width')}
            />
          </div>
          
          <div className="space-y-2">
            <NumericSlider
              label="Height"
              min={40}
              max={200}
              step={1}
              value={settings.height}
              onChange={handleChange('height')}
            />
          </div>
        </div>

        <div className="space-y-4">
          {/* Shape Controls */}
          <div className="space-y-2">
            <Label>Shape</Label>
            <Select 
              value={settings.shape} 
              onValueChange={(value: 'rounded' | 'square') => handleChange('shape')(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select shape" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rounded">Rounded</SelectItem>
                <SelectItem value="square">Square</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings.shape === 'rounded' && (
            <NumericSlider
              label="Corner Radius"
              min={0}
              max={50}
              step={1}
              value={settings.cornerRadius}
              onChange={handleChange('cornerRadius')}
            />
          )}

          {/* Shadow Controls */}
          <div className="flex items-center justify-between">
            <Label>Shadow</Label>
            <Switch
              checked={settings.shadow}
              onCheckedChange={(checked) => handleChange('shadow')(checked)}
            />
          </div>

          {settings.shadow && (
            <>
              <div className="space-y-2">
                <Label>Shadow Color</Label>
                <ColorPicker
                  color={settings.shadowColor}
                  onChange={(color) => handleChange('shadowColor')(color)}
                />
              </div>

              <NumericSlider
                label="Shadow Opacity"
                min={0}
                max={100}
                step={1}
                value={settings.shadowOpacity * 100}
                onChange={(value) => handleChange('shadowOpacity')(value / 100)}
              />

              <NumericSlider
                label="Shadow Blur"
                min={0}
                max={50}
                step={1}
                value={settings.shadowBlur}
                onChange={handleChange('shadowBlur')}
              />

              <NumericSlider
                label="Shadow Offset X"
                min={-50}
                max={50}
                step={1}
                value={settings.shadowOffsetX}
                onChange={handleChange('shadowOffsetX')}
              />

              <NumericSlider
                label="Shadow Offset Y"
                min={-50}
                max={50}
                step={1}
                value={settings.shadowOffsetY}
                onChange={handleChange('shadowOffsetY')}
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
