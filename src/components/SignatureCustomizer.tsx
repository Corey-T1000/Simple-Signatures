import React from 'react';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { NumericInput } from './ui/NumericInput';
import { SignatureTemplate, SignatureStyle, ImageSettings } from '../types/signature';
import {
  Layout,
  ArrowRightLeft,
  ArrowUpDown,
  Grid,
  LayoutGrid,
  Table,
  RotateCcw,
  Type,
  Palette,
  Image as ImageIcon,
  GripVertical,
  Link,
  CircleDot
} from 'lucide-react';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { cn } from '../lib/utils';

interface SignatureCustomizerProps {
  template: SignatureTemplate;
  style: SignatureStyle;
  imageSettings: ImageSettings;
  onTemplateChange: (template: SignatureTemplate) => void;
  onStyleChange: (style: SignatureStyle) => void;
  onImageSettingsChange: (settings: ImageSettings) => void;
}

export function SignatureCustomizer({
  template,
  style,
  imageSettings,
  onTemplateChange,
  onStyleChange,
  onImageSettingsChange
}: SignatureCustomizerProps) {
  const handleLayoutChange = (layout: string) => {
    onTemplateChange({ ...template, layout });
  };

  const handleContentStyleChange = (contentStyle: string) => {
    onTemplateChange({ ...template, contentStyle });
  };

  const handleTitleLayoutChange = (titleLayout: string) => {
    onTemplateChange({ ...template, titleLayout });
  };

  const handleCtaLayoutChange = (ctaLayout: string) => {
    onTemplateChange({ ...template, ctaLayout });
  };

  const handleImageStyleChange = (imageStyle: string) => {
    onTemplateChange({ ...template, imageStyle });
  };

  const handleImageAlignmentChange = (imageAlignment: string) => {
    onTemplateChange({ ...template, imageAlignment });
  };

  const handleFontFamilyChange = (fontFamily: string) => {
    onStyleChange({ ...style, fontFamily });
  };

  const handleColorChange = (color: string, type: 'primary' | 'secondary') => {
    onStyleChange({
      ...style,
      [type === 'primary' ? 'primaryColor' : 'secondaryColor']: color,
    });
  };

  const handleImageFitChange = (imageFit: string) => {
    onStyleChange({ ...style, imageFit });
  };

  const handleImageSettingsChange = (
    field: keyof ImageSettings,
    value: number | boolean
  ) => {
    onImageSettingsChange({ ...imageSettings, [field]: value });
  };

  const handleImageScaleChange = (value: number) => {
    onTemplateChange({ 
      ...template, 
      imageScale: value,
    });
  };

  const handlePaddingChange = (side: 'top' | 'right' | 'bottom' | 'left', value: number) => {
    onTemplateChange({
      ...template,
      padding: {
        ...template.padding,
        [side]: value
      }
    });
  };

  return (
    <TooltipProvider>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Layout Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Layout className="h-5 w-5" />
                <h3 className="font-semibold">Layout</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Direction</Label>
                  <Select value={template.layout} onValueChange={handleLayoutChange}>
                    <SelectTrigger>
                      <SelectValue />
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
                  <Label>Content Style</Label>
                  <Select value={template.contentStyle} onValueChange={handleContentStyleChange}>
                    <SelectTrigger>
                      <SelectValue />
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

                <div className="space-y-2">
                  <Label>Title Layout</Label>
                  <Select value={template.titleLayout} onValueChange={handleTitleLayoutChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stacked">Stacked</SelectItem>
                      <SelectItem value="inline">Inline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>CTA Layout</Label>
                  <Select value={template.ctaLayout} onValueChange={handleCtaLayoutChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stacked">Stacked</SelectItem>
                      <SelectItem value="inline">Inline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Style Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Type className="h-5 w-5" />
                <h3 className="font-semibold">Typography & Colors</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Select value={style.fontFamily} onValueChange={handleFontFamilyChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter, Arial,-apple-system, BlinkMacSystemFont, system-ui, sans-serif">
                        Inter
                      </SelectItem>
                      <SelectItem value="ui-serif, Georgia, Cambria, Times New Roman, Times, serif">
                        Serif
                      </SelectItem>
                      <SelectItem value="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace">
                        Monospace
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <Input
                    type="color"
                    value={style.primaryColor}
                    onChange={(e) => handleColorChange(e.target.value, 'primary')}
                    className="h-10 px-2 py-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <Input
                    type="color"
                    value={style.secondaryColor}
                    onChange={(e) => handleColorChange(e.target.value, 'secondary')}
                    className="h-10 px-2 py-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="h-5 w-5" />
                <h3 className="font-semibold">Image Settings</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Style</Label>
                  <Select value={template.imageStyle} onValueChange={handleImageStyleChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rounded">Rounded</SelectItem>
                      <SelectItem value="circle">Circle</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Alignment</Label>
                  <Select value={template.imageAlignment} onValueChange={handleImageAlignmentChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="start">Top</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="end">Bottom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Image Fit</Label>
                  <Select value={style.imageFit} onValueChange={handleImageFitChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cover">Cover</SelectItem>
                      <SelectItem value="contain">Contain</SelectItem>
                      <SelectItem value="fill">Fill</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Size</Label>
                  <NumericInput
                    value={template.imageScale}
                    onChange={(value) => handleImageScaleChange(value)}
                    min={50}
                    max={200}
                    step={1}
                    unit="%"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spacing Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <GripVertical className="h-5 w-5" />
                <h3 className="font-semibold">Spacing</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Padding Top</Label>
                  <NumericInput
                    value={template.padding.top}
                    onChange={(value) => handlePaddingChange('top', value)}
                    min={0}
                    max={40}
                    step={1}
                    unit="px"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Padding Right</Label>
                  <NumericInput
                    value={template.padding.right}
                    onChange={(value) => handlePaddingChange('right', value)}
                    min={0}
                    max={40}
                    step={1}
                    unit="px"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Padding Bottom</Label>
                  <NumericInput
                    value={template.padding.bottom}
                    onChange={(value) => handlePaddingChange('bottom', value)}
                    min={0}
                    max={40}
                    step={1}
                    unit="px"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Padding Left</Label>
                  <NumericInput
                    value={template.padding.left}
                    onChange={(value) => handlePaddingChange('left', value)}
                    min={0}
                    max={40}
                    step={1}
                    unit="px"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
