import React, { useState } from 'react';
import { Mail, Phone, Globe, Linkedin, Twitter, Image, Type, Palette, Layout, Link } from 'lucide-react';
import { SignatureData, SignatureStyle, SignatureTemplate } from '../types/signature';

interface SignatureFormProps {
  data: SignatureData;
  style: SignatureStyle;
  template: SignatureTemplate;
  onDataChange: (data: SignatureData) => void;
  onStyleChange: (style: SignatureStyle) => void;
  onTemplateChange: (template: SignatureTemplate) => void;
}

export function SignatureForm({
  data,
  style,
  template,
  onDataChange,
  onStyleChange,
  onTemplateChange
}: SignatureFormProps) {
  const [imageUrl, setImageUrl] = useState('');

  const handleDataChange = (field: keyof SignatureData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onDataChange({ ...data, [field]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onDataChange({ ...data, photo: reader.result as string });
        setImageUrl(''); // Clear URL input when file is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      onDataChange({ ...data, photo: imageUrl });
      setImageUrl(''); // Clear input after submission
    }
  };

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Type size={20} /> Personal Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={data.fullName}
              onChange={handleDataChange('fullName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              value={data.jobTitle}
              onChange={handleDataChange('jobTitle')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              value={data.company}
              onChange={handleDataChange('company')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Mail size={20} /> Contact Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={handleDataChange('email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={data.phone}
              onChange={handleDataChange('phone')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <input
              type="url"
              value={data.website}
              onChange={handleDataChange('website')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
            <input
              type="url"
              value={data.linkedin}
              onChange={handleDataChange('linkedin')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Twitter</label>
            <input
              type="url"
              value={data.twitter}
              onChange={handleDataChange('twitter')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Image size={20} /> Photo
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Upload from Computer</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="border-t pt-4">
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
      </section>

      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Layout size={20} /> Template
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Layout</label>
            <select
              value={template.layout}
              onChange={(e) => onTemplateChange({ ...template, layout: e.target.value as 'horizontal' | 'vertical' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image Style</label>
            <select
              value={template.imageStyle}
              onChange={(e) => onTemplateChange({ ...template, imageStyle: e.target.value as 'rounded' | 'square' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="rounded">Rounded</option>
              <option value="square">Square</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content Style</label>
            <select
              value={template.contentStyle}
              onChange={(e) => onTemplateChange({ ...template, contentStyle: e.target.value as 'compact' | 'spacious' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="compact">Compact</option>
              <option value="spacious">Spacious</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={template.showIcons}
                onChange={(e) => onTemplateChange({ ...template, showIcons: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Show Icons</span>
            </label>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Palette size={20} /> Style
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Font Family</label>
            <select
              value={style.fontFamily}
              onChange={(e) => onStyleChange({ ...style, fontFamily: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="'Times New Roman', serif">Times New Roman</option>
              <option value="'Courier New', monospace">Courier New</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Verdana, sans-serif">Verdana</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Primary Color</label>
            <input
              type="color"
              value={style.primaryColor}
              onChange={(e) => onStyleChange({ ...style, primaryColor: e.target.value })}
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
            <input
              type="color"
              value={style.secondaryColor}
              onChange={(e) => onStyleChange({ ...style, secondaryColor: e.target.value })}
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
}