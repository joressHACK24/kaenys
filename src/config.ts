// Coordonnées et réglages globaux. Remplacer les valeurs marquées TODO avant la mise en ligne.
export const SITE = {
  name: 'Kaenys',
  url: 'https://kaenys.com',
  email: 'contact@kaenys.com',
  // TODO: numéro WhatsApp Business au format international, sans + ni espaces (ex. 2376XXXXXXXX)
  whatsapp: '237600000000',
  // TODO: numéro d'appel affiché
  phone: '+237 6 00 00 00 00',
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
