import React, { useState } from 'react';
import { SignatureForm } from './components/SignatureForm';
import { SignaturePreview } from './components/SignaturePreview';
import { SignatureCode } from './components/SignatureCode';
import { SignatureData, SignatureStyle, SignatureTemplate } from './types/signature';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { cn } from './lib/utils';

const defaultData: SignatureData = {
  fullName: '',
  jobTitle: '',
  company: '',
  email: '',
  phone: '',
  website: '',
  linkedin: '',
  twitter: '',
  photo: ''
};

const defaultStyle: SignatureStyle = {
  fontFamily: 'Arial, sans-serif',
  primaryColor: '#2563eb',
  secondaryColor: '#4b5563',
  imageWidth: 100,
  imageHeight: 100,
  imageFit: 'cover',
  imageRotation: 0,
  imageZoom: 1
};

const defaultTemplate: SignatureTemplate = {
  name: 'classic',
  layout: 'horizontal',
  imageStyle: 'rounded',
  contentStyle: 'compact',
  showIcons: true,
  imageAlignment: 'center',
  imageScale: 1,
  imageFit: 'cover',
  padding: {
    top: 16,
    right: 24,
    bottom: 16,
    left: 24
  }
};

function App() {
  const [data, setData] = useState<SignatureData>(defaultData);
  const [style, setStyle] = useState<SignatureStyle>(defaultStyle);
  const [template, setTemplate] = useState<SignatureTemplate>(defaultTemplate);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
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
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <SunIcon className="h-5 w-5" />
              )}
            </Button>
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
                <SignatureForm
                  data={data}
                  style={style}
                  template={template}
                  onDataChange={setData}
                  onStyleChange={setStyle}
                  onTemplateChange={setTemplate}
                />
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
