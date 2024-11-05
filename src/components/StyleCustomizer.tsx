import { SignatureStyle } from '../types/signature';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ColorPicker } from './ui/ColorPicker';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface StyleCustomizerProps {
  style: SignatureStyle;
  onStyleChange: (style: SignatureStyle) => void;
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

export function StyleCustomizer({ style, onStyleChange }: StyleCustomizerProps) {
  const handleStyleChange = (field: keyof SignatureStyle) => (value: string) => {
    onStyleChange({ ...style, [field]: value });
  };

  return (
    <Card className="animate-in scale-in shadow-lg">
      <CardHeader className="space-y-2 pb-4 border-b">
        <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Style Options
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Font Family</Label>
          <Select 
            value={style.fontFamily} 
            onValueChange={handleStyleChange('fontFamily')}
          >
            <SelectTrigger className="hover-lift focus-ring">
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

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Name Color</Label>
            <ColorPicker
              color={style.primaryColor}
              onChange={handleStyleChange('primaryColor')}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Text Color</Label>
            <ColorPicker
              color={style.secondaryColor}
              onChange={handleStyleChange('secondaryColor')}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
