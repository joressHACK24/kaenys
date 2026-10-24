import type { Lang } from '../i18n/ui';

// Témoignages clients, publiés uniquement avec autorisation écrite (Art. 11 et 13 du pacte).
// La section « Ils nous ont fait confiance » de l'accueil n'apparaît que si cette liste n'est pas vide.

export interface Testimonial {
  name: string;
  role: Record<Lang, string>;
  quote: Record<Lang, string>;
}

export const testimonials: Testimonial[] = [];
