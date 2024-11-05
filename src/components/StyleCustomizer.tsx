import { SignatureStyle } from '../types/signature';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ColorPicker } from './ui/ColorPicker';

interface StyleCustomizerProps {
  style: SignatureStyle;
  onStyleChange: (style: SignatureStyle) => void;
}

export function StyleCustomizer({ style, onStyleChange }: StyleCustomizerProps) {
  const handleChange = (field: keyof SignatureStyle) => (value: string) => {
    onStyleChange({
      ...style,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Style Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Font Family</Label>
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
        </div>
      </CardContent>
    </Card>
  );
}
