import React from 'react';
import { SignatureTemplate, SignatureData, SignatureStyle } from '../types/signature';
import { Mail, Phone, Globe, Linkedin, Twitter } from 'lucide-react';

interface SignaturePreviewProps {
  template: SignatureTemplate;
  data: SignatureData;
  style: SignatureStyle;
}

export function SignaturePreview({ template, data, style }: SignaturePreviewProps) {
  const iconSize = 16;
  const iconColor = style.primaryColor;

  const getIcon = (type: string) => {
    if (!template.showIcons) return null;
    
    switch (type) {
      case 'email':
        return <Mail size={iconSize} color={iconColor} className="inline-block mr-2" />;
      case 'phone':
        return <Phone size={iconSize} color={iconColor} className="inline-block mr-2" />;
      case 'website':
        return <Globe size={iconSize} color={iconColor} className="inline-block mr-2" />;
      case 'linkedin':
        return <Linkedin size={iconSize} color={iconColor} className="inline-block mr-2" />;
      case 'twitter':
        return <Twitter size={iconSize} color={iconColor} className="inline-block mr-2" />;
      default:
        return null;
    }
  };

  const containerClass = template.layout === 'horizontal' 
    ? 'flex items-center gap-6' 
    : 'flex flex-col gap-4';

  return (
    <div 
      className="p-6 bg-white rounded-lg shadow-sm"
      style={{ fontFamily: style.fontFamily }}
    >
      <div className={containerClass}>
        {data.photo && (
          <div className="flex-shrink-0">
            <img
              src={data.photo}
              alt={data.fullName}
              className={template.imageStyle === 'rounded' ? 'rounded-full' : 'rounded-md'}
              style={{
                width: `${style.imageWidth}px`,
                height: `${style.imageHeight}px`,
                objectFit: style.imageFit,
                transform: `rotate(${style.imageRotation}deg) scale(${style.imageZoom})`,
              }}
            />
          </div>
        )}
        
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="text-xl font-bold" style={{ color: style.primaryColor }}>
              {data.fullName}
            </h2>
            <p className="text-gray-600">{data.jobTitle}</p>
            <p className="font-semibold">{data.company}</p>
          </div>

          <div className={`flex flex-col gap-1 text-sm ${template.contentStyle === 'spacious' ? 'mt-4' : 'mt-2'}`}>
            {data.email && (
              <div className="flex items-center">
                {getIcon('email')}
                <a href={`mailto:${data.email}`} style={{ color: style.secondaryColor }}>
                  {data.email}
                </a>
              </div>
            )}
            
            {data.phone && (
              <div className="flex items-center">
                {getIcon('phone')}
                <a href={`tel:${data.phone}`} style={{ color: style.secondaryColor }}>
                  {data.phone}
                </a>
              </div>
            )}
            
            {data.website && (
              <div className="flex items-center">
                {getIcon('website')}
                <a href={data.website} target="_blank" rel="noopener noreferrer" style={{ color: style.secondaryColor }}>
                  {data.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            
            {data.linkedin && (
              <div className="flex items-center">
                {getIcon('linkedin')}
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: style.secondaryColor }}>
                  LinkedIn
                </a>
              </div>
            )}
            
            {data.twitter && (
              <div className="flex items-center">
                {getIcon('twitter')}
                <a href={data.twitter} target="_blank" rel="noopener noreferrer" style={{ color: style.secondaryColor }}>
                  Twitter
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}