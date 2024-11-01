export interface SignatureData {
  fullName: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  twitter: string;
  photo: string;
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
  showIcons: boolean;
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
  type: 'fullName' | 'jobTitle' | 'company' | 'email' | 'phone' | 'website' | 'linkedin' | 'twitter' | 'photo' | 'divider';
  label: string;
  visible: boolean;
  required?: boolean;
}
