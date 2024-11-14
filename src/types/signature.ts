export interface SignatureData {
  fullName: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  photo: string;
  ctaText: string;
  ctaLink: string;
  additionalCtaText: string;
  additionalCtaLink: string;
}

export interface SignatureStyle {
  fontFamily: string;
  primaryColor: string;
  secondaryColor: string;
  imageFit: 'cover' | 'contain' | 'fill';
}

export type SignatureFieldType = 'photo' | 'fullName' | 'jobTitle' | 'company' | 'email' | 'phone' | 'website' | 'cta' | 'additionalCta';

export interface SignatureFieldConfig {
  type: SignatureFieldType;
  enabled: boolean;
  visible: boolean;
  required?: boolean;
  id: string;
}

export interface SignatureTemplate {
  name: string;
  layout: 'horizontal' | 'vertical';
  imageStyle: 'rounded' | 'square';
  contentStyle: 'compact' | 'spacious';
  titleLayout: 'stacked' | 'inline';
  ctaLayout: 'stacked' | 'inline';
  imageAlignment: 'start' | 'center' | 'end';
  imageScale: number;
  imageFit: 'cover' | 'contain' | 'fill';
  imageSpacing: number;
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  fieldOrder: SignatureFieldConfig[];
}

export interface ImageSettings {
  enabled: boolean;
  width: number;
  height: number;
  objectFit: 'cover' | 'contain' | 'fill';
  lockAspectRatio: boolean;
  shadow: boolean;
  shadowColor: string;
  shadowOpacity: number;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  border: {
    width: number;
    color: string;
    style: 'solid' | 'dashed' | 'dotted';
  };
  shape: 'rounded' | 'square';
  cornerRadius: number;
}

export type Theme = 'light' | 'dark';

export interface SignatureElement {
  id: string;
  type: 'photo' | 'fullName' | 'jobTitle' | 'company' | 'email' | 'phone' | 'website' | 'cta' | 'additionalCta' | 'divider';
  label: string;
  visible: boolean;
  required?: boolean;
}
