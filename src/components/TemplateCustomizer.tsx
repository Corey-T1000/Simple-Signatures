import React from 'react';
import { SignatureTemplate } from '../types/signature';
import { Slider } from './ui/Slider';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { CardHeader, CardTitle } from './ui/card';

interface TemplateCustomizerProps {
  template: SignatureTemplate;
  onTemplateChange: (template: SignatureTemplate) => void;
}

export function TemplateCustomizer({ template, onTemplateChange }: TemplateCustomizerProps) {
  const handleChange = (key: keyof SignatureTemplate, value: unknown) => {
    onTemplateChange({
      ...template,
      [key]: value
    });
  };

  const handlePaddingChange = (key: keyof SignatureTemplate['padding'], value: number) => {
    onTemplateChange({
      ...template,
      padding: {
        ...template.padding,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <CardHeader>
        <CardTitle>Template Settings</CardTitle>
      </CardHeader>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Layout</Label>
          <Select value={template.layout} onValueChange={(value) => handleChange('layout', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="horizontal">Horizontal</SelectItem>
              <SelectItem value="vertical">Vertical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Image Style</Label>
          <Select value={template.imageStyle} onValueChange={(value) => handleChange('imageStyle', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select image style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rounded">Rounded</SelectItem>
              <SelectItem value="square">Square</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Image Fit</Label>
          <Select value={template.imageFit} onValueChange={(value) => handleChange('imageFit', value as 'cover' | 'contain' | 'fill')}>
            <SelectTrigger>
              <SelectValue placeholder="Select image fit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cover">Cover (Crop to Fill)</SelectItem>
              <SelectItem value="contain">Contain (Show All)</SelectItem>
              <SelectItem value="fill">Fill (Stretch)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Image Alignment</Label>
          <Select value={template.imageAlignment} onValueChange={(value) => handleChange('imageAlignment', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select image alignment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="start">Top/Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="end">Bottom/Right</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Image Scale</Label>
          <Slider
            min={50}
            max={200}
            step={10}
            value={[template.imageScale * 100]}
            onValueChange={([value]) => handleChange('imageScale', value / 100)}
            className="pt-2"
          />
        </div>

        <div className="space-y-2">
          <Label>Content Style</Label>
          <Select value={template.contentStyle} onValueChange={(value) => handleChange('contentStyle', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select content style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="spacious">Spacious</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="show-icons"
            checked={template.showIcons}
            onCheckedChange={(checked) => handleChange('showIcons', checked)}
          />
          <Label htmlFor="show-icons">Show Icons</Label>
        </div>

        <div className="space-y-4">
          <Label>Padding</Label>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Top</Label>
              <Slider
                min={0}
                max={48}
                step={1}
                value={[template.padding.top]}
                onValueChange={([value]) => handlePaddingChange('top', value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Right</Label>
              <Slider
                min={0}
                max={48}
                step={1}
                value={[template.padding.right]}
                onValueChange={([value]) => handlePaddingChange('right', value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Bottom</Label>
              <Slider
                min={0}
                max={48}
                step={1}
                value={[template.padding.bottom]}
                onValueChange={([value]) => handlePaddingChange('bottom', value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Left</Label>
              <Slider
                min={0}
                max={48}
                step={1}
                value={[template.padding.left]}
                onValueChange={([value]) => handlePaddingChange('left', value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
