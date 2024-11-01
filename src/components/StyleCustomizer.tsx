import { SignatureStyle } from '../types/signature';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ColorPicker } from './ui/ColorPicker';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface StyleCustomizerProps {
  style: SignatureStyle;
  onChange: (style: SignatureStyle) => void;
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

export function StyleCustomizer({ style, onChange }: StyleCustomizerProps) {
  const handleChange = (field: keyof SignatureStyle) => (value: string) => {
    onChange({ ...style, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Style Customization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Font Family</Label>
          <Select 
            value={style.fontFamily} 
            onValueChange={handleChange('fontFamily')}
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
            onChange={handleChange('primaryColor')}
          />
        </div>

        <div className="space-y-2">
          <Label>Secondary Color</Label>
          <ColorPicker
            color={style.secondaryColor}
            onChange={handleChange('secondaryColor')}
          />
        </div>

        <div className="space-y-2">
          <Label>Image Fit</Label>
          <Select 
            value={style.imageFit} 
            onValueChange={(value) => handleChange('imageFit')(value as 'cover' | 'contain' | 'fill')}
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
      </CardContent>
    </Card>
  );
}
