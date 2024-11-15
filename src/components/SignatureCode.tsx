import { useState, useMemo, useCallback } from 'react';
import { SignatureTemplate, SignatureData, SignatureStyle, ImageSettings, SignatureFieldType, Theme } from '../types/signature';
import { Button } from './ui/button';
import { Check, Copy, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface SignatureCodeProps {
  template: SignatureTemplate;
  data: SignatureData;
  style: SignatureStyle;
  imageSettings: ImageSettings;
  theme?: Theme;
}

export function SignatureCode({ template, data, style, imageSettings, theme = 'light' }: SignatureCodeProps) {
  const [copied, setCopied] = useState(false);

  const colors = useMemo(() => {
    // For dark theme, lighten user-selected colors
    if (theme === 'dark') {
      const lightenColor = (color: string, amount: number) => {
        const hex = color.replace('#', '');
        const r = Math.min(255, parseInt(hex.slice(0, 2), 16) + amount);
        const g = Math.min(255, parseInt(hex.slice(2, 4), 16) + amount);
        const b = Math.min(255, parseInt(hex.slice(4, 6), 16) + amount);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      };

      return {
        primary: lightenColor(style.primaryColor, 100),
        secondary: lightenColor(style.secondaryColor, 80),
        text: '#D1D5DB'
      };
    }

    // For light theme, use user-selected colors directly
    return {
      primary: style.primaryColor,
      secondary: style.secondaryColor,
      text: '#666666'
    };
  }, [theme, style.primaryColor, style.secondaryColor]);

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

    const field = template.fieldOrder.find(f => f.type === fieldType);
    const spacing = field?.spacing ?? 0;

    switch (fieldType) {
      case 'fullName':
        return `
          <tr>
            <td style="
              font-size: 20px;
              font-weight: bold;
              color: ${colors.primary};
              padding-bottom: ${spacing}px;
              letter-spacing: -0.02em;
            ">
              ${data.fullName}
            </td>
          </tr>
        `;
      case 'jobTitle':
        return data.jobTitle ? `
          <tr>
            <td style="padding-bottom: ${spacing}px; color: ${colors.text};">
              ${data.jobTitle}
            </td>
          </tr>
        ` : '';
      case 'company':
        return data.company ? `
          <tr>
            <td style="font-weight: 600; padding-bottom: ${spacing}px; color: ${colors.text};">
              ${data.company}
            </td>
          </tr>
        ` : '';
      case 'email':
        return data.email ? `
          <tr>
            <td style="padding-bottom: ${spacing}px;">
              <a href="mailto:${data.email}" style="
                color: ${colors.secondary}; 
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
            <td style="padding-bottom: ${spacing}px;">
              <a href="tel:${data.phone}" style="
                color: ${colors.secondary}; 
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
            <td style="padding-bottom: ${spacing}px;">
              <a href="${data.website}" style="
                color: ${colors.secondary}; 
                text-decoration: none;
              ">
                ${data.website}
              </a>
            </td>
          </tr>
        ` : '';
      case 'address':
        return data.address ? `
          <tr>
            <td style="color: ${colors.text}; padding-bottom: ${spacing}px;">
              ${data.address}
            </td>
          </tr>
        ` : '';
      case 'socialLinks':
        return data.socialLinks ? `
          <tr>
            <td style="padding-bottom: ${spacing}px;">
              <a href="${data.socialLinks}" style="
                color: ${colors.secondary}; 
                text-decoration: none;
              ">
                ${data.socialLinks}
              </a>
            </td>
          </tr>
        ` : '';
      case 'additionalCta':
        if (!data.additionalCtaText || !data.additionalCtaLink) return '';
        return `
          <tr>
            <td style="padding-bottom: ${spacing}px;">
              <a href="${data.additionalCtaLink}" style="
                color: ${colors.secondary}; 
                text-decoration: none;
              ">
                ${data.additionalCtaText}
              </a>
            </td>
          </tr>
        `;
      default:
        return '';
    }
  }, [isFieldVisible, data, colors, template.fieldOrder]);

  const generateHtml = useCallback(() => {
    const isVertical = template.layout === 'vertical';
    const imageSize = Math.round(100 * template.imageScale);
    const photoField = template.fieldOrder.find(f => f.type === 'photo');
    const imageSpacing = photoField?.spacing ?? 0;

    const html = `
      <table cellpadding="0" cellspacing="0" border="0" style="
        font-family: ${style.fontFamily};
        font-size: 14px;
        line-height: 1.4;
        color: ${theme === 'dark' ? '#D1D5DB' : '#333333'};
      ">
        ${isVertical ? `
          <tr>
            ${isFieldVisible('photo') && data.photo ? `
              <td style="padding-bottom: ${imageSpacing}px;">
                <img
                  src="${data.photo}"
                  alt="Profile"
                  width="${imageSize}"
                  height="${imageSize}"
                  style="
                    display: block;
                    width: ${imageSize}px;
                    height: ${imageSize}px;
                    object-fit: cover;
                    ${template.cornerRadius ? `border-radius: ${template.cornerRadius}%;` : ''}
                    ${generateShadowStyle() ? `box-shadow: ${generateShadowStyle()};` : ''}
                  "
                />
              </td>
            ` : ''}
          </tr>
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0">
                ${template.fieldOrder
                  .filter(field => field.type !== 'photo')
                  .map(field => renderField(field.type))
                  .join('')}
              </table>
            </td>
          </tr>
        ` : `
          <tr>
            <td style="vertical-align: top;">
              ${isFieldVisible('photo') && data.photo ? `
                <table cellpadding="0" cellspacing="0" border="0" style="float: left; margin-right: ${imageSpacing}px;">
                  <tr>
                    <td>
                      <img
                        src="${data.photo}"
                        alt="Profile"
                        width="${imageSize}"
                        height="${imageSize}"
                        style="
                          display: block;
                          width: ${imageSize}px;
                          height: ${imageSize}px;
                          object-fit: cover;
                          ${template.cornerRadius ? `border-radius: ${template.cornerRadius}%;` : ''}
                          ${generateShadowStyle() ? `box-shadow: ${generateShadowStyle()};` : ''}
                        "
                      />
                    </td>
                  </tr>
                </table>
              ` : ''}
              <table cellpadding="0" cellspacing="0" border="0">
                ${template.fieldOrder
                  .filter(field => field.type !== 'photo')
                  .map(field => renderField(field.type))
                  .join('')}
              </table>
            </td>
          </tr>
        `}
      </table>
    `.trim();

    return html;
  }, [template, data, style, imageSettings, generateShadowStyle, renderField, isFieldVisible, theme]);

  const html = useMemo(() => generateHtml(), [template, data, style, imageSettings, generateShadowStyle, renderField, isFieldVisible, theme]);

  const handleDownload = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'signature.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Card className="bg-background">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded border bg-card p-4">
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Card className="bg-background">
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">HTML Code</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    navigator.clipboard.writeText(html);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-[20rem] overflow-auto">
              <pre className="p-4 rounded bg-muted">
                <code className="text-sm text-foreground">{html}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
