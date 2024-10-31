import React from 'react';
import { SignatureStyle } from '../types/signature';
import { Input } from './ui/Input';

interface StyleCustomizerProps {
  style: SignatureStyle;
  onChange: (style: SignatureStyle) => void;
}

const FONT_OPTIONS = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Verdana',
];

export function StyleCustomizer({ style, onChange }: StyleCustomizerProps) {
  const handleChange = (field: keyof SignatureStyle) => (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    onChange({ ...style, [field]: e.target.value });
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Style Customization</h2>
      
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Font Family
        </label>
        <select
          value={style.fontFamily}
          onChange={handleChange('fontFamily')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {FONT_OPTIONS.map(font => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>
      
      <Input
        label="Font Size"
        type="text"
        value={style.fontSize}
        onChange={handleChange('fontSize')}
        placeholder="14px"
      />
      
      <Input
        label="Primary Color"
        type="color"
        value={style.primaryColor}
        onChange={handleChange('primaryColor')}
      />
      
      <Input
        label="Spacing"
        type="number"
        min="0"
        max="40"
        value={style.spacing}
        onChange={handleChange('spacing')}
      />
    </div>
  );
}