import { ImageSettings } from '../types/signature';
import ColorPicker from './ui/ColorPicker';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Card, CardContent } from './ui/card';
import NumericSlider from './ui/NumericSlider';

interface ImageCustomizerProps {
  settings: ImageSettings;
  onChange: (settings: ImageSettings) => void;
}

export function ImageCustomizer({ settings, onChange }: ImageCustomizerProps) {
  const handleChange = (key: keyof ImageSettings) => (value: any) => {
    onChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Enable Shadow</Label>
            <Switch
              checked={settings.shadow}
              onCheckedChange={handleChange('shadow')}
            />
          </div>

          {settings.shadow && (
            <>
              <ColorPicker
                value={settings.shadowColor}
                onChange={handleChange('shadowColor')}
                label="Shadow Color"
              />
              <NumericSlider
                value={settings.shadowOpacity}
                onChange={handleChange('shadowOpacity')}
                min={0}
                max={1}
                step={0.1}
                label="Shadow Opacity"
              />
              <NumericSlider
                value={settings.shadowBlur}
                onChange={handleChange('shadowBlur')}
                min={0}
                max={50}
                step={1}
                label="Shadow Blur"
              />
              <NumericSlider
                value={settings.shadowOffsetX}
                onChange={handleChange('shadowOffsetX')}
                min={-50}
                max={50}
                step={1}
                label="Shadow X Offset"
              />
              <NumericSlider
                value={settings.shadowOffsetY}
                onChange={handleChange('shadowOffsetY')}
                min={-50}
                max={50}
                step={1}
                label="Shadow Y Offset"
              />
            </>
          )}
          <div className="space-y-2">
            <ColorPicker
              value={settings.backgroundColor}
              onChange={handleChange('backgroundColor')}
              label="Background Color"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
