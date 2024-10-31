import React from 'react';
import { SignatureData, SignatureStyle, SignatureTemplate } from '../types/signature';
import { TemplateCustomizer } from './TemplateCustomizer';

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
  const handleDataChange = (key: keyof SignatureData, value: string) => {
    onDataChange({
      ...data,
      [key]: value
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={data.fullName}
              onChange={(e) => handleDataChange('fullName', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={data.jobTitle}
              onChange={(e) => handleDataChange('jobTitle', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={data.company}
              onChange={(e) => handleDataChange('company', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={data.email}
              onChange={(e) => handleDataChange('email', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={data.phone}
              onChange={(e) => handleDataChange('phone', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <input
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={data.website}
              onChange={(e) => handleDataChange('website', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
            <input
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={data.linkedin}
              onChange={(e) => handleDataChange('linkedin', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Twitter URL</label>
            <input
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={data.twitter}
              onChange={(e) => handleDataChange('twitter', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo URL</label>
            <input
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={data.photo}
              onChange={(e) => handleDataChange('photo', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <TemplateCustomizer
          template={template}
          onTemplateChange={onTemplateChange}
        />
      </div>
    </div>
  );
}
