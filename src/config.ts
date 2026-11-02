// Coordonnées et réglages globaux. Remplacer les valeurs marquées TODO avant la mise en ligne.
export const SITE = {
  name: 'Kaenys',
  url: 'https://kaenys.com',
  email: 'contact@kaenys.com',
  // Numéro WhatsApp au format international, sans + ni espaces
  whatsapp: '237698479649',
  whatsappDisplay: '+237 698 47 96 49',
  // Numéro pour appeler
  phone: '+237 697 53 52 63',
  city: 'Douala',
  country: 'CM',
  social: {
    // TODO: liens des comptes officiels
    instagram: 'https://www.instagram.com/kaenys',
    facebook: 'https://www.facebook.com/kaenys',
    linkedin: 'https://www.linkedin.com/company/kaenys',
  },
  // TODO: jeton Cloudflare Web Analytics (Cloudflare > Web Analytics > Ajouter un site)
  cfAnalyticsToken: '',
} as const;

export const whatsappLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
