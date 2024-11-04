import { SignatureTemplate, SignatureData, SignatureStyle, ImageSettings } from '../types/signature';
import { Card } from './ui/card';
import { useTheme } from '../lib/use-theme';
import { ColorWarning } from './ui/ColorWarning';
import { useState, useEffect, CSSProperties } from 'react';

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

  const generateSvgIcon = (type: string) => {
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
  };

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

  const renderTitleSection = () => (
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

  const getImageStyle = (): CSSProperties => {
    const imageStyle: CSSProperties = {
      objectFit: imageSettings?.objectFit || template.imageFit,
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

  const renderCTAs = () => {
    if (!data.ctaText && !data.additionalCtaText) return null;

    if (template.ctaLayout === 'inline') {
      return (
        <tr>
          <td style={{ padding: spacing.itemPadding }}>
            {data.ctaText && (
              <a 
                href={data.ctaLink} 
                style={{ 
                  color: colors.secondary, 
                  textDecoration: 'none',
                  transition: 'all 0.2s ease-in-out'
                }}
                className="hover:opacity-80"
              >
                {data.ctaText}
              </a>
            )}
            {data.ctaText && data.additionalCtaText && (
              <span style={{ 
                color: colors.muted,
                padding: '0 8px'
              }}>
                •
              </span>
            )}
            {data.additionalCtaText && (
              <a 
                href={data.additionalCtaLink} 
                style={{ 
                  color: colors.secondary, 
                  textDecoration: 'none',
                  transition: 'all 0.2s ease-in-out'
                }}
                className="hover:opacity-80"
              >
                {data.additionalCtaText}
              </a>
            )}
          </td>
        </tr>
      );
    }

    return (
      <>
        {data.ctaText && (
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
              >
                {data.ctaText}
              </a>
            </td>
          </tr>
        )}
        {data.additionalCtaText && (
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
              >
                {data.additionalCtaText}
              </a>
            </td>
          </tr>
        )}
      </>
    );
  };

  return (
    <div className="space-y-2 animate-in scale-in">
      <Card className="overflow-hidden shadow-lg transition-shadow duration-200 hover:shadow-xl">
        <div className="p-6 bg-gradient-to-b from-background to-muted/10">
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
                  padding: `${template.padding.top}px ${template.padding.right}px ${template.padding.bottom}px ${template.padding.left}px`
                }}>
                  <table cellPadding="0" cellSpacing="0" border={0} style={{
                    display: 'inline-block',
                    verticalAlign: 'top'
                  }}>
                    <tbody>
                      <tr>
                        {template.layout === 'horizontal' && data.photo && (
                          <td style={{
                            padding: `0 ${template.imageSpacing}px 0 0`,
                            verticalAlign: 'top'
                          }}>
                            <img
                              src={data.photo}
                              alt={data.fullName}
                              width={100 * template.imageScale}
                              height={100 * template.imageScale}
                              style={getImageStyle()}
                            />
                          </td>
                        )}
                        <td style={{ verticalAlign: 'top' }}>
                          {template.layout === 'vertical' && data.photo && (
                            <div style={{ 
                              textAlign: 'center',
                              paddingBottom: template.imageSpacing,
                              width: '100%'
                            }}>
                              <img
                                src={data.photo}
                                alt={data.fullName}
                                width={100 * template.imageScale}
                                height={100 * template.imageScale}
                                style={getImageStyle()}
                              />
                            </div>
                          )}
                          <table cellPadding="0" cellSpacing="0" border={0} style={{
                            textAlign: 'left'
                          }}>
                            <tbody>
                              {renderTitleSection()}
                              <tr>
                                <td>
                                  <table cellPadding="0" cellSpacing="0" border={0}>
                                    <tbody>
                                      {data.email && (
                                        <tr>
                                          <td style={{ padding: spacing.itemPadding }}>
                                            <img
                                              src={`data:image/svg+xml,${encodeURIComponent(generateSvgIcon('email'))}`}
                                              alt=""
                                              style={{ width: '14px', height: '14px', marginRight: '8px', verticalAlign: 'middle' }}
                                            />
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
                                      )}
                                      {data.phone && (
                                        <tr>
                                          <td style={{ padding: spacing.itemPadding }}>
                                            <img
                                              src={`data:image/svg+xml,${encodeURIComponent(generateSvgIcon('phone'))}`}
                                              alt=""
                                              style={{ width: '14px', height: '14px', marginRight: '8px', verticalAlign: 'middle' }}
                                            />
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
                                      )}
                                      {data.website && (
                                        <tr>
                                          <td style={{ padding: spacing.itemPadding }}>
                                            <img
                                              src={`data:image/svg+xml,${encodeURIComponent(generateSvgIcon('website'))}`}
                                              alt=""
                                              style={{ width: '14px', height: '14px', marginRight: '8px', verticalAlign: 'middle' }}
                                            />
                                            <a 
                                              href={data.website} 
                                              style={{ 
                                                color: colors.secondary, 
                                                textDecoration: 'none',
                                                transition: 'all 0.2s ease-in-out'
                                              }}
                                              className="hover:opacity-80"
                                            >
                                              {data.website.replace(/^https?:\/\//, '')}
                                            </a>
                                          </td>
                                        </tr>
                                      )}
                                      {renderCTAs()}
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      <ColorWarning show={hasContrastWarning} />
    </div>
  );
}
