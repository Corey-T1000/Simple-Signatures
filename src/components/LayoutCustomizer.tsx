import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { NumericSlider } from './ui/NumericSlider';
import { SignatureTemplate } from '../types/signature';

interface LayoutCustomizerProps {
  template: SignatureTemplate;
  onTemplateChange: (template: SignatureTemplate) => void;
}

export function LayoutCustomizer({ template, onTemplateChange }: LayoutCustomizerProps) {
  const handleLayoutChange = (value: 'horizontal' | 'vertical') => {
    onTemplateChange({
      ...template,
      layout: value
    });
  };

  const handleContentStyleChange = (value: 'compact' | 'spacious') => {
    onTemplateChange({
      ...template,
      contentStyle: value
    });
  };

  const handleTitleLayoutChange = (value: 'stacked' | 'inline') => {
    onTemplateChange({
      ...template,
      titleLayout: value
    });
  };

  const handleCtaLayoutChange = (value: 'stacked' | 'inline') => {
    onTemplateChange({
      ...template,
      ctaLayout: value
    });
  };

  const handleImageScaleChange = (value: number) => {
    onTemplateChange({
      ...template,
      imageScale: value
    });
  };

  const handleImageSpacingChange = (value: number) => {
    onTemplateChange({
      ...template,
      imageSpacing: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Layout Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Layout Direction</Label>
            <Select defaultValue={template.layout} onValueChange={handleLayoutChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horizontal">Horizontal</SelectItem>
                <SelectItem value="vertical">Vertical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Content Style</Label>
            <Select defaultValue={template.contentStyle} onValueChange={handleContentStyleChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="spacious">Spacious</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Title Layout</Label>
            <Select defaultValue={template.titleLayout} onValueChange={handleTitleLayoutChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select title layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stacked">Stacked</SelectItem>
                <SelectItem value="inline">Inline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>CTA Layout</Label>
            <Select defaultValue={template.ctaLayout} onValueChange={handleCtaLayoutChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select CTA layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stacked">Stacked</SelectItem>
                <SelectItem value="inline">Inline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Image Settings</Label>
            <div className="pl-4 space-y-4">
              <NumericSlider
                label="Size Scale"
                min={0.5}
                max={2}
                step={0.1}
                value={template.imageScale}
                onChange={handleImageScaleChange}
                unit="x"
                precision={1}
              />

              <NumericSlider
                label="Spacing"
                min={0}
                max={40}
                step={4}
                value={template.imageSpacing}
                onChange={handleImageSpacingChange}
                unit="px"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
