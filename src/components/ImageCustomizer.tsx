import { ImageSettings } from '../types/signature';
import { Lock, Unlock } from 'lucide-react';
import { ColorPicker } from './ui/ColorPicker';
import { Slider } from './ui/Slider';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '../lib/utils';

interface ImageCustomizerProps {
  settings: ImageSettings;
  onChange: (settings: ImageSettings) => void;
  imageUrl?: string;
}

export function ImageCustomizer({ settings, onChange, imageUrl }: ImageCustomizerProps) {
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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Image Settings</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleChange('lockAspectRatio')(!settings.lockAspectRatio)}
          title={settings.lockAspectRatio ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
        >
          {settings.lockAspectRatio ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Width</Label>
            <Slider
              min={40}
              max={200}
              step={1}
              value={[settings.width]}
              onValueChange={([value]) => handleChange('width')(value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Height</Label>
            <Slider
              min={40}
              max={200}
              step={1}
              value={[settings.height]}
              onValueChange={([value]) => handleChange('height')(value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Rotation</Label>
            <Slider
              min={-180}
              max={180}
              step={1}
              value={[settings.rotation]}
              onValueChange={([value]) => handleChange('rotation')(value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Zoom</Label>
            <Slider
              min={100}
              max={200}
              step={10}
              value={[settings.zoom * 100]}
              onValueChange={([value]) => handleChange('zoom')(value / 100)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Object Fit</Label>
            <Select 
              value={settings.objectFit} 
              onValueChange={(value) => handleChange('objectFit')(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select object fit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contain">Contain</SelectItem>
                <SelectItem value="cover">Cover</SelectItem>
                <SelectItem value="fill">Fill</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Background Color</Label>
            <ColorPicker
              color={settings.backgroundColor}
              onChange={(color) => handleChange('backgroundColor')(color)}
            />
          </div>

          <div className="space-y-2">
            <Label>Background Opacity</Label>
            <Slider
              min={0}
              max={100}
              step={10}
              value={[settings.backgroundOpacity * 100]}
              onValueChange={([value]) => handleChange('backgroundOpacity')(value / 100)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Background Blur</Label>
            <Slider
              min={0}
              max={20}
              step={1}
              value={[settings.backgroundBlur]}
              onValueChange={([value]) => handleChange('backgroundBlur')(value)}
            />
          </div>
        </div>

        {imageUrl && (
          <div className={cn(
            "mt-4 rounded-lg overflow-hidden",
            "border border-border"
          )}>
            <div
              className="relative w-full h-40 bg-muted"
              style={{
                backgroundColor: settings.backgroundColor,
                opacity: settings.backgroundOpacity,
              }}
            >
              <img
                src={imageUrl}
                alt="Preview"
                className="absolute inset-0 w-full h-full"
                style={{
                  objectFit: settings.objectFit,
                  transform: `rotate(${settings.rotation}deg) scale(${settings.zoom})`,
                  filter: `blur(${settings.backgroundBlur}px)`,
                }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
