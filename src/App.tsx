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

  const handleImageSettingsChange = (settings: Partial<ImageSettings>) => {
    const newImageSettings = { ...imageSettings, ...settings };
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

  const handleStyleChange = (newStyle: SignatureStyle) => {
    setStyle(newStyle);
    saveToStorage({ style: newStyle });
  };

  console.log('App rendering with theme:', theme);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Simple Signatures</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              clearStorage();
              setData(defaultSignatureData);
              setStyle(defaultStyle);
              setTemplate(defaultTemplate);
              setImageSettings(defaultImageSettings);
            }}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:h-[calc(100vh-8rem)] md:sticky md:top-8">
          <SignatureCode
            template={template}
            data={data}
            style={style}
            imageSettings={imageSettings}
            theme={theme}
          />
        </div>

        <div className="space-y-8">
          <SignatureFieldManager
            template={template}
            data={data}
            style={style}
            imageSettings={imageSettings}
            onTemplateChange={handleTemplateChange}
            onDataChange={handleDataChange}
            onImageSettingsChange={handleImageSettingsChange}
            onStyleChange={handleStyleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
