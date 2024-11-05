import { useEffect, useState } from 'react';
import { SignaturePreview } from './components/SignaturePreview';
import { SignatureCode } from './components/SignatureCode';
import { ImportSignature } from './components/ImportSignature';
import { LayoutCustomizer } from './components/LayoutCustomizer';
import { SpacingCustomizer } from './components/SpacingCustomizer';
import { StyleCustomizer } from './components/StyleCustomizer';
import { ImageCustomizer } from './components/ImageCustomizer';
import { SignatureData, SignatureStyle, SignatureTemplate, ImageSettings } from './types/signature';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { cn } from './lib/utils';
import { Input } from './components/ui/Input';
import { Label } from './components/ui/label';
import { getFromStorage, saveToStorage } from './lib/storage';
import { ThemeProvider, Theme } from './lib/theme-context';

const defaultData: SignatureData = {
  fullName: 'Paul Atreides',
  jobTitle: 'Duke of House Atreides',
  company: 'Arrakis Spice Operations',
  email: 'paul@arrakis.dune',
  phone: '+1 (555) MELANGE',
  website: 'https://arrakis.dune',
  photo: 'https://images.unsplash.com/photo-1729067915069-fb84564ca0ec?auto=format&fit=crop&w=200&h=200',
  ctaText: 'Join the Spice Revolution',
  ctaLink: 'https://arrakis.dune/join',
  additionalCtaText: 'Learn About Spice Mining',
  additionalCtaLink: 'https://arrakis.dune/spice'
};

const defaultStyle: SignatureStyle = {
  fontFamily: 'Inter, Arial,-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  primaryColor: '#0F172A',
  secondaryColor: '#3B82F6',
  imageFit: 'cover'
};

const defaultTemplate: SignatureTemplate = {
  name: 'modern',
  layout: 'horizontal',
  imageStyle: 'rounded',
  contentStyle: 'compact',
  titleLayout: 'stacked',
  ctaLayout: 'stacked',
  imageAlignment: 'start',
  imageScale: 0.7,
  imageFit: 'cover',
  imageSpacing: 16,
  padding: {
    top: 12,
    right: 0,
    bottom: 12,
    left: 0
  }
};

const defaultImageSettings: ImageSettings = {
  width: 100,
  height: 100,
  objectFit: 'cover',
  lockAspectRatio: true,
  shadow: false,
  shadowColor: '#000000',
  shadowOpacity: 0.2,
  shadowBlur: 10,
  shadowOffsetX: 0,
  shadowOffsetY: 4,
  shape: 'rounded',
  cornerRadius: 8
};

function App() {
  const [data, setData] = useState<SignatureData>(defaultData);
  const [style, setStyle] = useState<SignatureStyle>(defaultStyle);
  const [template, setTemplate] = useState<SignatureTemplate>(defaultTemplate);
  const [imageSettings, setImageSettings] = useState<ImageSettings>(defaultImageSettings);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedData = getFromStorage();
    if (savedData.theme) setTheme(savedData.theme as Theme);
    if (savedData.style) setStyle(savedData.style);
    if (savedData.template) setTemplate(savedData.template);
    if (savedData.data) setData(savedData.data);
    if (savedData.imageSettings) setImageSettings(savedData.imageSettings);
    
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
    setTemplate(newTemplate);
    saveToStorage({ template: newTemplate });
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
    setTemplate(importedTemplate);
    saveToStorage({ 
      data: importedData,
      style: importedStyle,
      template: importedTemplate
    });
  };

  return (
    <ThemeProvider theme={theme} setTheme={setTheme}>
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
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === 'light' ? (
                    <MoonIcon className="h-5 w-5" />
                  ) : (
                    <SunIcon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
            <SignaturePreview
              data={data}
              style={style}
              template={template}
              imageSettings={imageSettings}
            />
          </div>
        </div>

        <div className="container py-8">
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="spacing">Spacing</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="photo">Photo URL</Label>
                    <Input
                      id="photo"
                      type="url"
                      value={data.photo}
                      onChange={handleDataChange('photo')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={data.fullName}
                      onChange={handleDataChange('fullName')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={data.jobTitle}
                      onChange={handleDataChange('jobTitle')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={data.company}
                      onChange={handleDataChange('company')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={handleDataChange('email')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={data.phone}
                      onChange={handleDataChange('phone')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={data.website}
                      onChange={handleDataChange('website')}
                    />
                  </div>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ctaText">CTA Text</Label>
                      <Input
                        id="ctaText"
                        value={data.ctaText}
                        onChange={handleDataChange('ctaText')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ctaLink">CTA Link</Label>
                      <Input
                        id="ctaLink"
                        type="url"
                        value={data.ctaLink}
                        onChange={handleDataChange('ctaLink')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="additionalCtaText">Additional CTA Text</Label>
                      <Input
                        id="additionalCtaText"
                        value={data.additionalCtaText}
                        onChange={handleDataChange('additionalCtaText')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="additionalCtaLink">Additional CTA Link</Label>
                      <Input
                        id="additionalCtaLink"
                        type="url"
                        value={data.additionalCtaLink}
                        onChange={handleDataChange('additionalCtaLink')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout">
              <LayoutCustomizer
                template={template}
                onTemplateChange={handleTemplateChange}
              />
            </TabsContent>

            <TabsContent value="spacing">
              <SpacingCustomizer
                template={template}
                onTemplateChange={handleTemplateChange}
              />
            </TabsContent>

            <TabsContent value="style">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Image Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ImageCustomizer
                      settings={imageSettings}
                      onChange={handleImageSettingsChange}
                    />
                  </CardContent>
                </Card>

                <StyleCustomizer
                  style={style}
                  onStyleChange={handleStyleChange}
                />
              </div>
            </TabsContent>

            <TabsContent value="output">
              <Tabs defaultValue="code" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="code">HTML Code</TabsTrigger>
                  <TabsTrigger value="import">Import Signature</TabsTrigger>
                </TabsList>

                <TabsContent value="code">
                  <SignatureCode
                    data={data}
                    style={style}
                    template={template}
                    imageSettings={imageSettings}
                  />
                </TabsContent>

                <TabsContent value="import">
                  <Card>
                    <CardHeader>
                      <CardTitle>Import Signature</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ImportSignature onImport={handleImport} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
