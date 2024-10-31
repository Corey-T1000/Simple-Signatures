import React from 'react';
import { SignatureTemplate } from '../types/signature';
import { Slider } from './ui/Slider';

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
      <h2 className="text-lg font-semibold text-gray-900">Template Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Layout</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={template.layout}
            onChange={(e) => handleChange('layout', e.target.value)}
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image Style</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={template.imageStyle}
            onChange={(e) => handleChange('imageStyle', e.target.value)}
          >
            <option value="rounded">Rounded</option>
            <option value="square">Square</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image Fit</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={template.imageFit}
            onChange={(e) => handleChange('imageFit', e.target.value as 'cover' | 'contain' | 'fill')}
          >
            <option value="cover">Cover (Crop to Fill)</option>
            <option value="contain">Contain (Show All)</option>
            <option value="fill">Fill (Stretch)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image Alignment</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={template.imageAlignment}
            onChange={(e) => handleChange('imageAlignment', e.target.value)}
          >
            <option value="start">Top/Left</option>
            <option value="center">Center</option>
            <option value="end">Bottom/Right</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image Scale</label>
          <Slider
            label="Scale"
            min={0.5}
            max={2}
            step={0.1}
            value={template.imageScale}
            onChange={(value) => handleChange('imageScale', value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Content Style</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={template.contentStyle}
            onChange={(e) => handleChange('contentStyle', e.target.value)}
          >
            <option value="compact">Compact</option>
            <option value="spacious">Spacious</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Show Icons</label>
          <input
            type="checkbox"
            className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={template.showIcons}
            onChange={(e) => handleChange('showIcons', e.target.checked)}
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Padding</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500">Top</label>
              <Slider
                label="Top"
                min={0}
                max={48}
                step={1}
                value={template.padding.top}
                onChange={(value) => handlePaddingChange('top', value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Right</label>
              <Slider
                label="Right"
                min={0}
                max={48}
                step={1}
                value={template.padding.right}
                onChange={(value) => handlePaddingChange('right', value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Bottom</label>
              <Slider
                label="Bottom"
                min={0}
                max={48}
                step={1}
                value={template.padding.bottom}
                onChange={(value) => handlePaddingChange('bottom', value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Left</label>
              <Slider
                label="Left"
                min={0}
                max={48}
                step={1}
                value={template.padding.left}
                onChange={(value) => handlePaddingChange('left', value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
