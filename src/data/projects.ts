import type { Lang } from '../i18n/ui';
import type { Service } from './services';

// Règle du pacte (Art. 11 et 13) : aucun client n'est montré sans son accord écrit.
// Les projets ci-dessous sont des EXEMPLES de mise en page (example: true, badge « Exemple » visible).
// Les remplacer par les études de cas réelles et autorisées (livraison prévue par Bryan) avant la mise en ligne.

type L<T> = Record<Lang, T>;

export interface Project {
  slug: L<string>;
  service: Service['id'];
  example?: boolean;
  title: L<string>;
  client: L<string>;
  result: L<string>;
  context: L<string>;
  done: L<string[]>;
  outcome: L<string>;
  /** Image de couverture (WebP dans /public/work/) ; sinon un visuel de remplacement est dessiné. */
  cover?: string;
  /** Identifiant de vidéo YouTube facultatif, lue à la demande. */
  youtube?: string;
  /** Motif du visuel de remplacement (0 à 5). */
  motif: number;
}

export const projects: Project[] = [
  {
    slug: { fr: 'identite-restaurant', en: 'restaurant-identity' },
    service: 'design',
    example: true,
    motif: 0,
    title: { fr: 'Identité visuelle d’un restaurant', en: 'Brand identity for a restaurant' },
    client: { fr: 'Restaurant, Douala', en: 'Restaurant, Douala' },
    result: { fr: 'Une image unifiée, du menu à l’enseigne', en: 'One unified image, from menu to signage' },
    context: {
      fr: 'Le restaurant utilisait un logo différent sur chaque support. Les clients ne le reconnaissaient pas sur les réseaux sociaux.',
      en: 'The restaurant used a different logo on every material. Customers did not recognise it on social media.',
    },
    done: {
      fr: ['Atelier de découverte avec les gérants', 'Nouveau logo et palette de couleurs', 'Menus, enseigne et modèles pour les réseaux sociaux'],
      en: ['Discovery workshop with the managers', 'New logo and colour palette', 'Menus, signage and social media templates'],
    },
    outcome: {
      fr: 'Une identité cohérente sur tous les supports, livrée en 3 semaines.',
      en: 'A consistent identity across every material, delivered in 3 weeks.',
    },
  },
  {
    slug: { fr: 'video-lancement-produit', en: 'product-launch-video' },
    service: 'video',
    example: true,
    motif: 1,
    title: { fr: 'Vidéo de lancement de produit', en: 'Product launch video' },
    client: { fr: 'Marque de cosmétiques, Yaoundé', en: 'Cosmetics brand, Yaoundé' },
    result: { fr: 'Une vidéo principale et 5 formats courts', en: 'One main video and 5 short formats' },
    context: {
      fr: 'La marque lançait une nouvelle gamme et voulait une vidéo pour ses réseaux et ses revendeurs.',
      en: 'The brand was launching a new range and needed a video for its social media and resellers.',
    },
    done: {
      fr: ['Script et repérages', 'Une journée de tournage', 'Montage, étalonnage et sous-titres'],
      en: ['Script and location scouting', 'One day of shooting', 'Editing, colour grading and subtitles'],
    },
    outcome: {
      fr: 'Une vidéo principale et cinq déclinaisons verticales prêtes à publier.',
      en: 'One main video and five vertical cuts ready to publish.',
    },
  },
  {
    slug: { fr: 'site-vitrine-pme', en: 'sme-website' },
    service: 'web',
    example: true,
    motif: 2,
    title: { fr: 'Site vitrine d’une PME', en: 'Website for an SME' },
    client: { fr: 'Entreprise de logistique, Douala', en: 'Logistics company, Douala' },
    result: { fr: 'Un site qui s’ouvre en moins de 2 secondes', en: 'A site that loads in under 2 seconds' },
    context: {
      fr: 'L’entreprise n’avait pas de site et perdait des appels d’offres face à des concurrents mieux présentés.',
      en: 'The company had no website and was losing tenders to better-presented competitors.',
    },
    done: {
      fr: ['Arborescence et textes', 'Maquettes mobile et ordinateur', 'Développement, référencement et formulaire'],
      en: ['Site map and copy', 'Mobile and desktop mock-ups', 'Development, SEO and contact form'],
    },
    outcome: {
      fr: 'Un site bilingue, rapide sur mobile, que l’équipe met à jour elle-même.',
      en: 'A bilingual site, fast on mobile, that the team updates itself.',
    },
  },
  {
    slug: { fr: 'reseaux-sociaux-boutique', en: 'shop-social-media' },
    service: 'community',
    example: true,
    motif: 3,
    title: { fr: 'Réseaux sociaux d’une boutique', en: 'Social media for a shop' },
    client: { fr: 'Boutique de mode, Douala', en: 'Fashion boutique, Douala' },
    result: { fr: 'Un calendrier tenu chaque semaine', en: 'A calendar kept every week' },
    context: {
      fr: 'La boutique publiait de façon irrégulière et répondait tard aux messages des clients.',
      en: 'The boutique posted irregularly and replied late to customer messages.',
    },
    done: {
      fr: ['Audit des comptes', 'Calendrier éditorial et ligne visuelle', 'Publication et réponses aux messages'],
      en: ['Account audit', 'Content calendar and visual style', 'Publishing and replying to messages'],
    },
    outcome: {
      fr: 'Une présence régulière et des messages traités dans la journée.',
      en: 'A steady presence and messages handled the same day.',
    },
  },
  {
    slug: { fr: 'assistant-ia-whatsapp', en: 'whatsapp-ai-assistant' },
    service: 'ai',
    example: true,
    motif: 4,
    title: { fr: 'Assistant IA sur WhatsApp', en: 'AI assistant on WhatsApp' },
    client: { fr: 'Centre de formation, Douala', en: 'Training centre, Douala' },
    result: { fr: 'Les questions fréquentes traitées automatiquement', en: 'Frequent questions handled automatically' },
    context: {
      fr: 'L’équipe passait des heures à répondre aux mêmes questions sur les horaires, les prix et les inscriptions.',
      en: 'The team spent hours answering the same questions about schedules, prices and enrolment.',
    },
    done: {
      fr: ['Recensement des questions fréquentes', 'Mise en place de l’assistant', 'Formation de l’équipe et suivi'],
      en: ['Listing frequent questions', 'Setting up the assistant', 'Team training and follow-up'],
    },
    outcome: {
      fr: 'Un assistant disponible à toute heure, l’équipe se concentre sur les cas complexes.',
      en: 'An assistant available around the clock; the team focuses on complex cases.',
    },
  },
  {
    slug: { fr: 'formation-ia-equipe', en: 'ai-team-training' },
    service: 'training',
    example: true,
    motif: 5,
    title: { fr: 'Formation IA pour une équipe', en: 'AI training for a team' },
    client: { fr: 'Cabinet de conseil, Yaoundé', en: 'Consulting firm, Yaoundé' },
    result: { fr: '12 personnes formées en 2 jours', en: '12 people trained in 2 days' },
    context: {
      fr: 'Le cabinet voulait que ses consultants utilisent l’IA pour rédiger et analyser plus vite, en sécurité.',
      en: 'The firm wanted its consultants to use AI to write and analyse faster, safely.',
    },
    done: {
      fr: ['Programme adapté à leurs missions', 'Deux journées d’ateliers pratiques', 'Guide des bonnes pratiques'],
      en: ['Programme tailored to their work', 'Two days of hands-on workshops', 'Best-practice guide'],
    },
    outcome: {
      fr: 'Des consultants autonomes et un guide interne pour toute l’équipe.',
      en: 'Self-sufficient consultants and an internal guide for the whole team.',
    },
  },
];

export const projectPath = (p: Project, lang: Lang) =>
  lang === 'fr' ? `/fr/realisations/${p.slug.fr}/` : `/en/work/${p.slug.en}/`;
