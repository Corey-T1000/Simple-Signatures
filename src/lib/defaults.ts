import { SignatureData, SignatureStyle, SignatureTemplate, ImageSettings } from '../types/signature';

// Base64 encoded placeholder avatar
const placeholderAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU3RUIiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI4NSIgcj0iMzUiIGZpbGw9IiM5Q0EzQUYiLz4KICA8cGF0aCBkPSJNMTY1IDE2NS41QzE2NSAxNDEuMjQgMTM1LjM3NiAxMjEuNSAxMDAgMTIxLjVDNjQuNjI0MyAxMjEuNSAzNSAxNDEuMjQgMzUgMTY1LjVDMzUgMTg5Ljc2IDEwMCAxODkuNzYgMTAwIDE4OS43NkMxMDAgMTg5Ljc2IDE2NSAxODkuNzYgMTY1IDE2NS41WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4=';

export const defaultData: SignatureData = {
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
  fontFamily: 'Inter',
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
  imageScale: 100,
  imageFit: 'cover',
  imageSpacing: 16,
  padding: {
    top: 16,
    right: 16,
    bottom: 16,
    left: 16,
  },
};

export const defaultImageSettings: ImageSettings = {
  width: 120,
  height: 120,
  objectFit: 'cover',
  lockAspectRatio: true,
  shadow: false,
  shadowColor: '#000000',
  shadowOpacity: 20,
  shadowBlur: 10,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
};