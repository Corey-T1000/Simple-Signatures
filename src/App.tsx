import { useEffect, useState } from 'react';
import { SignatureCode } from './components/SignatureCode';
import { SignatureFieldManager } from './components/SignatureFieldManager';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { NumericInput } from './components/ui/numeric-input';
import { SignatureData, SignatureStyle, SignatureTemplate, ImageSettings, Theme } from './types/signature';
import { defaultSignatureData, defaultStyle, defaultTemplate, defaultImageSettings } from './lib/defaults';
import { saveToStorage, getFromStorage, clearStorage } from './lib/storage';
import { ImageIcon, Moon, Sun, RotateCcw, Palette } from 'lucide-react';
import { ResizablePanel } from './components/ui/resizable-panel';
import { Eye, Settings2 } from 'lucide-react';
import { emailSafeFonts } from './lib/fonts';
import { ColorCustomizer } from './components/ColorCustomizer';

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
    document.documentElement.classList.toggle('dark', savedState?.theme === 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    saveToStorage({ theme });
  }, [theme]);

  const handleTemplateChange = (newTemplate: SignatureTemplate) => {
    setTemplate(newTemplate);
    saveToStorage({ template: newTemplate });
  };

  const handleImageStyleChange = (value: 'rounded' | 'square') => {
    setImageSettings({ ...imageSettings, shape: value });
    saveToStorage({ imageSettings: { ...imageSettings, shape: value } });
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

  const handleReset = () => {
    setData(defaultSignatureData);
    setStyle(defaultStyle);
    setTemplate(defaultTemplate);
    setImageSettings(defaultImageSettings);
    clearStorage();
  };

  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleDataChange = (field: keyof SignatureData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...data, [field]: e.target.value };
    setData(newData);
    saveToStorage({ data: newData });
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
              <Button
                variant="outline"
                size="icon"
                onClick={handleThemeToggle}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleReset}>
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <ResizablePanel
          defaultWidth={600}
          minWidth={400}
          maxWidth={800}
          leftPanel={
            <div className="space-y-8 pr-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <h2 className="font-semibold text-lg">Preview</h2>
                </div>
                <SignatureCode
                  data={data}
                  style={style}
                  template={template}
                  imageSettings={imageSettings}
                  theme={theme}
                />
              </div>
            </div>
          }
          rightPanel={
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Settings2 className="h-5 w-5" />
                  <h2 className="font-semibold text-lg">Settings</h2>
                </div>
                <SignatureFieldManager
                  template={template}
                  data={data}
                  onTemplateChange={handleTemplateChange}
                  onDataChange={handleDataChange}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <h2 className="font-semibold text-lg">Style</h2>
                </div>
                <div className="space-y-6">
                  <ColorCustomizer
                    style={style}
                    onStyleChange={setStyle}
                  />

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
                        {emailSafeFonts.map((font) => (
                          <SelectItem 
                            key={font.value} 
                            value={font.value}
                            style={{ fontFamily: font.value }}
                          >
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        value={imageSettings.shape}
                        onValueChange={(value) => setImageSettings({ ...imageSettings, shape: value as 'rounded' | 'square' })}
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
          }
        />
      </div>
    </div>
  );
}

export default App;
