import React from 'react';
import { ImageSettings } from '../types/signature';
import { Move, Lock, Unlock, ZoomIn, RotateCw, Image as ImageIcon } from 'lucide-react';
import { ColorPicker } from './ui/ColorPicker';
import { Slider } from './ui/Slider';

interface ImageCustomizerProps {
  settings: ImageSettings;
  onChange: (settings: ImageSettings) => void;
  imageUrl?: string;
}

export function ImageCustomizer({ settings, onChange, imageUrl }: ImageCustomizerProps) {
  const handleChange = (field: keyof ImageSettings) => (
    value: number | string | boolean
  ) => {
    const newSettings = { ...settings, [field]: value };
    
    if (field === 'width' && settings.lockAspectRatio) {
      const aspectRatio = settings.height / settings.width;
      newSettings.height = (value as number) * aspectRatio;
    }
    
    if (field === 'height' && settings.lockAspectRatio) {
      const aspectRatio = settings.width / settings.height;
      newSettings.width = (value as number) * aspectRatio;
    }
    
    onChange(newSettings);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Image Settings</h2>
        <button
          onClick={() => handleChange('lockAspectRatio')(!settings.lockAspectRatio)}
          className="p-2 hover:bg-gray-100 rounded-full"
          title={settings.lockAspectRatio ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
        >
          {settings.lockAspectRatio ? <Lock size={16} /> : <Unlock size={16} />}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Slider
          label="Width"
          value={settings.width}
          onChange={handleChange('width')}
          min={40}
          max={200}
          step={1}
          icon={<Move size={16} className="rotate-90" />}
        />
        
        <Slider
          label="Height"
          value={settings.height}
          onChange={handleChange('height')}
          min={40}
          max={200}
          step={1}
          icon={<Move size={16} />}
        />
      </div>

      <div className="space-y-4">
        <Slider
          label="Rotation"
          value={settings.rotation}
          onChange={handleChange('rotation')}
          min={-180}
          max={180}
          step={1}
          icon={<RotateCw size={16} />}
        />
        
        <Slider
          label="Zoom"
          value={settings.zoom}
          onChange={handleChange('zoom')}
          min={1}
          max={2}
          step={0.1}
          icon={<ZoomIn size={16} />}
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Object Fit
          </label>
          <select
            value={settings.objectFit}
            onChange={(e) => handleChange('objectFit')(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="contain">Contain</option>
            <option value="cover">Cover</option>
            <option value="fill">Fill</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Background Color
          </label>
          <ColorPicker
            color={settings.backgroundColor}
            onChange={(color) => handleChange('backgroundColor')(color)}
          />
        </div>

        <Slider
          label="Background Opacity"
          value={settings.backgroundOpacity}
          onChange={handleChange('backgroundOpacity')}
          min={0}
          max={1}
          step={0.1}
          icon={<ImageIcon size={16} />}
        />
        
        <Slider
          label="Background Blur"
          value={settings.backgroundBlur}
          onChange={handleChange('backgroundBlur')}
          min={0}
          max={20}
          step={1}
          icon={<ImageIcon size={16} />}
        />
      </div>

      {imageUrl && (
        <div className="mt-4 border rounded-lg overflow-hidden">
          <div
            className="relative w-full h-40 bg-gray-50"
            style={{
              backgroundColor: settings.backgroundColor,
              opacity: settings.backgroundOpacity,
            }}
          >
            <img
              src={imageUrl}
              alt="Preview"
              className="absolute inset-0 w-full h-full"
              style={{
                objectFit: settings.objectFit,
                transform: `rotate(${settings.rotation}deg) scale(${settings.zoom})`,
                filter: `blur(${settings.backgroundBlur}px)`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}