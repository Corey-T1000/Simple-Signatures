import React from 'react';
import { SignatureTemplate } from '../types/signature';
import { Layout, Image, Share2, AlignJustify, Icons } from 'lucide-react';

interface TemplateSelectorProps {
  templates: SignatureTemplate[];
  selectedTemplate: SignatureTemplate;
  onSelect: (template: SignatureTemplate) => void;
}

export function TemplateSelector({ 
  templates, 
  selectedTemplate, 
  onSelect 
}: TemplateSelectorProps) {
  const handleIconToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect({
      ...selectedTemplate,
      showIcons: !selectedTemplate.showIcons
    });
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Template</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {templates.map(template => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className={`p-4 border-2 rounded-lg transition-all ${
              template.id === selectedTemplate.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <div className="text-sm font-medium mb-2">{template.name}</div>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Layout size={12} />
                {template.layout}
              </div>
              <div className="flex items-center gap-1">
                <Image size={12} />
                {template.imageStyle}
              </div>
              <div className="flex items-center gap-1">
                <Share2 size={12} />
                {template.socialStyle}
              </div>
              <div className="flex items-center gap-1">
                <AlignJustify size={12} />
                {template.contentStyle}
              </div>
            </div>
            {template.id === selectedTemplate.id && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <button
                  onClick={handleIconToggle}
                  className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full transition-colors ${
                    template.showIcons
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Icons size={14} />
                  {template.showIcons ? 'Hide Icons' : 'Show Icons'}
                </button>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}