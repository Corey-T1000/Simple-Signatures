import { useEffect, useState } from 'react';
import { SignaturePreview } from './components/SignaturePreview';
import { SignatureCode } from './components/SignatureCode';
import { ImportSignature } from './components/ImportSignature';
import { SignatureCustomizer } from './components/SignatureCustomizer';
import { ExportOptions } from './components/ExportOptions';
import { SignatureData, SignatureStyle, SignatureTemplate, ImageSettings } from './types/signature';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { MoonIcon, SunIcon, RotateCcw } from 'lucide-react';
import { Button } from "./components/ui/button";
import { cn } from './lib/utils';
import { getFromStorage, saveToStorage, clearStorage } from './lib/storage';
import { ThemeProvider, Theme } from './lib/theme-context';
import { defaultData, defaultStyle, defaultTemplate, defaultImageSettings } from './lib/defaults';
import ErrorBoundary from './components/ErrorBoundary';
import { SignatureForm } from './components/SignatureForm';

const validateTemplate = (template?: Partial<SignatureTemplate>): SignatureTemplate => {
  if (!template) return defaultTemplate;
  return {
    ...defaultTemplate,
    ...template,
    padding: {
      ...defaultTemplate.padding,
      ...template.padding
    }
  };
};

function App() {
  const [data, setData] = useState<SignatureData>(() => {
    const savedData = getFromStorage();
    return savedData.data ? { ...defaultData, ...savedData.data } : defaultData;
  });
  const [style, setStyle] = useState<SignatureStyle>(() => {
    const savedData = getFromStorage();
    return savedData.style ? { ...defaultStyle, ...savedData.style } : defaultStyle;
  });
  const [template, setTemplate] = useState<SignatureTemplate>(() => {
    const savedData = getFromStorage();
    return savedData.template ? validateTemplate(savedData.template) : defaultTemplate;
  });
  const [imageSettings, setImageSettings] = useState<ImageSettings>(() => {
    const savedData = getFromStorage();
    return savedData.imageSettings ? { ...defaultImageSettings, ...savedData.imageSettings } : defaultImageSettings;
  });
  const [theme, setTheme] = useState<Theme>(() => {
    const savedData = getFromStorage();
    return savedData.theme ? savedData.theme as Theme : 'light';
  });

  useEffect(() => {
    const savedData = getFromStorage();
    if (savedData.theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleDataChange = (field: keyof SignatureData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newData = {
      ...data,
      [field]: e.target.value
    };
    setData(newData);
    saveToStorage({ data: newData });
  };

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    saveToStorage({ theme: newTheme });
  };

  const handleStyleChange = (newStyle: SignatureStyle) => {
    setStyle(newStyle);
    saveToStorage({ style: newStyle });
  };

  const handleTemplateChange = (newTemplate: SignatureTemplate) => {
    const validatedTemplate = validateTemplate(newTemplate);
    setTemplate(validatedTemplate);
    saveToStorage({ template: validatedTemplate });
  };

  const handleImageSettingsChange = (newSettings: ImageSettings) => {
    setImageSettings(newSettings);
    saveToStorage({ imageSettings: newSettings });
  };

  const handleImport = (
    importedData: SignatureData,
    importedStyle: SignatureStyle,
    importedTemplate: SignatureTemplate
  ) => {
    setData(importedData);
    setStyle(importedStyle);
    setTemplate(validateTemplate(importedTemplate));
    saveToStorage({ 
      data: importedData,
      style: importedStyle,
      template: importedTemplate
    });
  };

  const handleReset = () => {
    clearStorage();
    setData(defaultData);
    setStyle(defaultStyle);
    setTemplate(defaultTemplate);
    setImageSettings(defaultImageSettings);
    setTheme('light');
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={cn(
        "min-h-screen bg-background",
        "transition-colors duration-300"
      )}>
        <div className="sticky top-0 z-50 bg-background border-b">
          <div className="container py-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl uppercase tracking-widest font-semibold">
                Simple Signature
              </h1>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleReset}
                  title="Reset to Default"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === 'light' ? (
                    <MoonIcon className="h-5 w-5" />
                  ) : (
                    <SunIcon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
            <ErrorBoundary>
              <SignaturePreview
                data={data}
                style={style}
                template={template}
                imageSettings={imageSettings}
              />
            </ErrorBoundary>
          </div>
        </div>

        <div className="container py-8">
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="customize">Customize</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <ErrorBoundary>
                <SignatureForm
                  data={data}
                  onDataChange={handleDataChange}
                />
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="customize">
              <ErrorBoundary>
                <SignatureCustomizer
                  template={template}
                  style={style}
                  imageSettings={imageSettings}
                  onTemplateChange={handleTemplateChange}
                  onStyleChange={handleStyleChange}
                  onImageSettingsChange={handleImageSettingsChange}
                />
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="output">
              <ErrorBoundary>
                <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <SignatureCode
                        data={data}
                        style={style}
                        template={template}
                        imageSettings={imageSettings}
                      /></Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Import</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ImportSignature onImport={handleImport} />
                    </CardContent>
                  </Card>
                </div>
              </ErrorBoundary>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
