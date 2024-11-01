import { SignatureTemplate, SignatureData, SignatureStyle } from '../types/signature';
import { Mail, Phone, Globe, Linkedin, Twitter } from 'lucide-react';
import { cn } from '../lib/utils';

interface SignaturePreviewProps {
  data: SignatureData;
  style: SignatureStyle;
  template: SignatureTemplate;
}

export function SignaturePreview({ data, style, template }: SignaturePreviewProps) {
  const iconSize = 16;
  const iconColor = style.primaryColor;

  const getIcon = (type: string) => {
    if (!template.showIcons) return null;
    
    switch (type) {
      case 'email':
        return <Mail size={iconSize} color={iconColor} className="shrink-0 mr-2" />;
      case 'phone':
        return <Phone size={iconSize} color={iconColor} className="shrink-0 mr-2" />;
      case 'website':
        return <Globe size={iconSize} color={iconColor} className="shrink-0 mr-2" />;
      case 'linkedin':
        return <Linkedin size={iconSize} color={iconColor} className="shrink-0 mr-2" />;
      case 'twitter':
        return <Twitter size={iconSize} color={iconColor} className="shrink-0 mr-2" />;
      default:
        return null;
    }
  };

  const containerClass = template.layout === 'horizontal' 
    ? 'flex items-start gap-6' 
    : 'flex flex-col gap-4';

  const imageAlignmentClass = {
    start: 'self-start',
    center: 'self-center',
    end: 'self-end'
  }[template.imageAlignment];

  const { top, right, bottom, left } = template.padding;

  const imageSize = 100 * template.imageScale;

  return (
    <div 
      className={cn(
        "bg-card rounded-lg",
        "transition-colors duration-200"
      )}
      style={{ 
        fontFamily: style.fontFamily,
        padding: `${top}px ${right}px ${bottom}px ${left}px`
      }}
    >
      <div className={containerClass}>
        {data.photo && (
          <div className={cn(
            "flex-shrink-0",
            imageAlignmentClass
          )}>
            <img
              src={data.photo}
              alt={data.fullName}
              className={cn(
                "object-cover",
                template.imageStyle === 'rounded' ? 'rounded-full' : 'rounded-md'
              )}
              style={{
                width: `${imageSize}px`,
                height: `${imageSize}px`,
                objectFit: template.imageFit,
              }}
            />
          </div>
        )}
        
        <div className="flex flex-col gap-2 min-w-0">
          <div>
            <h2 
              className="text-xl font-bold leading-none mb-1"
              style={{ color: style.primaryColor }}
            >
              {data.fullName}
            </h2>
            <p className="text-muted-foreground leading-snug">{data.jobTitle}</p>
            <p className="font-semibold text-card-foreground">{data.company}</p>
          </div>

          <div className={cn(
            "flex flex-col gap-1.5 text-sm",
            template.contentStyle === 'spacious' ? 'mt-4' : 'mt-2'
          )}>
            {data.email && (
              <div className="flex items-center">
                {getIcon('email')}
                <a 
                  href={`mailto:${data.email}`}
                  className="hover:underline truncate"
                  style={{ color: style.secondaryColor }}
                >
                  {data.email}
                </a>
              </div>
            )}
            
            {data.phone && (
              <div className="flex items-center">
                {getIcon('phone')}
                <a 
                  href={`tel:${data.phone}`}
                  className="hover:underline truncate"
                  style={{ color: style.secondaryColor }}
                >
                  {data.phone}
                </a>
              </div>
            )}
            
            {data.website && (
              <div className="flex items-center">
                {getIcon('website')}
                <a 
                  href={data.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline truncate"
                  style={{ color: style.secondaryColor }}
                >
                  {data.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            
            {data.linkedin && (
              <div className="flex items-center">
                {getIcon('linkedin')}
                <a 
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: style.secondaryColor }}
                >
                  LinkedIn
                </a>
              </div>
            )}
            
            {data.twitter && (
              <div className="flex items-center">
                {getIcon('twitter')}
                <a 
                  href={data.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: style.secondaryColor }}
                >
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
