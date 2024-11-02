import { SignatureData, SignatureStyle, SignatureTemplate } from '../types/signature';

interface ParsedSignature {
  data: SignatureData;
  style: SignatureStyle;
  template: SignatureTemplate;
}

export function parseSignatureHtml(html: string): ParsedSignature | null {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Get the main table element
    const table = doc.querySelector('table');
    if (!table) return null;
    
    // Extract style from the main table
    const tableStyle = table.getAttribute('style') || '';
    const fontFamily = tableStyle.match(/font-family:\s*([^;]+)/)?.[1]?.trim() || 'Arial, sans-serif';
    
    // Extract colors
    const nameElement = doc.querySelector('[style*="font-weight: bold"]');
    const primaryColor = nameElement?.getAttribute('style')?.match(/color:\s*([^;]+)/)?.[1]?.trim() || '#2563eb';
    const linkElement = doc.querySelector('a');
    const secondaryColor = linkElement?.getAttribute('style')?.match(/color:\s*([^;]+)/)?.[1]?.trim() || '#4b5563';
    
    // Detect layout and alignment
    const mainCell = table.querySelector('td');
    const mainCellStyle = mainCell?.getAttribute('style') || '';
    const isVertical = mainCellStyle.includes('text-align: center');
    const innerTable = doc.querySelector('table table');
    const innerTableStyle = innerTable?.getAttribute('style') || '';
    
    // Extract image settings
    const img = doc.querySelector('img:not([src*="data:image/svg+xml"])');
    const imgStyle = img?.getAttribute('style') || '';
    const imageFit = imgStyle.match(/object-fit:\s*([^;]+)/)?.[1]?.trim() as 'cover' | 'contain' | 'fill' || 'cover';

    // Determine image alignment based on table structure and styles
    let imageAlignment: 'start' | 'center' | 'end' = 'center';
    if (isVertical) {
      // For vertical layout, check center tag and text-align
      const hasCenter = !!doc.querySelector('center');
      imageAlignment = hasCenter ? 'center' : 'start';
    } else {
      // For horizontal layout, check display and vertical-align properties
      if (innerTableStyle.includes('display: inline-block')) {
        const verticalAlign = innerTableStyle.match(/vertical-align:\s*([^;]+)/)?.[1]?.trim();
        if (verticalAlign === 'top') imageAlignment = 'start';
        else if (verticalAlign === 'bottom') imageAlignment = 'end';
      }
    }

    // Extract image style (rounded vs square)
    const imageStyle = img?.className?.includes('rounded-full') || 
                      imgStyle.includes('border-radius: 50%') ? 'rounded' : 'square';

    // Determine content spacing
    const contentSpacing = (() => {
      const contentCells = Array.from(doc.querySelectorAll('td'));
      for (const cell of contentCells) {
        const style = cell.getAttribute('style') || '';
        const padding = style.match(/padding(?:-bottom)?:\s*(\d+)px/)?.[1];
        if (padding && parseInt(padding) >= 16) {
          return 'spacious';
        }
      }
      return 'compact';
    })();

    // Check for icons and determine icon style
    const hasIcons = doc.querySelector('img[src*="data:image/svg+xml"]') !== null;
    const iconStyle = (() => {
      const iconSvg = doc.querySelector('img[src*="data:image/svg+xml"]')?.getAttribute('src') || '';
      return iconSvg.includes('fill="none"') ? 'outline' : 'solid';
    })();

    // Extract image scale
    const imageScale = (() => {
      if (img) {
        const actualWidth = parseInt(img.getAttribute('width') || '100');
        return actualWidth / 100;
      }
      return 1;
    })();

    // Extract padding
    const extractPadding = (style: string): number => {
      const matches = {
        top: style.match(/padding-top:\s*(\d+)px/)?.[1],
        right: style.match(/padding-right:\s*(\d+)px/)?.[1],
        bottom: style.match(/padding-bottom:\s*(\d+)px/)?.[1],
        left: style.match(/padding-left:\s*(\d+)px/)?.[1],
        all: style.match(/padding:\s*(\d+)px/)?.[1],
      };

      if (matches.all) {
        return parseInt(matches.all);
      }
      return parseInt(matches.top || matches.right || matches.bottom || matches.left || '16');
    };

    const padding = {
      top: extractPadding(mainCellStyle + ' padding-top: 16px'),
      right: extractPadding(mainCellStyle + ' padding-right: 24px'),
      bottom: extractPadding(mainCellStyle + ' padding-bottom: 16px'),
      left: extractPadding(mainCellStyle + ' padding-left: 24px')
    };

    // Extract data
    const data: SignatureData = {
      fullName: nameElement?.textContent?.trim() || '',
      jobTitle: doc.querySelector('[style*="color: #666666"]')?.textContent?.trim() || '',
      company: doc.querySelector('[style*="font-weight: 600"]')?.textContent?.trim() || '',
      email: doc.querySelector('a[href^="mailto:"]')?.textContent?.trim() || '',
      phone: doc.querySelector('a[href^="tel:"]')?.textContent?.trim() || '',
      website: doc.querySelector('a:not([href^="mailto:"]):not([href^="tel:"])')?.getAttribute('href') || '',
      linkedin: doc.querySelector('a[href*="linkedin.com"]')?.getAttribute('href') || '',
      twitter: doc.querySelector('a[href*="twitter.com"]')?.getAttribute('href') || '',
      photo: img?.getAttribute('src') || ''
    };

    return {
      data,
      style: {
        fontFamily,
        primaryColor,
        secondaryColor,
        imageFit
      },
      template: {
        name: 'classic',
        layout: isVertical ? 'vertical' : 'horizontal',
        imageStyle,
        contentStyle: contentSpacing,
        showIcons: hasIcons,
        iconStyle,
        imageAlignment,
        imageScale,
        imageFit,
        padding
      }
    };
  } catch (error) {
    console.error('Error parsing signature HTML:', error);
    return null;
  }
}
