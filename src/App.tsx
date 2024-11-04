import { useEffect, useState } from 'react';
import { SignaturePreview } from './components/SignaturePreview';
import { SignatureCode } from './components/SignatureCode';
import { ImportSignature } from './components/ImportSignature';
import { SignatureCustomizer } from './components/SignatureCustomizer';
import { SignatureData, SignatureStyle, SignatureTemplate } from './types/signature';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { cn } from './lib/utils';
import { Input } from './components/ui/Input';
import { Label } from './components/ui/label';
import { getFromStorage, saveToStorage } from './lib/storage';

const defaultData: SignatureData = {
  fullName: 'Paul Atreides',
  jobTitle: 'Duke of House Atreides',
  company: 'Arrakis Spice Operations',
  phone: '+1 (555) MELANGE',
  photo: 'https://images.unsplash.com/photo-1729067915069-fb84564ca0ec?auto=format&fit=crop&w=200&h=200',
  ctaText: 'Join the Spice Revolution',
  ctaLink: 'https://arrakis.dune/join',
  additionalCtaText: 'Learn About Spice Mining',
  additionalCtaLink: 'https://arrakis.dune/spice'
};

const defaultStyle: SignatureStyle = {
  fontFamily: 'Inter, Arial,-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  primaryColor: '#0F172A', // Modern slate for name
  secondaryColor: '#3B82F6', // Vibrant blue for links
  imageFit: 'cover'
};

const defaultTemplate: SignatureTemplate = {
  name: 'modern',
  layout: 'horizontal',
  imageStyle: 'rounded',
  contentStyle: 'compact',
  ctaLayout: 'stacked',
  showIcons: false,
  iconStyle: 'outline',
  imageAlignment: 'start',
  imageScale: 0.7,
  imageFit: 'cover',
  padding: {
    top: 12,
    right: 0,
    bottom: 12,
    left: 0
  }
};

function App() {
  const [data, setData] = useState<SignatureData>(defaultData);
  const [style, setStyle] = useState<SignatureStyle>(defaultStyle);
  const [template, setTemplate] = useState<SignatureTemplate>(defaultTemplate);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load saved preferences
  useEffect(() => {
    const savedData = getFromStorage();
    if (savedData.theme) setTheme(savedData.theme);
    if (savedData.style) setStyle(savedData.style);
    if (savedData.template) setTemplate(savedData.template);
    
    // Apply theme
    if (savedData.theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleDataChange = (field: keyof SignatureData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData({
      ...data,
      [field]: e.target.value
    });
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
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

  const handleImport = (
    importedData: SignatureData,
    importedStyle: SignatureStyle,
    importedTemplate: SignatureTemplate
  ) => {
    setData(importedData);
    setStyle(importedStyle);
    setTemplate(importedTemplate);
    saveToStorage({ 
      style: importedStyle,
      template: importedTemplate
    });
  };

  return (
    <div className={cn(
      "min-h-screen bg-background",
      "transition-colors duration-300"
    )}>
      {/* Header with Preview */}
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">
              Email Signature Generator
            </h1>
            <div className="flex items-center gap-2">
              <ImportSignature onImport={handleImport} />
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'light' ? (
                  <MoonIcon className="h-5 w-5" />
                ) : (
                  <SunIcon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <SignaturePreview
                data={data}
                style={style}
                template={template}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <Tabs defaultValue="customize" className="space-y-4">
          <TabsList>
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="code">HTML Code</TabsTrigger>
          </TabsList>

          <TabsContent value="customize">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  {/* Personal Information */}
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
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={data.phone}
                          onChange={handleDataChange('phone')}
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
                      </div>

                      <div className="grid gap-4">
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

                  {/* Style and Template Settings */}
                  <SignatureCustomizer
                    style={style}
                    template={template}
                    onStyleChange={handleStyleChange}
                    onTemplateChange={handleTemplateChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code">
            <SignatureCode
              data={data}
              style={style}
              template={template}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
