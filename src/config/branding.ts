export interface BrandingConfig {
  institutionName: string
  primaryColor: string
  secondaryColor: string
  logoUrl: string
  supportPhone: string
  supportEmail: string
  currency: 'GHS'
}

export const defaultBranding: BrandingConfig = {
  institutionName: 'GhanaPay Demo Bank',
  primaryColor: '#0B7A75',
  secondaryColor: '#E3A008',
  logoUrl: 'https://dummyimage.com/120x40/0B7A75/ffffff&text=GhanaPay',
  supportPhone: '+233 30 200 0000',
  supportEmail: 'support@ghanapaydemo.com',
  currency: 'GHS',
}
