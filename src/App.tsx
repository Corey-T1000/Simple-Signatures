import { useEffect, useState } from 'react';
import { SignatureCode } from './components/SignatureCode';
import { ExportOptions } from './components/ExportOptions';
import { SignatureFieldManager } from './components/SignatureFieldManager';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { Switch } from './components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { NumericInput } from './components/ui/numeric-input';
import { SignatureData, SignatureStyle, SignatureTemplate, ImageSettings, Theme } from './types/signature';
import { defaultSignatureData, defaultStyle, defaultTemplate, defaultImageSettings } from './lib/defaults';
import { saveToStorage, getFromStorage } from './lib/storage';
import { ImageIcon, Moon, Sun, RotateCcw, Code, Palette } from 'lucide-react';

function App() {
  const [data, setData] = useState<SignatureData>(defaultSignatureData);
  const [style, setStyle] = useState<SignatureStyle>(defaultStyle);
  const [template, setTemplate] = useState<SignatureTemplate>(defaultTemplate);
  const [imageSettings, setImageSettings] = useState<ImageSettings>(defaultImageSettings);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedState = getFromStorage();
    if (savedState) {
      if (savedState.data) setData(savedState.data);
      if (savedState.style) setStyle(savedState.style);
      if (savedState.template) setTemplate(savedState.template);
      if (savedState.imageSettings) setImageSettings(savedState.imageSettings);
      if (savedState.theme) setTheme(savedState.theme);
    }
  }, []);

  const handleTemplateChange = (newTemplate: SignatureTemplate) => {
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

  const handleImageSettingsChange = (key: keyof ImageSettings, value: boolean | string) => {
    const newImageSettings = { ...imageSettings, [key]: value };
    setImageSettings(newImageSettings);
    saveToStorage({ imageSettings: newImageSettings });
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
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
    <div className="min-h-screen bg-background text-foreground antialiased">
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold">Simple Signatures</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleReset}>
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-screen-2xl pb-8 pt-6">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Left Column - Fixed Preview */}
          <div className="md:w-[400px] md:sticky md:top-[4.5rem] md:h-[calc(100vh-6rem)] border-r">
            <div className="space-y-8 pr-6">
              <div className="space-y-4">
                <h2 className="font-semibold text-lg">Preview</h2>
                <SignatureCode
                  data={data}
                  style={style}
                  template={template}
                  imageSettings={imageSettings}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <h2 className="font-semibold text-lg">Export Options</h2>
                </div>
                <ExportOptions
                  data={data}
                  style={style}
                  template={template}
                  imageSettings={imageSettings}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Scrollable Settings */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
        
              <SignatureFieldManager
                template={template}
                data={data}
                onTemplateChange={handleTemplateChange}
                onDataChange={(field) => (e) => {
                  const newData = { ...data, [field]: e.target.value };
                  setData(newData);
                  saveToStorage({ data: newData });
                }}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <h2 className="font-semibold text-lg">Style Customizer</h2>
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
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <ImageIcon className="h-5 w-5" />
                <h2 className="font-semibold text-lg">Image Settings</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Enable Image</Label>
                  <Switch
                    checked={imageSettings.enabled}
                    onCheckedChange={(checked) => handleImageSettingsChange('enabled', checked)}
                  />
                </div>
              </div>
            </div>

            {imageSettings.enabled && (
              <>
                <div className="space-y-4">
                  <h2 className="font-semibold text-lg">Image Style & Alignment</h2>
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
                </div>

                <div className="space-y-4">
                  <h2 className="font-semibold text-lg">Image Fit & Scale</h2>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
