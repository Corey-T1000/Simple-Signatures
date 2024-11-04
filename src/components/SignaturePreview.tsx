import { SignatureTemplate, SignatureData, SignatureStyle } from '../types/signature';
import { cn, generateDarkModeColor } from '../lib/utils';
import { useEffect, useState } from 'react';

interface SignaturePreviewProps {
  data: SignatureData;
  style: SignatureStyle;
  template: SignatureTemplate;
}

export function SignaturePreview({ data, style, template }: SignaturePreviewProps) {
  const [darkModePrimaryColor, setDarkModePrimaryColor] = useState(style.primaryColor);
  const [darkModeSecondaryColor, setDarkModeSecondaryColor] = useState(style.secondaryColor);

  useEffect(() => {
    setDarkModePrimaryColor(generateDarkModeColor(style.primaryColor));
    setDarkModeSecondaryColor(generateDarkModeColor(style.secondaryColor));
  }, [style.primaryColor, style.secondaryColor]);

  const containerClass = template.layout === 'horizontal' 
    ? 'flex items-start gap-3' 
    : 'flex flex-col gap-2';

  const imageAlignmentClass = {
    start: 'self-start',
    center: 'self-center',
    end: 'self-end'
  }[template.imageAlignment];

  const { top, right, bottom, left } = template.padding;
  const imageSize = 100 * template.imageScale;

  const renderCTA = (text: string, link: string) => (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "hover:underline truncate text-sm transition-colors",
        "text-primary dark:text-primary"
      )}
      style={{ 
        '--cta-color': style.secondaryColor,
        '--cta-color-dark': darkModeSecondaryColor,
        color: `var(--cta-color)`,
      } as React.CSSProperties}
    >
      {text}
    </a>
  );

  const renderCTAs = () => {
    const hasPrimaryCTA = data.ctaText && data.ctaLink;
    const hasAdditionalCTA = data.additionalCtaText && data.additionalCtaLink;
    const hasBothCTAs = hasPrimaryCTA && hasAdditionalCTA;
    
    if (!hasPrimaryCTA && !hasAdditionalCTA) return null;
    
    if (hasBothCTAs && template.ctaLayout === 'inline') {
      return (
        <div className="flex items-center gap-3">
          {renderCTA(data.ctaText, data.ctaLink)}
          <span className="text-muted-foreground">•</span>
          {renderCTA(data.additionalCtaText, data.additionalCtaLink)}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1">
        {hasPrimaryCTA && renderCTA(data.ctaText, data.ctaLink)}
        {hasAdditionalCTA && renderCTA(data.additionalCtaText, data.additionalCtaLink)}
      </div>
    );
  };

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
        
        <div className="flex flex-col min-w-0">
          <div className="flex flex-col gap-1">
            {data.fullName && (
              <h2 
                className={cn(
                  "text-md font-bold leading-none transition-colors",
                  "text-foreground dark:text-foreground"
                )}
                style={{ 
                  '--name-color': style.primaryColor,
                  '--name-color-dark': darkModePrimaryColor,
                  color: `var(--name-color)`,
                } as React.CSSProperties}
              >
                {data.fullName}
              </h2>
            )}
            {data.jobTitle && (
              <p className="text-muted-foreground leading-none text-sm">
                {data.jobTitle}
              </p>
            )}
            {data.company && (
              <p className="font-medium leading-none text-card-foreground text-sm">
                {data.company}
              </p>
            )}
            {data.phone && (
              <a 
                href={`tel:${data.phone}`}
                className="hover:underline truncate text-muted-foreground text-sm"
              >
                {data.phone}
              </a>
            )}
            {renderCTAs()}
          </div>
        </div>
      </div>
    </div>
  );
}
