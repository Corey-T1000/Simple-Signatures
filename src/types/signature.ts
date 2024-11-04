export interface SignatureData {
  photo: string;
  fullName: string;
  jobTitle: string;
  company: string;
  phone: string;
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

export interface SignatureTemplate {
  name: string;
  layout: 'horizontal' | 'vertical';
  imageStyle: 'rounded' | 'square';
  contentStyle: 'compact' | 'spacious';
  ctaLayout: 'stacked' | 'inline';
  showIcons: boolean;
  iconStyle: 'outline' | 'solid';
  imageAlignment: 'start' | 'center' | 'end';
  imageScale: number;
  imageFit: 'cover' | 'contain' | 'fill';
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface ImageSettings {
  width: number;
  height: number;
  rotation: number;
  zoom: number;
  objectFit: 'cover' | 'contain' | 'fill';
  backgroundColor: string;
  backgroundOpacity: number;
  backgroundBlur: number;
  lockAspectRatio: boolean;
}

export interface SignatureElement {
  id: string;
  type: 'photo' | 'fullName' | 'jobTitle' | 'company' | 'phone' | 'cta' | 'additionalCta' | 'divider';
  label: string;
  visible: boolean;
  required?: boolean;
}
