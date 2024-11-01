import React from 'react';
import { SignatureData, SignatureStyle, SignatureTemplate } from '../types/signature';
import { TemplateCustomizer } from './TemplateCustomizer';
import { StyleCustomizer } from './StyleCustomizer';
import { Input } from './ui/Input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface SignatureFormProps {
  data: SignatureData;
  style: SignatureStyle;
  template: SignatureTemplate;
  onDataChange: (data: SignatureData) => void;
  onStyleChange: (style: SignatureStyle) => void;
  onTemplateChange: (template: SignatureTemplate) => void;
}

export function SignatureForm({
  data,
  style,
  template,
  onDataChange,
  onStyleChange,
  onTemplateChange
}: SignatureFormProps) {
  const handleDataChange = (key: keyof SignatureData, value: string) => {
    onDataChange({
      ...data,
      [key]: value
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={data.fullName}
                onChange={(e) => handleDataChange('fullName', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                type="text"
                value={data.jobTitle}
                onChange={(e) => handleDataChange('jobTitle', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                type="text"
                value={data.company}
                onChange={(e) => handleDataChange('company', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => handleDataChange('email', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => handleDataChange('phone', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={data.website}
                onChange={(e) => handleDataChange('website', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                type="url"
                value={data.linkedin}
                onChange={(e) => handleDataChange('linkedin', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="twitter">Twitter URL</Label>
              <Input
                id="twitter"
                type="url"
                value={data.twitter}
                onChange={(e) => handleDataChange('twitter', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="photo">Photo URL</Label>
              <Input
                id="photo"
                type="url"
                value={data.photo}
                onChange={(e) => handleDataChange('photo', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <StyleCustomizer
        style={style}
        onChange={onStyleChange}
      />

      <TemplateCustomizer
        template={template}
        onTemplateChange={onTemplateChange}
      />
    </div>
  );
}
