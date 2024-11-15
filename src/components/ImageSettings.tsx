import React, { useState } from 'react';
import { SignatureStyle, SignatureData } from '../types/signature';
import { ImageCustomizer } from './ImageCustomizer';
import { Link } from 'lucide-react';

interface ImageSettingsProps {
  style: SignatureStyle;
  onStyleChange: (style: Partial<SignatureStyle>) => void;
  data: SignatureData;
  onDataChange: (data: Partial<SignatureData>) => void;
}

interface ImageSettings {
  width: number;
  height: number;
  rotation: number;
  zoom: number;
  objectFit: string;
  backgroundColor: string;
  backgroundOpacity: number;
  backgroundBlur: number;
  lockAspectRatio: boolean;
}

export function ImageSettings({ style, onStyleChange, data, onDataChange }: ImageSettingsProps) {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageSettingsChange = (updates: Partial<ImageSettings>) => {
    onStyleChange({
      ...style,
      imageWidth: updates.width,
      imageHeight: updates.height,
      imageRotation: updates.rotation,
      imageZoom: updates.zoom,
      imageFit: updates.objectFit,
    });
  };

  const imageSettings: ImageSettings = {
    width: style.imageWidth,
    height: style.imageHeight,
    rotation: style.imageRotation,
    zoom: style.imageZoom,
    objectFit: style.imageFit,
    backgroundColor: '#ffffff',
    backgroundOpacity: 1,
    backgroundBlur: 0,
    lockAspectRatio: true,
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onDataChange({ photo: reader.result as string });
        setImageUrl(''); // Clear URL input when file is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      onDataChange({ photo: imageUrl });
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Image Upload</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Upload from Computer</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Use Image URL</h3>
            <form onSubmit={handleImageUrlSubmit} className="flex gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Link size={16} className="mr-2" />
                Add URL
              </button>
            </form>
          </div>
        </div>
      </div>

      <ImageCustomizer
        settings={imageSettings}
        onChange={handleImageSettingsChange}
        imageUrl={data.photo}
      />
    </div>
  );
}