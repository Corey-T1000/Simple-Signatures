import { SignatureData, SignatureTemplate, SignatureStyle, ImageSettings } from '../types/signature';

// Base64 encoded placeholder avatar
export const placeholderAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU3RUIiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI4NSIgcj0iMzUiIGZpbGw9IiM5Q0EzQUYiLz4KICA8cGF0aCBkPSJNMTY1IDE2NS41QzE2NSAxNDEuMjQgMTM1LjM3NiAxMjEuNSAxMDAgMTIxLjVDNjQuNjI0MyAxMjEuNSAzNSAxNDEuMjQgMzUgMTY1LjVDMzUgMTg5Ljc2IDEwMCAxODkuNzYgMTAwIDE4OS43NkMxMDAgMTg5Ljc2IDE2NSAxODkuNzYgMTY1IDE2NS41WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4=';

export const defaultSignatureData: SignatureData = {
  fullName: 'Paul Atreides',
  jobTitle: 'Duke of House Atreides',
  company: 'Arrakis Spice Operations',
  email: 'paul@arrakis.dune',
  phone: '+1 (555) MELANGE',
  website: 'https://arrakis.dune',
  photo: 'https://images.unsplash.com/photo-1729067915069-fb84564ca0ec?auto=format&fit=crop&w=200&h=200',
  ctaText: 'Join the Spice Revolution',
  ctaLink: 'https://arrakis.dune/join',
  additionalCtaText: 'Learn About Spice Mining',
  additionalCtaLink: 'https://arrakis.dune/spice'
};

export const defaultStyle: SignatureStyle = {
  fontFamily: 'Inter, Arial, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  primaryColor: '#000000',
  secondaryColor: '#666666',
  imageFit: 'cover',
};

export const defaultTemplate: SignatureTemplate = {
  name: 'Default',
  layout: 'horizontal',
  imageStyle: 'rounded',
  contentStyle: 'compact',
  titleLayout: 'stacked',
  ctaLayout: 'stacked',
  imageAlignment: 'start',
  imageScale: 1,
  imageFit: 'cover',
  imageSpacing: 16,
  padding: {
    top: 16,
    right: 16,
    bottom: 16,
    left: 16,
  },
  fieldOrder: [
    { type: 'photo', visible: true, enabled: true, id: 'photo' },
    { type: 'fullName', visible: true, enabled: true, required: true, id: 'fullName' },
    { type: 'jobTitle', visible: true, enabled: true, id: 'jobTitle' },
    { type: 'company', visible: true, enabled: true, id: 'company' },
    { type: 'email', visible: true, enabled: true, required: true, id: 'email' },
    { type: 'phone', visible: true, enabled: true, id: 'phone' },
    { type: 'website', visible: true, enabled: true, id: 'website' },
    { type: 'cta', visible: false, enabled: true, id: 'cta' },
    { type: 'additionalCta', visible: false, enabled: true, id: 'additionalCta' }
  ],
};

export const defaultImageSettings: ImageSettings = {
  enabled: true,
  width: 100,
  height: 100,
  objectFit: 'cover',
  lockAspectRatio: true,
  shadow: false,
  shadowColor: '#000000',
  shadowOpacity: 0.2,
  shadowBlur: 10,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  border: {
    width: 0,
    color: '#000000',
    style: 'solid'
  },
  shape: 'rounded',
  cornerRadius: 8
};
