import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { NumericSlider } from './ui/NumericSlider';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { SignatureTemplate } from '../types/signature';
import { 
  Layout, 
  ArrowRightLeft,
  ArrowUpDown,
  Grid,
  LayoutGrid,
  Table,
  RotateCcw
} from 'lucide-react';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface LayoutCustomizerProps {
  template: SignatureTemplate;
  onTemplateChange: (template: SignatureTemplate) => void;
}

const defaultTemplate: SignatureTemplate = {
  layout: 'horizontal',
  contentStyle: 'spacious',
  titleLayout: 'stacked',
  ctaLayout: 'stacked',
  imageScale: 1,
  imagePosition: 'left',
  padding: { top: 16, right: 16, bottom: 16, left: 16 }
};

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

  const handleImagePositionChange = (value: 'left' | 'right' | 'top' | 'bottom') => {
    onTemplateChange({
      ...template,
      imagePosition: value
    });
  };

  const resetToDefault = () => {
    onTemplateChange(defaultTemplate);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Layout Settings</CardTitle>
            <CardDescription>Customize the arrangement of your signature elements</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetToDefault}
                  className="h-8 w-8"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset to default layout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Main Layout
            </Label>
            <Select value={template.layout} onValueChange={handleLayoutChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horizontal">
                  <div className="flex items-center gap-2">
                    <ArrowRightLeft className="h-4 w-4" />
                    Horizontal
                  </div>
                </SelectItem>
                <SelectItem value="vertical">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    Vertical
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              Content Style
            </Label>
            <Select value={template.contentStyle} onValueChange={handleContentStyleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">
                  <div className="flex items-center gap-2">
                    <Grid className="h-4 w-4" />
                    Compact
                  </div>
                </SelectItem>
                <SelectItem value="spacious">
                  <div className="flex items-center gap-2">
                    <Table className="h-4 w-4" />
                    Spacious
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label>Title & Contact Layout</Label>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Name & Title</Label>
              <Select value={template.titleLayout} onValueChange={handleTitleLayoutChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stacked">Stacked</SelectItem>
                  <SelectItem value="inline">Inline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Call-to-Action</Label>
              <Select value={template.ctaLayout} onValueChange={handleCtaLayoutChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stacked">Stacked</SelectItem>
                  <SelectItem value="inline">Inline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label>Image Settings</Label>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Image Position</Label>
              <Select 
                value={template.imagePosition} 
                onValueChange={handleImagePositionChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-muted-foreground">Image Scale</Label>
                <span className="text-sm text-muted-foreground">{template.imageScale}x</span>
              </div>
              <NumericSlider
                min={0.5}
                max={2}
                step={0.1}
                value={template.imageScale}
                onChange={handleImageScaleChange}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
