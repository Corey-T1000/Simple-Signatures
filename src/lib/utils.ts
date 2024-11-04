import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove the # if present
  hex = hex.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: {
        const segment = (g - b) / d;
        const shift = g < b ? 6 : 0;
        h = segment + shift;
        break;
      }
      case g: {
        h = (b - r) / d + 2;
        break;
      }
      case b: {
        h = (r - g) / d + 4;
        break;
      }
    }
    h = h / 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function HSLToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function generateDarkModeColor(color: string): string {
  const hsl = hexToHSL(color);
  const backgroundLuminance = getLuminance(18, 18, 18); // #121212 dark mode background

  // Start with the original color's hue and saturation
  const { h } = hsl;
  let { s, l } = hsl;

  // For dark mode, we want to increase lightness while maintaining contrast
  if (l < 50) {
    // If the color is dark, make it lighter
    l = Math.min(90, l + 40);
  } else {
    // If the color is light, adjust less dramatically
    l = Math.min(85, l + 20);
  }

  // Adjust saturation to maintain vibrancy
  s = Math.min(100, s + 10);

  // Generate the new color
  const darkModeColor = HSLToHex(h, s, l);

  // Check contrast ratio with dark background
  const colorLuminance = getLuminance(
    parseInt(darkModeColor.slice(1, 3), 16),
    parseInt(darkModeColor.slice(3, 5), 16),
    parseInt(darkModeColor.slice(5, 7), 16)
  );

  const contrastRatio = getContrastRatio(colorLuminance, backgroundLuminance);

  // If contrast is not sufficient (WCAG AA requires 4.5:1 for normal text)
  if (contrastRatio < 4.5) {
    // Increase lightness until we meet the contrast requirement
    while (l < 95 && contrastRatio < 4.5) {
      l += 5;
      const adjustedColor = HSLToHex(h, s, l);
      const adjustedLuminance = getLuminance(
        parseInt(adjustedColor.slice(1, 3), 16),
        parseInt(adjustedColor.slice(3, 5), 16),
        parseInt(adjustedColor.slice(5, 7), 16)
      );
      const newContrastRatio = getContrastRatio(adjustedLuminance, backgroundLuminance);
      if (newContrastRatio >= 4.5) {
        return adjustedColor;
      }
    }
  }

  return darkModeColor;
}
