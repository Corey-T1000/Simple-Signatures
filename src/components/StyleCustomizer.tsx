import { SignatureStyle } from '../types/signature';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import ColorPicker from './ui/ColorPicker';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { 
  Type, 
  Palette, 
  Image as ImageIcon, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface StyleCustomizerProps {
  style: SignatureStyle;
  onStyleChange: (style: SignatureStyle) => void;
}

const defaultStyle: SignatureStyle = {
  fontFamily: 'Inter, Arial,-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  primaryColor: '#0F172A',
  secondaryColor: '#3B82F6',
  imageFit: 'cover'
};

const colorPresets = {
  modern: {
    primary: '#0F172A',
    secondary: '#3B82F6'
  },
  professional: {
    primary: '#1F2937',
    secondary: '#4B5563'
  },
  vibrant: {
    primary: '#4F46E5',
    secondary: '#EC4899'
  },
  elegant: {
    primary: '#18181B',
    secondary: '#A855F7'
  },
  nature: {
    primary: '#065F46',
    secondary: '#059669'
  }
};

export function StyleCustomizer({ style, onStyleChange }: StyleCustomizerProps) {
  const handleChange = (field: keyof SignatureStyle) => (value: string) => {
    onStyleChange({
      ...style,
      [field]: value
    });
  };

  const applyColorPreset = (preset: keyof typeof colorPresets) => {
    onStyleChange({
      ...style,
      primaryColor: colorPresets[preset].primary,
      secondaryColor: colorPresets[preset].secondary
    });
  };

  const resetToDefault = () => {
    onStyleChange(defaultStyle);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Style Settings</CardTitle>
            <CardDescription>Customize the visual appearance of your signature</CardDescription>
          </div>
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
                <p>Reset to default style</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            <Label>Typography</Label>
          </div>
          <Select 
            value={style.fontFamily} 
            onValueChange={handleChange('fontFamily')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select font family" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Inter, Arial,-apple-system, BlinkMacSystemFont, system-ui, sans-serif">
                Inter
              </SelectItem>
              <SelectItem value="Arial, sans-serif">Arial</SelectItem>
              <SelectItem value="Helvetica, Arial, sans-serif">Helvetica</SelectItem>
              <SelectItem value="Georgia, serif">Georgia</SelectItem>
              <SelectItem value="'Times New Roman', Times, serif">Times New Roman</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <Label>Colors</Label>
          </div>
          
          <Tabs defaultValue="picker" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="picker">Custom</TabsTrigger>
              <TabsTrigger value="presets">Presets</TabsTrigger>
            </TabsList>
            <TabsContent value="picker" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Primary Color</Label>
                  <ColorPicker
                    color={style.primaryColor}
                    onChange={handleChange('primaryColor')}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Secondary Color</Label>
                  <ColorPicker
                    color={style.secondaryColor}
                    onChange={handleChange('secondaryColor')}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="presets">
              <RadioGroup
                defaultValue="modern"
                onValueChange={(value) => applyColorPreset(value as keyof typeof colorPresets)}
                className="grid gap-4"
              >
                {Object.entries(colorPresets).map(([name, colors]) => (
                  <div key={name} className="flex items-center space-x-2">
                    <RadioGroupItem value={name} id={name} />
                    <Label htmlFor={name} className="flex-1">
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Label>
                    <div className="flex gap-2">
                      <div
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: colors.primary }}
                      />
                      <div
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: colors.secondary }}
                      />
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </TabsContent>
          </Tabs>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <Label>Image Style</Label>
          </div>
          <Select 
            value={style.imageFit} 
            onValueChange={handleChange('imageFit')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select image fit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cover">Cover (crop to fill)</SelectItem>
              <SelectItem value="contain">Contain (show full image)</SelectItem>
              <SelectItem value="fill">Fill (stretch to fit)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
