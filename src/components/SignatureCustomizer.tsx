import type { SignatureTemplate, SignatureStyle } from '../types/signature';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { NumericInput } from './ui/numeric-input';
import { Layout, ArrowRightLeft, ArrowUpDown, Grid, Table, Type, Image as ImageIcon, GripVertical } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { FieldOrderManager } from './FieldOrderManager';

interface SignatureCustomizerProps {
  template: SignatureTemplate;
  style: SignatureStyle;
  onTemplateChange: (template: SignatureTemplate) => void;
  onStyleChange: (style: SignatureStyle) => void;
}

export function SignatureCustomizer({
  template,
  style,
  onTemplateChange,
  onStyleChange
}: SignatureCustomizerProps) {
  const handleLayoutChange = (value: 'horizontal' | 'vertical') => {
    onTemplateChange({ ...template, layout: value });
  };

  const handleContentStyleChange = (value: 'compact' | 'spacious') => {
    onTemplateChange({ ...template, contentStyle: value });
  };

  const handleTitleLayoutChange = (value: 'stacked' | 'inline') => {
    onTemplateChange({ ...template, titleLayout: value });
  };

  const handleCtaLayoutChange = (value: 'stacked' | 'inline') => {
    onTemplateChange({ ...template, ctaLayout: value });
  };

  const handleImageStyleChange = (value: 'rounded' | 'square') => {
    onTemplateChange({ ...template, imageStyle: value });
  };

  const handleImageAlignmentChange = (value: 'start' | 'center' | 'end') => {
    onTemplateChange({ ...template, imageAlignment: value });
  };

  const handleFontFamilyChange = (value: string) => {
    onStyleChange({ ...style, fontFamily: value });
  };

  const handlePrimaryColorChange = (value: string) => {
    onStyleChange({ ...style, primaryColor: value });
  };

  const handleSecondaryColorChange = (value: string) => {
    onStyleChange({ ...style, secondaryColor: value });
  };

  const handleImageFitChange = (value: 'cover' | 'contain' | 'fill') => {
    onStyleChange({ ...style, imageFit: value });
  };

  const handleImageScaleChange = (value: string) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min grid-auto-flow-dense">
        <Card className="h-fit">
          <div className="space-y-4 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Layout className="h-5 w-5" />
              <h3 className="font-semibold">Layout Options</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Direction</Label>
                <div className="flex gap-2">
                  <Select value={template.layout} onValueChange={handleLayoutChange}>
                    <SelectTrigger className="flex-1">
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onTemplateChange({ ...template, layout: template.layout === 'horizontal' ? 'vertical' : 'horizontal' })}
                        >
                          {template.layout === 'horizontal' ? (
                            <ArrowRightLeft className="h-4 w-4" />
                          ) : (
                            <ArrowUpDown className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Toggle Layout Direction</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
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
                    <SelectItem value="stacked">
                      <div className="flex items-center gap-2">
                        <ArrowUpDown className="h-4 w-4" />
                        Stacked
                      </div>
                    </SelectItem>
                    <SelectItem value="inline">
                      <div className="flex items-center gap-2">
                        <ArrowRightLeft className="h-4 w-4" />
                        Inline
                      </div>
                    </SelectItem>
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
                    <SelectItem value="stacked">
                      <div className="flex items-center gap-2">
                        <ArrowUpDown className="h-4 w-4" />
                        Stacked
                      </div>
                    </SelectItem>
                    <SelectItem value="inline">
                      <div className="flex items-center gap-2">
                        <ArrowRightLeft className="h-4 w-4" />
                        Inline
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        <Card className="h-fit">
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
                    onChange={(e) => handlePrimaryColorChange(e.target.value)}
                    className="h-10 px-2 py-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <Input
                    type="color"
                    value={style.secondaryColor}
                    onChange={(e) => handleSecondaryColorChange(e.target.value)}
                    className="h-10 px-2 py-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
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
                    onChange={(value) => handleImageScaleChange(value.toString())}
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

        <Card className="h-fit">
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

        <FieldOrderManager template={template} onTemplateChange={onTemplateChange} />
      </div>
  );
}
