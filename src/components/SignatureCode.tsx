import { useCallback, useState } from 'react';
import { SignatureTemplate, SignatureData, SignatureStyle, ImageSettings } from '../types/signature';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Check, Copy } from 'lucide-react';
import { cn } from '../lib/utils';

interface SignatureCodeProps {
  template: SignatureTemplate;
  data: SignatureData;
  style: SignatureStyle;
  imageSettings?: ImageSettings;
}

export function SignatureCode({ template, data, style, imageSettings }: SignatureCodeProps) {
  const [copied, setCopied] = useState(false);

  const generateSvgIcon = useCallback((type: string) => {
    const fill = template.iconStyle === 'solid' ? style.primaryColor : 'none';
    const stroke = style.primaryColor;

    switch (type) {
      case 'email':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
      case 'phone':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
      case 'website':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
      default:
        return '';
    }
  }, [template.iconStyle, style.primaryColor]);

  const generateShadowStyle = useCallback(() => {
    if (!imageSettings?.shadow) return '';
    const { shadowColor, shadowOpacity, shadowBlur, shadowOffsetX, shadowOffsetY } = imageSettings;
    const rgba = `rgba(${parseInt(shadowColor.slice(1, 3), 16)}, ${parseInt(shadowColor.slice(3, 5), 16)}, ${parseInt(shadowColor.slice(5, 7), 16)}, ${shadowOpacity})`;
    return `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${rgba}`;
  }, [imageSettings]);

  const generateCTAs = useCallback(() => {
    if (!data.ctaText && !data.additionalCtaText) return '';

    if (template.ctaLayout === 'inline') {
      return `
        <tr>
          <td style="padding: 3px 0;">
            ${data.ctaText ? `
              <a href="${data.ctaLink}" style="
                color: ${style.secondaryColor}; 
                text-decoration: none;
                transition: opacity 0.2s ease-in-out;
              ">
                ${data.ctaText}
              </a>
            ` : ''}
            ${data.ctaText && data.additionalCtaText ? `
              <span style="color: #666666; padding: 0 8px;">•</span>
            ` : ''}
            ${data.additionalCtaText ? `
              <a href="${data.additionalCtaLink}" style="
                color: ${style.secondaryColor}; 
                text-decoration: none;
                transition: opacity 0.2s ease-in-out;
              ">
                ${data.additionalCtaText}
              </a>
            ` : ''}
          </td>
        </tr>
      `;
    }

    return `
      ${data.ctaText ? `
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
      ` : ''}
      ${data.additionalCtaText ? `
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
      ` : ''}
    `;
  }, [data.ctaText, data.ctaLink, data.additionalCtaText, data.additionalCtaLink, template.ctaLayout, style.secondaryColor]);

  const generateHtml = useCallback(() => {
    const isVertical = template.layout === 'vertical';
    const imageSize = 100 * template.imageScale;

    let borderRadius = '8px';
    if (imageSettings?.shape === 'rounded') {
      borderRadius = `${imageSettings.cornerRadius}px`;
    } else if (template.imageStyle === 'rounded') {
      borderRadius = '50%';
    }

    const html = `
      <table cellpadding="0" cellspacing="0" border="0" style="
        font-family: ${style.fontFamily};
        color: ${style.secondaryColor};
        font-size: 14px;
        line-height: 1.4;
      ">
        <tr>
          <td style="vertical-align: top; ${isVertical ? 'text-align: center;' : ''}">
            ${isVertical ? '<center>' : ''}
            <table cellpadding="0" cellspacing="0" border="0" style="${
              isVertical ? '' : 'display: inline-block; vertical-align: top;'
            }">
              <tr>
                ${template.layout === 'horizontal' && data.photo ? `
                  <td style="padding: 0 ${template.imageSpacing}px 0 0; vertical-align: top;">
                    <img 
                      src="${data.photo}" 
                      alt="${data.fullName}"
                      width="${imageSize}"
                      height="${imageSize}"
                      style="
                        border-radius: ${borderRadius};
                        object-fit: ${imageSettings?.objectFit || template.imageFit};
                        box-shadow: ${generateShadowStyle() || '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'};
                      "
                    />
                  </td>
                ` : ''}
                <td style="vertical-align: top;">
                  ${template.layout === 'vertical' && data.photo ? `
                    <div style="text-align: center; padding-bottom: ${template.imageSpacing}px; width: 100%;">
                      <img 
                        src="${data.photo}" 
                        alt="${data.fullName}"
                        width="${imageSize}"
                        height="${imageSize}"
                        style="
                          border-radius: ${borderRadius};
                          object-fit: ${imageSettings?.objectFit || template.imageFit};
                          box-shadow: ${generateShadowStyle() || '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'};
                        "
                      />
                    </div>
                  ` : ''}
                  <table cellpadding="0" cellspacing="0" border="0" style="text-align: left;">
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
                    ${data.jobTitle ? `
                      <tr>
                        <td style="padding-bottom: 6px; color: #666666;">
                          ${data.jobTitle}
                        </td>
                      </tr>
                    ` : ''}
                    ${data.company ? `
                      <tr>
                        <td style="font-weight: 600; padding-bottom: ${template.contentStyle === 'spacious' ? '20px' : '12px'};">
                          ${data.company}
                        </td>
                      </tr>
                    ` : ''}
                    <tr>
                      <td>
                        <table cellpadding="0" cellspacing="0" border="0">
                          ${data.email ? `
                            <tr>
                              <td style="padding: 3px 0;">
                                <img src="data:image/svg+xml,${encodeURIComponent(
                                  generateSvgIcon('email')
                                )}" alt="" style="width: 14px; height: 14px; margin-right: 8px; vertical-align: middle;" />
                                <a href="mailto:${data.email}" style="
                                  color: ${style.secondaryColor}; 
                                  text-decoration: none;
                                  transition: opacity 0.2s ease-in-out;
                                ">
                                  ${data.email}
                                </a>
                              </td>
                            </tr>
                          ` : ''}
                          ${data.phone ? `
                            <tr>
                              <td style="padding: 3px 0;">
                                <img src="data:image/svg+xml,${encodeURIComponent(
                                  generateSvgIcon('phone')
                                )}" alt="" style="width: 14px; height: 14px; margin-right: 8px; vertical-align: middle;" />
                                <a href="tel:${data.phone}" style="
                                  color: ${style.secondaryColor}; 
                                  text-decoration: none;
                                  transition: opacity 0.2s ease-in-out;
                                ">
                                  ${data.phone}
                                </a>
                              </td>
                            </tr>
                          ` : ''}
                          ${data.website ? `
                            <tr>
                              <td style="padding: 3px 0;">
                                <img src="data:image/svg+xml,${encodeURIComponent(
                                  generateSvgIcon('website')
                                )}" alt="" style="width: 14px; height: 14px; margin-right: 8px; vertical-align: middle;" />
                                <a href="${data.website}" style="
                                  color: ${style.secondaryColor}; 
                                  text-decoration: none;
                                  transition: opacity 0.2s ease-in-out;
                                ">
                                  ${data.website.replace(/^https?:\/\//, '')}
                                </a>
                              </td>
                            </tr>
                          ` : ''}
                          ${generateCTAs()}
                        </table>
                      </td>
                    </tr>
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
  }, [template, data, style, generateSvgIcon, imageSettings, generateShadowStyle, generateCTAs]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateHtml());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="animate-in scale-in shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
        <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          HTML Code
        </CardTitle>
        <Button
          size="sm"
          variant={copied ? "success" : "outline"}
          className="hover-lift transition-all duration-200"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy HTML
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="relative rounded-lg overflow-hidden shadow-md bg-muted/30 hover:bg-muted/40 transition-colors duration-200">
          <pre className={cn(
            "p-6 font-mono text-sm whitespace-pre-wrap break-all",
            "max-h-[400px] overflow-y-auto",
            "text-muted-foreground scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
          )}>
            {generateHtml()}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
