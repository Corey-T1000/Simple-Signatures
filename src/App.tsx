import React, { useState } from 'react';
import { SignatureForm } from './components/SignatureForm';
import { SignaturePreview } from './components/SignaturePreview';
import { SignatureCode } from './components/SignatureCode';
import { SignatureData, SignatureStyle, SignatureTemplate } from './types/signature';

const defaultData: SignatureData = {
  fullName: '',
  jobTitle: '',
  company: '',
  email: '',
  phone: '',
  website: '',
  linkedin: '',
  twitter: '',
  photo: ''
};

const defaultStyle: SignatureStyle = {
  fontFamily: 'Arial, sans-serif',
  primaryColor: '#2563eb',
  secondaryColor: '#4b5563',
  imageWidth: 100,
  imageHeight: 100,
  imageFit: 'cover',
  imageRotation: 0,
  imageZoom: 1
};

const defaultTemplate: SignatureTemplate = {
  name: 'classic',
  layout: 'horizontal',
  imageStyle: 'rounded',
  contentStyle: 'compact',
  showIcons: true
};

function App() {
  const [data, setData] = useState<SignatureData>(defaultData);
  const [style, setStyle] = useState<SignatureStyle>(defaultStyle);
  const [template, setTemplate] = useState<SignatureTemplate>(defaultTemplate);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Email Signature Generator
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <SignatureForm
              data={data}
              style={style}
              template={template}
              onDataChange={setData}
              onStyleChange={setStyle}
              onTemplateChange={setTemplate}
            />
          </div>
          
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <SignaturePreview
                data={data}
                style={style}
                template={template}
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">HTML Code</h2>
              <SignatureCode
                data={data}
                style={style}
                template={template}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;