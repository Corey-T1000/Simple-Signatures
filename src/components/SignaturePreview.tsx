import React, { useState, useEffect, CSSProperties, Fragment } from 'react';
import { SignatureTemplate, SignatureData, SignatureStyle, ImageSettings } from '../types/signature';
import { Card } from './ui/card';
import { useTheme } from '../lib/use-theme';
import { ColorWarning } from './ui/colorWarning';

interface SignaturePreviewProps {
  data: SignatureData;
  style: SignatureStyle;
  template: SignatureTemplate;
  imageSettings?: ImageSettings;
}

export function SignaturePreview({ data, style, template, imageSettings }: SignaturePreviewProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [hasContrastWarning, setHasContrastWarning] = useState(false);

  const isCompact = template.contentStyle === 'compact';
  const spacing = isCompact ? {
    titleBottom: '2px',
    sectionBottom: '6px',
    itemPadding: '1px 0',
    lineHeight: '1'
  } : {
    titleBottom: '6px',
    sectionBottom: '16px',
    itemPadding: '3px 0',
    lineHeight: '1.4'
  };

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Calculate relative luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Calculate contrast ratio
  const getContrastRatio = (l1: number, l2: number) => {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  // Check if color meets contrast requirements
  const meetsContrastRequirements = (color: string, bgColor: string, minRatio: number = 4.5): boolean => {
    const rgb = hexToRgb(color);
    const bgRgb = hexToRgb(bgColor);
    if (!rgb || !bgRgb) return true; // If we can't calculate, assume it's fine

    const colorLuminance = getLuminance(rgb.r, rgb.g, rgb.b);
    const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    const ratio = getContrastRatio(colorLuminance, bgLuminance);

    return ratio >= minRatio;
  };

  // Generate shadow style
  const getShadowStyle = () => {
    if (!imageSettings?.shadow) return '';
    const { shadowColor, shadowOpacity, shadowBlur, shadowOffsetX, shadowOffsetY } = imageSettings;
    const rgba = `rgba(${parseInt(shadowColor.slice(1, 3), 16)}, ${parseInt(shadowColor.slice(3, 5), 16)}, ${parseInt(shadowColor.slice(5, 7), 16)}, ${shadowOpacity})`;
    return `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${rgba}`;
  };

  // Adjust color for dark mode while preserving hue
  const adjustColorForDarkMode = (color: string, isName: boolean = false): string => {
    if (!isDark) return color;

    const rgb = hexToRgb(color);
    if (!rgb) return color;

    // Convert RGB to HSL
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    // For name color (primary), make it much lighter in dark mode
    // For other colors (secondary), make them moderately lighter
    const newL = isName ? 0.9 : Math.min(0.8, l * 1.75);

    // Convert back to RGB
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = newL < 0.5 ? newL * (1 + s) : newL + s - newL * s;
    const p = 2 * newL - q;

    const newR = Math.round(hue2rgb(p, q, h + 1/3) * 255);
    const newG = Math.round(hue2rgb(p, q, h) * 255);
    const newB = Math.round(hue2rgb(p, q, h - 1/3) * 255);

    return `rgb(${newR}, ${newG}, ${newB})`;
  };

  const backgroundColor = isDark ? '#1e293b' : '#ffffff';
  const colors = {
    primary: adjustColorForDarkMode(style.primaryColor, true),
    secondary: adjustColorForDarkMode(style.secondaryColor),
    muted: isDark ? '#94a3b8' : '#666666',
  };

  // Check contrast ratios and update warning state
  useEffect(() => {
    const primaryMeetsContrast = meetsContrastRequirements(colors.primary, backgroundColor);
    const secondaryMeetsContrast = meetsContrastRequirements(colors.secondary, backgroundColor);
    setHasContrastWarning(!primaryMeetsContrast || !secondaryMeetsContrast);
  }, [colors.primary, colors.secondary, backgroundColor]);

  const getImageSize = () => {
    const baseSize = 120;
    const scale = template.imageScale / 100;
    return Math.round(baseSize * scale);
  };

  const getImageStyle = (): CSSProperties => {
    const imageStyle: CSSProperties = {
      objectFit: imageSettings?.objectFit || template.imageFit,
      width: `${getImageSize()}px`,
      height: `${getImageSize()}px`,
      maxWidth: '300px',
      maxHeight: '300px',
      boxShadow: getShadowStyle(),
    };

    if (imageSettings?.shape === 'rounded') {
      imageStyle.borderRadius = `${imageSettings.cornerRadius}px`;
    } else if (template.imageStyle === 'rounded') {
      imageStyle.borderRadius = '9999px';
    } else {
      imageStyle.borderRadius = '8px';
    }

    return imageStyle;
  };

  const renderField = (type: string) => {
    switch (type) {
      case 'photo':
        return null; // Photo is handled separately in the layout
      case 'fullName':
        return (
          <>
            <tr>
              <td style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: colors.primary,
                letterSpacing: '-0.02em',
                lineHeight: spacing.lineHeight,
                paddingBottom: spacing.titleBottom
              }}>
                {data.fullName}
              </td>
            </tr>
            {(data.jobTitle || data.company) && (
              <tr>
                <td style={{ paddingBottom: spacing.sectionBottom }}>
                  {template.titleLayout === 'inline' ? (
                    <table cellPadding="0" cellSpacing="0" border={0}>
                      <tbody>
                        <tr>
                          {data.jobTitle && (
                            <td style={{ 
                              color: colors.muted,
                              lineHeight: spacing.lineHeight,
                              paddingRight: '8px'
                            }}>
                              {data.jobTitle}
                            </td>
                          )}
                          {data.jobTitle && data.company && (
                            <td style={{ 
                              color: colors.muted,
                              lineHeight: spacing.lineHeight,
                              paddingRight: '8px'
                            }}>
                              •
                            </td>
                          )}
                          {data.company && (
                            <td style={{ 
                              fontWeight: 600,
                              lineHeight: spacing.lineHeight,
                              color: colors.secondary
                            }}>
                              {data.company}
                            </td>
                          )}
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <>
                      {data.jobTitle && (
                        <div style={{ 
                          color: colors.muted,
                          lineHeight: spacing.lineHeight,
                          paddingBottom: data.company ? '2px' : 0
                        }}>
                          {data.jobTitle}
                        </div>
                      )}
                      {data.company && (
                        <div style={{ 
                          fontWeight: 600,
                          lineHeight: spacing.lineHeight,
                          color: colors.secondary
                        }}>
                          {data.company}
                        </div>
                      )}
                    </>
                  )}
                </td>
              </tr>
            )}
          </>
        );
      case 'divider':
        return (
          <tr>
            <td style={{ paddingBottom: spacing.sectionBottom }} />
          </tr>
        );
      case 'email':
        return data.email && (
          <tr>
            <td style={{ padding: spacing.itemPadding }}>
              <a
                href={`mailto:${data.email}`}
                style={{
                  color: colors.secondary,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease-in-out'
                }}
                className="hover:opacity-80"
              >
                {data.email}
              </a>
            </td>
          </tr>
        );
      case 'phone':
        return data.phone && (
          <tr>
            <td style={{ padding: spacing.itemPadding }}>
              <a
                href={`tel:${data.phone}`}
                style={{
                  color: colors.secondary,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease-in-out'
                }}
                className="hover:opacity-80"
              >
                {data.phone}
              </a>
            </td>
          </tr>
        );
      case 'website':
        return data.website && (
          <tr>
            <td style={{ padding: spacing.itemPadding }}>
              <a
                href={data.website}
                style={{
                  color: colors.secondary,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease-in-out'
                }}
                className="hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.website.replace(/^https?:\/\//, '')}
              </a>
            </td>
          </tr>
        );
      case 'cta':
        return data.ctaText && (
          <tr>
            <td style={{ padding: spacing.itemPadding }}>
              <a
                href={data.ctaLink}
                style={{
                  color: colors.secondary,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease-in-out'
                }}
                className="hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.ctaText}
              </a>
            </td>
          </tr>
        );
      case 'additionalCta':
        return data.additionalCtaText && (
          <tr>
            <td style={{ padding: spacing.itemPadding }}>
              <a
                href={data.additionalCtaLink}
                style={{
                  color: colors.secondary,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease-in-out'
                }}
                className="hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.additionalCtaText}
              </a>
            </td>
          </tr>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2 animate-in scale-in">
      <Card className="overflow-hidden shadow-lg transition-shadow duration-200 hover:shadow-xl">
        <div style={{
          padding: `${template.padding.top}px ${template.padding.right}px ${template.padding.bottom}px ${template.padding.left}px`,
          background: 'linear-gradient(180deg, var(--background) 0%, var(--muted-10) 100%)'
        }}>
          <table cellPadding="0" cellSpacing="0" border={0} style={{
            fontFamily: style.fontFamily,
            color: colors.secondary,
            fontSize: '14px',
            lineHeight: spacing.lineHeight,
          }}>
            <tbody>
              <tr>
                <td style={{
                  verticalAlign: 'top',
                  textAlign: 'left',
                }}>
                  <table cellPadding="0" cellSpacing="0" border={0} style={{
                    display: 'inline-block',
                    verticalAlign: 'top'
                  }}>
                    <tbody>
                      <tr>
                        {template.layout === 'horizontal' && template.fieldOrder.find(f => f.type === 'photo' && f.visible) && (
                          <td style={{
                            padding: `0 ${template.imageSpacing}px 0 0`,
                            verticalAlign: 'top'
                          }}>
                            <img
                              src={data.photo}
                              alt={data.fullName}
                              style={getImageStyle()}
                            />
                          </td>
                        )}
                        <td style={{ verticalAlign: 'top' }}>
                          {template.layout === 'vertical' && template.fieldOrder.find(f => f.type === 'photo' && f.visible) && (
                            <div style={{ 
                              textAlign: 'center',
                              paddingBottom: template.imageSpacing,
                              width: '100%'
                            }}>
                              <img
                                src={data.photo}
                                alt={data.fullName}
                                style={getImageStyle()}
                              />
                            </div>
                          )}
                          <table cellPadding="0" cellSpacing="0" border={0} style={{
                            textAlign: 'left'
                          }}>
                            <tbody>
                              {template.fieldOrder
                                .filter(field => field.visible)
                                .map((field, index) => (
                                  <Fragment key={`${field.type}-${index}`}>
                                    {renderField(field.type)}
                                  </Fragment>
                                ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      {hasContrastWarning && <ColorWarning />}
    </div>
  );
}
