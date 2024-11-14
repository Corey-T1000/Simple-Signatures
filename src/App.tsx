import { useEffect, useState, ChangeEvent } from 'react';
import { SignatureCode } from './components/SignatureCode';
import { ExportOptions } from './components/ExportOptions';
import { SignatureFieldManager } from './components/SignatureFieldManager';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { Switch } from './components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { NumericInput } from './components/ui/NumericInput';
import { SignatureData, SignatureStyle, SignatureTemplate, ImageSettings, Theme } from './types/signature';
import { defaultSignatureData, defaultStyle, defaultTemplate, defaultImageSettings } from './lib/defaults';
import { saveToStorage, getFromStorage } from './lib/storage';
import { ImageIcon, Moon, Sun } from 'lucide-react';

function App() {
  const [data, setData] = useState<SignatureData>(defaultSignatureData);
  const [style, setStyle] = useState<SignatureStyle>(defaultStyle);
  const [template, setTemplate] = useState<SignatureTemplate>(defaultTemplate);
  const [imageSettings, setImageSettings] = useState<ImageSettings>(defaultImageSettings);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = getFromStorage();
    if (saved.data) setData(saved.data);
    if (saved.style) setStyle(saved.style);
    if (saved.template) setTemplate(saved.template);
    if (saved.imageSettings) setImageSettings(saved.imageSettings);
    if (saved.theme) setTheme(saved.theme);
    if (saved.theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleDataChange = (field: keyof SignatureData) => (e: ChangeEvent<HTMLInputElement>) => {
    const newData = { ...data, [field]: e.target.value };
    setData(newData);
    saveToStorage({ data: newData });
  };

  const handleLayoutChange = (value: 'horizontal' | 'vertical') => {
    const newTemplate = { ...template, layout: value };
    setTemplate(newTemplate);
    saveToStorage({ template: newTemplate });
  };

  const handleContentStyleChange = (value: 'compact' | 'spacious') => {
    const newTemplate = { ...template, contentStyle: value };
    setTemplate(newTemplate);
    saveToStorage({ template: newTemplate });
  };

  const handleImageStyleChange = (value: 'rounded' | 'square') => {
    const newTemplate = { ...template, imageStyle: value };
    setTemplate(newTemplate);
    saveToStorage({ template: newTemplate });
  };

  const handleImageAlignmentChange = (value: 'start' | 'center' | 'end') => {
    const newTemplate = { ...template, imageAlignment: value };
    setTemplate(newTemplate);
    saveToStorage({ template: newTemplate });
  };

  const handleImageFitChange = (value: 'cover' | 'contain' | 'fill') => {
    const newStyle = { ...style, imageFit: value };
    setStyle(newStyle);
    saveToStorage({ style: newStyle });
  };

  const handleImageSettingsChange = (field: keyof ImageSettings, value: any) => {
    const newSettings = { ...imageSettings, [field]: value };
    setImageSettings(newSettings);
    saveToStorage({ imageSettings: newSettings });
  };

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    saveToStorage({ theme: newTheme });
  };

  const handleReset = () => {
    setData(defaultSignatureData);
    setStyle(defaultStyle);
    setTemplate(defaultTemplate);
    setImageSettings(defaultImageSettings);
    setTheme('light');
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('signature-preferences');
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Signature Customizer</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" onClick={handleReset}>Reset</Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            {/* Details Form */}
            <SignatureFieldManager
              data={data}
              template={template}
              onDataChange={handleDataChange}
              onTemplateChange={(newTemplate) => {
                setTemplate(newTemplate);
                saveToStorage({ template: newTemplate });
              }}
            />

            {/* Layout Options */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold">Layout</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Direction</Label>
                  <Select
                    value={template.layout}
                    onValueChange={handleLayoutChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="horizontal">Horizontal</SelectItem>
                      <SelectItem value="vertical">Vertical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Content Style</Label>
                  <Select
                    value={template.contentStyle}
                    onValueChange={handleContentStyleChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Typography & Colors */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold">Typography & Colors</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Select
                    value={style.fontFamily}
                    onValueChange={(fontFamily) => {
                      const newStyle = { ...style, fontFamily };
                      setStyle(newStyle);
                      saveToStorage({ style: newStyle });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter, Arial, -apple-system, BlinkMacSystemFont, system-ui, sans-serif">
                        Inter
                      </SelectItem>
                      <SelectItem value="Arial, -apple-system, BlinkMacSystemFont, system-ui, sans-serif">
                        Arial
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <Input
                    type="color"
                    value={style.primaryColor}
                    onChange={(e) => {
                      const newStyle = { ...style, primaryColor: e.target.value };
                      setStyle(newStyle);
                      saveToStorage({ style: newStyle });
                    }}
                    className="h-10 px-2 py-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <Input
                    type="color"
                    value={style.secondaryColor}
                    onChange={(e) => {
                      const newStyle = { ...style, secondaryColor: e.target.value };
                      setStyle(newStyle);
                      saveToStorage({ style: newStyle });
                    }}
                    className="h-10 px-2 py-1"
                  />
                </div>
              </div>
            </Card>

            {/* Image Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="h-5 w-5" />
                <h3 className="font-semibold">Image Settings</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Enable Image</Label>
                    <Switch
                      checked={imageSettings.enabled}
                      onCheckedChange={(checked) => handleImageSettingsChange('enabled', checked)}
                    />
                  </div>
                </div>

                {imageSettings.enabled && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Image Style</Label>
                      <Select
                        value={template.imageStyle}
                        onValueChange={handleImageStyleChange}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rounded">Rounded</SelectItem>
                          <SelectItem value="square">Square</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Image Alignment</Label>
                      <Select
                        value={template.imageAlignment}
                        onValueChange={handleImageAlignmentChange}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="start">Start</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="end">End</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Image Fit</Label>
                      <Select
                        value={style.imageFit}
                        onValueChange={handleImageFitChange}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cover">Cover</SelectItem>
                          <SelectItem value="contain">Contain</SelectItem>
                          <SelectItem value="fill">Fill</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Image Scale</Label>
                      <NumericInput
                        value={template.imageScale}
                        onChange={(value) => {
                          const newTemplate = { ...template, imageScale: value };
                          setTemplate(newTemplate);
                          saveToStorage({ template: newTemplate });
                        }}
                        min={0.1}
                        max={2}
                        step={0.1}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Preview */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold">Preview</h3>
              </div>
              <SignatureCode
                data={data}
                style={style}
                template={template}
                imageSettings={imageSettings}
              />
            </Card>

            {/* Export Options */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold">Export</h3>
              </div>
              <ExportOptions
                data={data}
                style={style}
                template={template}
              />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
