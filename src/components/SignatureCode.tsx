import { useCallback, useState } from 'react';
import { SignatureTemplate, SignatureData, SignatureStyle, ImageSettings, SignatureFieldType } from '../types/signature';
import { Button } from './ui/button';
import { Check, Copy } from 'lucide-react';

interface SignatureCodeProps {
  template: SignatureTemplate;
  data: SignatureData;
  style: SignatureStyle;
  imageSettings: ImageSettings;
}

export function SignatureCode({ template, data, style, imageSettings }: SignatureCodeProps) {
  const [copied, setCopied] = useState(false);

  const isFieldVisible = useCallback((fieldType: string) => {
    const field = template.fieldOrder.find(f => f.type === fieldType);
    return field?.visible ?? false;
  }, [template.fieldOrder]);

  const generateShadowStyle = useCallback(() => {
    if (!imageSettings.shadow) return '';
    const { shadowColor, shadowOpacity, shadowBlur, shadowOffsetX, shadowOffsetY } = imageSettings;
    const rgba = `rgba(${parseInt(shadowColor.slice(1, 3), 16)}, ${parseInt(shadowColor.slice(3, 5), 16)}, ${parseInt(shadowColor.slice(5, 7), 16)}, ${shadowOpacity})`;
    return `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${rgba}`;
  }, [imageSettings]);

  const renderField = useCallback((fieldType: SignatureFieldType) => {
    if (!isFieldVisible(fieldType)) return '';

    switch (fieldType) {
      case 'fullName':
        return `
          <tr>
            <td style="
              font-size: 20px;
              font-weight: bold;
              color: ${style.primaryColor};
              padding-bottom: 6px;
              letter-spacing: -0.02em;
            ">
              ${data.fullName}
            </td>
          </tr>
        `;
      case 'jobTitle':
        return data.jobTitle ? `
          <tr>
            <td style="padding-bottom: 6px; color: #666666;">
              ${data.jobTitle}
            </td>
          </tr>
        ` : '';
      case 'company':
        return data.company ? `
          <tr>
            <td style="font-weight: 600; padding-bottom: ${template.contentStyle === 'spacious' ? '20px' : '12px'};">
              ${data.company}
            </td>
          </tr>
        ` : '';
      case 'email':
        return data.email ? `
          <tr>
            <td style="padding: 3px 0;">
              <a href="mailto:${data.email}" style="
                color: ${style.secondaryColor}; 
                text-decoration: none;
              ">
                ${data.email}
              </a>
            </td>
          </tr>
        ` : '';
      case 'phone':
        return data.phone ? `
          <tr>
            <td style="padding: 3px 0;">
              <a href="tel:${data.phone}" style="
                color: ${style.secondaryColor}; 
                text-decoration: none;
              ">
                ${data.phone}
              </a>
            </td>
          </tr>
        ` : '';
      case 'website':
        return data.website ? `
          <tr>
            <td style="padding: 3px 0;">
              <a href="${data.website}" style="
                color: ${style.secondaryColor}; 
                text-decoration: none;
              ">
                ${data.website.replace(/^https?:\/\//, '')}
              </a>
            </td>
          </tr>
        ` : '';
      case 'cta':
        return data.ctaText ? `
          <tr>
            <td style="padding: 3px 0;">
              <a href="${data.ctaLink}" style="
                color: ${style.secondaryColor}; 
                text-decoration: none;
                transition: opacity 0.2s ease-in-out;
              ">
                ${data.ctaText}
              </a>
            </td>
          </tr>
        ` : '';
      case 'additionalCta':
        return data.additionalCtaText ? `
          <tr>
            <td style="padding: 3px 0;">
              <a href="${data.additionalCtaLink}" style="
                color: ${style.secondaryColor}; 
                text-decoration: none;
                transition: opacity 0.2s ease-in-out;
              ">
                ${data.additionalCtaText}
              </a>
            </td>
          </tr>
        ` : '';
      default:
        return '';
    }
  }, [data, style, template.contentStyle, isFieldVisible]);

  const generateHtml = useCallback(() => {
    const isVertical = template.layout === 'vertical';
    const imageSize = Math.round(100 * template.imageScale);

    const html = `
      <table cellpadding="0" cellspacing="0" border="0" style="
        font-family: ${style.fontFamily};
        font-size: 14px;
        line-height: 1.4;
        color: #333333;
      ">
        <tr>
          <td>
            ${isVertical ? '<center>' : ''}
            <table cellpadding="0" cellspacing="0" border="0" style="${
              isVertical ? '' : 'display: inline-block; vertical-align: top;'
            }">
              <tr>
                ${template.layout === 'horizontal' && isFieldVisible('photo') && data.photo ? `
                  <td style="padding: 0 ${template.imageSpacing}px 0 0; vertical-align: top;">
                    <img 
                      src="${data.photo}" 
                      alt="${data.fullName}"
                      width="${imageSize}"
                      height="${imageSize}"
                      style="
                        border-radius: ${template.imageStyle === 'rounded' ? '50%' : '0'};
                        object-fit: ${style.imageFit};
                        box-shadow: ${generateShadowStyle()};
                      "
                    />
                  </td>
                ` : ''}
                <td style="vertical-align: top;">
                  ${template.layout === 'vertical' && isFieldVisible('photo') && data.photo ? `
                    <div style="text-align: center; padding-bottom: ${template.imageSpacing}px; width: 100%;">
                      <img 
                        src="${data.photo}" 
                        alt="${data.fullName}"
                        width="${imageSize}"
                        height="${imageSize}"
                        style="
                          border-radius: ${template.imageStyle === 'rounded' ? '50%' : '0'};
                          object-fit: ${style.imageFit};
                          box-shadow: ${generateShadowStyle()};
                        "
                      />
                    </div>
                  ` : ''}
                  <table cellpadding="0" cellspacing="0" border="0" style="text-align: left;">
                    ${template.fieldOrder
                      .filter(field => field.type !== 'photo')
                      .map(field => renderField(field.type))
                      .join('')}
                  </table>
                </td>
              </tr>
            </table>
            ${isVertical ? '</center>' : ''}
          </td>
        </tr>
      </table>
    `.trim();

    return html;
  }, [template, data, style, imageSettings, generateShadowStyle, renderField, isFieldVisible]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateHtml());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div
        className="p-8 rounded-lg border bg-white dark:bg-black"
        dangerouslySetInnerHTML={{ __html: generateHtml() }}
      />
      <div className="flex justify-end">
        <Button
          variant="outline"
          className="w-[100px]"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
