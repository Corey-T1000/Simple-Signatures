import React, { useCallback, useState } from 'react';
import { SignatureTemplate, SignatureData, SignatureStyle } from '../types/signature';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Check, Copy } from 'lucide-react';
import { cn } from '../lib/utils';

interface SignatureCodeProps {
  template: SignatureTemplate;
  data: SignatureData;
  style: SignatureStyle;
}

export function SignatureCode({ template, data, style }: SignatureCodeProps) {
  const [copied, setCopied] = useState(false);

  const generateHtml = useCallback(() => {
    const isVertical = template.layout === 'vertical';
    const imageClass = template.imageStyle === 'rounded' ? 'border-radius: 50%;' : 'border-radius: 4px;';
    const spacing = template.contentStyle === 'spacious' ? '16px' : '8px';

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
                <td style="padding-${isVertical ? 'bottom' : 'right'}: ${spacing};">
                  ${data.photo ? `
                    <img 
                      src="${data.photo}" 
                      alt="${data.fullName}"
                      width="${style.imageWidth}"
                      height="${style.imageHeight}"
                      style="
                        ${imageClass}
                        object-fit: ${style.imageFit};
                        transform: rotate(${style.imageRotation}deg) scale(${style.imageZoom});
                      "
                    />
                  ` : ''}
                </td>
                ${isVertical ? '</tr><tr>' : ''}
                <td style="vertical-align: top;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="
                        font-size: 18px;
                        font-weight: bold;
                        color: ${style.primaryColor};
                        padding-bottom: 4px;
                      ">
                        ${data.fullName}
                      </td>
                    </tr>
                    ${data.jobTitle ? `
                      <tr>
                        <td style="padding-bottom: 4px; color: #666666;">
                          ${data.jobTitle}
                        </td>
                      </tr>
                    ` : ''}
                    ${data.company ? `
                      <tr>
                        <td style="font-weight: 600; padding-bottom: ${spacing};">
                          ${data.company}
                        </td>
                      </tr>
                    ` : ''}
                    <tr>
                      <td>
                        <table cellpadding="0" cellspacing="0" border="0">
                          ${data.email ? `
                            <tr>
                              <td style="padding: 2px 0;">
                                ${template.showIcons ? `
                                  <img src="data:image/svg+xml,${encodeURIComponent(
                                    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${style.primaryColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`
                                  )}" alt="" style="width: 14px; height: 14px; margin-right: 6px; vertical-align: middle;" />
                                ` : ''}
                                <a href="mailto:${data.email}" style="color: ${style.secondaryColor}; text-decoration: none;">
                                  ${data.email}
                                </a>
                              </td>
                            </tr>
                          ` : ''}
                          ${data.phone ? `
                            <tr>
                              <td style="padding: 2px 0;">
                                ${template.showIcons ? `
                                  <img src="data:image/svg+xml,${encodeURIComponent(
                                    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${style.primaryColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
                                  )}" alt="" style="width: 14px; height: 14px; margin-right: 6px; vertical-align: middle;" />
                                ` : ''}
                                <a href="tel:${data.phone}" style="color: ${style.secondaryColor}; text-decoration: none;">
                                  ${data.phone}
                                </a>
                              </td>
                            </tr>
                          ` : ''}
                          ${data.website ? `
                            <tr>
                              <td style="padding: 2px 0;">
                                ${template.showIcons ? `
                                  <img src="data:image/svg+xml,${encodeURIComponent(
                                    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${style.primaryColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
                                  )}" alt="" style="width: 14px; height: 14px; margin-right: 6px; vertical-align: middle;" />
                                ` : ''}
                                <a href="${data.website}" style="color: ${style.secondaryColor}; text-decoration: none;">
                                  ${data.website.replace(/^https?:\/\//, '')}
                                </a>
                              </td>
                            </tr>
                          ` : ''}
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
  }, [template, data, style]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateHtml());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="relative">
          <pre className={cn(
            "p-4 rounded-lg font-mono text-sm whitespace-pre-wrap break-all",
            "max-h-[400px] overflow-y-auto",
            "bg-muted/50 text-muted-foreground"
          )}>
            {generateHtml()}
          </pre>
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-2 right-2"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy HTML
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
