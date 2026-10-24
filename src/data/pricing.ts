import type { Lang } from '../i18n/ui';
import type { Service } from './services';

// Grille publique « à partir de », à valider à deux (Art. 6 du pacte).
// TODO: renseigner `from` (en FCFA). Tant qu'il vaut null, la carte affiche « Sur devis ».

type L<T> = Record<Lang, T>;

export interface Plan {
  service: Service['id'];
  name: L<string>;
  from: number | null;
  unit?: L<string>;
  features: L<string[]>;
}

export const plans: Plan[] = [
  {
    service: 'design',
    name: { fr: 'Identité essentielle', en: 'Essential identity' },
    from: null,
    features: {
      fr: ['Logo et ses déclinaisons', 'Palette et typographies', 'Mini-charte en PDF'],
      en: ['Logo and its variations', 'Palette and typefaces', 'Short brand guide PDF'],
    },
  },
  {
    service: 'community',
    name: { fr: 'Réseaux sociaux', en: 'Social media' },
    from: null,
    unit: { fr: '/ mois', en: '/ month' },
    features: {
      fr: ['Deux réseaux au choix', 'Calendrier éditorial', 'Bilan mensuel'],
      en: ['Two networks of your choice', 'Content calendar', 'Monthly report'],
    },
  },
  {
    service: 'video',
    name: { fr: 'Vidéo courte', en: 'Short video' },
    from: null,
    features: {
      fr: ['Format de 30 à 60 secondes', 'Montage et sous-titres', 'Version verticale incluse'],
      en: ['30 to 60-second format', 'Editing and subtitles', 'Vertical version included'],
    },
  },
  {
    service: 'web',
    name: { fr: 'Site vitrine', en: 'Showcase website' },
    from: null,
    features: {
      fr: ['Jusqu’à 5 pages', 'Mobile d’abord, rapide', 'Référencement de base'],
      en: ['Up to 5 pages', 'Mobile-first and fast', 'Basic SEO'],
    },
  },
  {
    service: 'ai',
    name: { fr: 'Diagnostic IA', en: 'AI assessment' },
    from: null,
    features: {
      fr: ['Analyse de vos tâches', 'Recommandations d’outils', 'Plan de mise en place'],
      en: ['Review of your tasks', 'Tool recommendations', 'Implementation plan'],
    },
  },
  {
    service: 'training',
    name: { fr: 'Formation', en: 'Training' },
    from: null,
    unit: { fr: '/ personne', en: '/ person' },
    features: {
      fr: ['Sessions pratiques', 'Supports de cours', 'Attestation de participation'],
      en: ['Hands-on sessions', 'Course materials', 'Certificate of attendance'],
    },
  },
];

export const formatFCFA = (n: number, lang: Lang) =>
  `${new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US').format(n)} FCFA`;
