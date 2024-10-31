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
  imageWidth: number;
  imageHeight: number;
  imageFit: 'cover' | 'contain' | 'fill';
  imageRotation: number;
  imageZoom: number;
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
