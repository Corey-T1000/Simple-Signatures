import { useState } from 'react';
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

const defaultData: SignatureData = {
  fullName: 'Paul Atreides',
  jobTitle: 'Duke of House Atreides',
  company: 'Arrakis Spice Operations',
  email: 'muaddib@arrakis.dune',
  phone: '+1 (555) MELANGE',
  website: 'www.arrakis.dune',
  linkedin: 'https://linkedin.com/in/paul-atreides',
  twitter: 'https://twitter.com/muaddib',
  photo: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=200&h=200'
};

const defaultStyle: SignatureStyle = {
  fontFamily: 'Georgia, serif',
  primaryColor: '#B45309', // Warm sand color
  secondaryColor: '#78350F', // Deep spice brown
  imageFit: 'cover'
};

const defaultTemplate: SignatureTemplate = {
  name: 'classic',
  layout: 'horizontal',
  imageStyle: 'rounded',
  contentStyle: 'spacious',
  showIcons: true,
  iconStyle: 'outline',
  imageAlignment: 'center',
  imageScale: 1,
  imageFit: 'cover',
  padding: {
    top: 20,
    right: 24,
    bottom: 20,
    left: 24
  }
};

function App() {
  const [data, setData] = useState<SignatureData>(defaultData);
  const [style, setStyle] = useState<SignatureStyle>(defaultStyle);
  const [template, setTemplate] = useState<SignatureTemplate>(defaultTemplate);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

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
  };

  const handleImport = (
    importedData: SignatureData,
    importedStyle: SignatureStyle,
    importedTemplate: SignatureTemplate
  ) => {
    setData(importedData);
    setStyle(importedStyle);
    setTemplate(importedTemplate);
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

                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn URL</Label>
                        <Input
                          id="linkedin"
                          type="url"
                          value={data.linkedin}
                          onChange={handleDataChange('linkedin')}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter URL</Label>
                        <Input
                          id="twitter"
                          type="url"
                          value={data.twitter}
                          onChange={handleDataChange('twitter')}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="photo">Photo URL</Label>
                        <Input
                          id="photo"
                          type="url"
                          value={data.photo}
                          onChange={handleDataChange('photo')}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Style and Template Settings */}
                  <SignatureCustomizer
                    style={style}
                    template={template}
                    onStyleChange={setStyle}
                    onTemplateChange={setTemplate}
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
