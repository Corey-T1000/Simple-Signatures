import { useState } from 'react';
import { Button } from './UI/Button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './UI/Select';
import { Card, CardContent, CardHeader, CardTitle } from './UI/Card';
import { SignatureTemplate, SignatureData, SignatureStyle, ImageSettings } from '../types/signature';
import { Download, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ExportOptionsProps {
  data: SignatureData;
  style: SignatureStyle;
  template: SignatureTemplate;
  imageSettings?: ImageSettings;
}

type ExportFormat = 'html' | 'plainText' | 'richText';

export function ExportOptions({ template, data, style, imageSettings }: ExportOptionsProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('html');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateShadowStyle = () => {
    if (!imageSettings?.shadow) return '';
    const { shadowColor, shadowOpacity, shadowBlur, shadowOffsetX, shadowOffsetY } = imageSettings;
    const rgba = `rgba(${parseInt(shadowColor.slice(1, 3), 16)}, ${parseInt(shadowColor.slice(3, 5), 16)}, ${parseInt(shadowColor.slice(5, 7), 16)}, ${shadowOpacity})`;
    return `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${rgba}`;
  };

  const generateHtml = () => {
    const isVertical = template.layout === 'vertical';
    const imageSize = 100 * template.imageScale;

    let borderRadius = '8px';
    if (imageSettings?.shape === 'rounded') {
      borderRadius = `${imageSettings.cornerRadius}px`;
    } else if (template.imageStyle === 'rounded') {
      borderRadius = '50%';
    }

    return `
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
                                <a href="mailto:${data.email}" style="color: ${style.secondaryColor}; text-decoration: none;">
                                  ${data.email}
                                </a>
                              </td>
                            </tr>
                          ` : ''}
                          ${data.phone ? `
                            <tr>
                              <td style="padding: 3px 0;">
                                <a href="tel:${data.phone}" style="color: ${style.secondaryColor}; text-decoration: none;">
                                  ${data.phone}
                                </a>
                              </td>
                            </tr>
                          ` : ''}
                          ${data.website ? `
                            <tr>
                              <td style="padding: 3px 0;">
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
  };

  const convertToFormat = (format: ExportFormat): string => {
    try {
      switch (format) {
        case 'html':
          return generateHtml();
        case 'plainText': {
          const html = generateHtml();
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = html;
          return tempDiv.textContent || '';
        }
        case 'richText':
          return generateHtml();
        default:
          throw new Error('Unsupported format');
      }
    } catch {
      setError('Failed to convert signature to selected format');
      return '';
    }
  };

  const handleExport = async () => {
    try {
      setLoading(true);
      const content = convertToFormat(selectedFormat);
      const mimeType = selectedFormat === 'html' ? 'text/html' : 'text/plain';
      const extension = selectedFormat === 'html' ? 'html' : 'txt';
      
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `signature.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setError(null);
      setLoading(false);
    } catch {
      setError('Failed to download signature');
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Signature</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Select
            value={selectedFormat}
            onValueChange={(value) => setSelectedFormat(value as ExportFormat)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="image">Image</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export
              </>
            )}
          </Button>
        </div>
        {error && (
          <div className={cn(
            "p-3 rounded-lg text-sm",
            "bg-destructive/15 text-destructive"
          )} role="alert">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
