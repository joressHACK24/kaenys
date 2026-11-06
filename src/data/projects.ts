import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';
import type { Service } from './services';

// Réalisations de Kaenys. Mode d'emploi : GUIDE-REALISATIONS.md
//
// Règle du pacte (Art. 11 et 13) : aucun client n'est montré sans son accord écrit.
// Un projet ou un logo n'apparaît sur le site en ligne que si `authorized` vaut true.
// En local (npm run dev), ou avec la variable KAENYS_APERCU=1, tout est affiché pour relecture,
// avec la mention « En attente d'accord ».

type L<T> = Record<Lang, T>;

export type Category = 'social' | 'events' | 'community' | 'identity' | 'video';

export const categories: Record<Category, L<string>> = {
  social: { fr: 'Affiches & réseaux sociaux', en: 'Posters & social media' },
  events: { fr: 'Événementiel', en: 'Events' },
  community: { fr: 'Community management', en: 'Community management' },
  identity: { fr: 'Identité visuelle', en: 'Brand identity' },
  video: { fr: 'Vidéo', en: 'Video' },
};

/** Service correspondant à chaque catégorie, pour les « réalisations liées » des pages services. */
export const categoryServices: Record<Category, Service['id'][]> = {
  social: ['design', 'community'],
  events: ['design'],
  community: ['community'],
  identity: ['design'],
  video: ['video'],
};

export interface Project {
  /** Fin de l'adresse de la page : minuscules, tirets, sans accents. */
  slug: string;
  client: string;
  /** true seulement après l'accord écrit du client. */
  authorized: boolean;
  /** Position sur l'accueil (1 = premier). Sans ce champ, le projet n'y figure pas. */
  featured?: number;
  categories: Category[];
  sector: L<string>;
  place: L<string>;
  description: L<string>;
  /** Fichier dans src/assets/realisations/ */
  cover: string;
  images: { file: string; alt: L<string> }[];
  /** Identifiant de vidéo YouTube facultatif, lue au clic. */
  youtube?: string;
}

export interface ClientLogo {
  client: string;
  file: string;
  authorized: boolean;
}

const allProjects: Project[] = [
  {
    slug: "the-african-dream",
    client: "The African Dream",
    authorized: true,
    featured: 1,
    categories: ["social", "events"],
    sector: { fr: "Événementiel · Diaspora", en: "Events · Diaspora" },
    place: { fr: "Conférence internationale de la jeunesse africaine, Turin (Italie), 2026", en: "International African Youth Conference, Turin (Italy), 2026" },
    description: {
      fr: "Campagne visuelle complète de l’événement : annonce, orateurs, dîner, table ronde et billetterie.",
      en: "Full visual campaign for the event: announcement, speakers, dinner, round table and ticketing.",
    },
    cover: "01-the-african-dream/the-african-dream-01.webp",
    images: [
      { file: "01-the-african-dream/the-african-dream-01.webp", alt: { fr: "The African Dream — visuel 1", en: "The African Dream — visual 1" } },
      { file: "01-the-african-dream/the-african-dream-02.webp", alt: { fr: "The African Dream — visuel 2", en: "The African Dream — visual 2" } },
      { file: "01-the-african-dream/the-african-dream-03.webp", alt: { fr: "The African Dream — visuel 3", en: "The African Dream — visual 3" } },
      { file: "01-the-african-dream/the-african-dream-04.webp", alt: { fr: "The African Dream — visuel 4", en: "The African Dream — visual 4" } },
      { file: "01-the-african-dream/the-african-dream-05.webp", alt: { fr: "The African Dream — visuel 5", en: "The African Dream — visual 5" } },
      { file: "01-the-african-dream/the-african-dream-06.webp", alt: { fr: "The African Dream — visuel 6", en: "The African Dream — visual 6" } },
    ],
  },
  {
    slug: "malia-labo",
    client: "Malia Labo",
    authorized: true,
    featured: 4,
    categories: ["social", "community"],
    sector: { fr: "Santé · Laboratoire d’analyses", en: "Health · Medical laboratory" },
    place: { fr: "Douala", en: "Douala" },
    description: {
      fr: "Contenus mensuels pour les réseaux sociaux : campagnes de sensibilisation, temps forts et vœux.",
      en: "Monthly social media content: awareness campaigns, key dates and seasonal greetings.",
    },
    cover: "02-malia-labo/malia-labo-01.webp",
    images: [
      { file: "02-malia-labo/malia-labo-01.webp", alt: { fr: "Malia Labo — visuel 1", en: "Malia Labo — visual 1" } },
      { file: "02-malia-labo/malia-labo-02.webp", alt: { fr: "Malia Labo — visuel 2", en: "Malia Labo — visual 2" } },
      { file: "02-malia-labo/malia-labo-03.webp", alt: { fr: "Malia Labo — visuel 3", en: "Malia Labo — visual 3" } },
    ],
  },
  {
    slug: "cova",
    client: "COVA",
    authorized: true,
    featured: 6,
    categories: ["social"],
    sector: { fr: "Assurance", en: "Insurance" },
    place: { fr: "Cameroun", en: "Cameroon" },
    description: {
      fr: "Visuels de campagne : présentation de l’offre d’assurances et Journée internationale de la femme.",
      en: "Campaign visuals: presentation of the insurance offer and International Women’s Day.",
    },
    cover: "03-cova/cova-01.webp",
    images: [
      { file: "03-cova/cova-01.webp", alt: { fr: "COVA — visuel 1", en: "COVA — visual 1" } },
      { file: "03-cova/cova-02.webp", alt: { fr: "COVA — visuel 2", en: "COVA — visual 2" } },
    ],
  },
  {
    slug: "trefort-telecom",
    client: "Trefort Télécom",
    authorized: true,
    featured: 5,
    categories: ["social"],
    sector: { fr: "Commerce · Téléphonie", en: "Retail · Mobile phones" },
    place: { fr: "Douala, Akwa", en: "Douala, Akwa" },
    description: {
      fr: "Bannière Facebook, affiche de services et catalogues produits avec prix pour la vente en ligne.",
      en: "Facebook banner, services poster and product catalogues with prices for online sales.",
    },
    cover: "04-trefort-telecom/trefort-telecom-01.webp",
    images: [
      { file: "04-trefort-telecom/trefort-telecom-01.webp", alt: { fr: "Trefort Télécom — visuel 1", en: "Trefort Télécom — visual 1" } },
      { file: "04-trefort-telecom/trefort-telecom-02.webp", alt: { fr: "Trefort Télécom — visuel 2", en: "Trefort Télécom — visual 2" } },
      { file: "04-trefort-telecom/trefort-telecom-03.webp", alt: { fr: "Trefort Télécom — visuel 3", en: "Trefort Télécom — visual 3" } },
      { file: "04-trefort-telecom/trefort-telecom-04.webp", alt: { fr: "Trefort Télécom — visuel 4", en: "Trefort Télécom — visual 4" } },
    ],
  },
  {
    slug: "naal-consulting",
    client: "Naal Consulting",
    authorized: true,
    categories: ["social"],
    sector: { fr: "Immigration · Accompagnement", en: "Immigration · Advisory" },
    place: { fr: "Douala", en: "Douala" },
    description: {
      fr: "Affiches de présentation des services et visuel de masterclass en ligne.",
      en: "Posters presenting the services and an online masterclass visual.",
    },
    cover: "05-naal-consulting/naal-consulting-01.webp",
    images: [
      { file: "05-naal-consulting/naal-consulting-01.webp", alt: { fr: "Naal Consulting — visuel 1", en: "Naal Consulting — visual 1" } },
      { file: "05-naal-consulting/naal-consulting-02.webp", alt: { fr: "Naal Consulting — visuel 2", en: "Naal Consulting — visual 2" } },
      { file: "05-naal-consulting/naal-consulting-03.webp", alt: { fr: "Naal Consulting — visuel 3", en: "Naal Consulting — visual 3" } },
    ],
  },
  {
    slug: "projet-pro-fut-arena",
    client: "Projet Pro FA × Fut Arena",
    authorized: true,
    featured: 2,
    categories: ["social", "events"],
    sector: { fr: "Sport · Académies de football", en: "Sport · Football academies" },
    place: { fr: "Douala", en: "Douala" },
    description: {
      fr: "Série complète pour un tournoi jeunes : programme, affiches de matchs, palmarès et lancement de saison.",
      en: "Complete series for a youth tournament: schedule, match posters, awards and season launch.",
    },
    cover: "06-projet-pro-fut-arena/projet-pro-fut-arena-01.webp",
    images: [
      { file: "06-projet-pro-fut-arena/projet-pro-fut-arena-01.webp", alt: { fr: "Projet Pro FA × Fut Arena — visuel 1", en: "Projet Pro FA × Fut Arena — visual 1" } },
      { file: "06-projet-pro-fut-arena/projet-pro-fut-arena-02.webp", alt: { fr: "Projet Pro FA × Fut Arena — visuel 2", en: "Projet Pro FA × Fut Arena — visual 2" } },
      { file: "06-projet-pro-fut-arena/projet-pro-fut-arena-03.webp", alt: { fr: "Projet Pro FA × Fut Arena — visuel 3", en: "Projet Pro FA × Fut Arena — visual 3" } },
      { file: "06-projet-pro-fut-arena/projet-pro-fut-arena-04.webp", alt: { fr: "Projet Pro FA × Fut Arena — visuel 4", en: "Projet Pro FA × Fut Arena — visual 4" } },
      { file: "06-projet-pro-fut-arena/projet-pro-fut-arena-05.webp", alt: { fr: "Projet Pro FA × Fut Arena — visuel 5", en: "Projet Pro FA × Fut Arena — visual 5" } },
    ],
  },
  {
    slug: "club-ia-enspd",
    client: "Club IA de l’ENSPD",
    authorized: true,
    featured: 3,
    categories: ["social", "events"],
    sector: { fr: "Éducation · Association étudiante", en: "Education · Student association" },
    place: { fr: "Douala", en: "Douala" },
    description: {
      fr: "Communication annuelle du club : élection du bureau, conférences en ligne, fêtes et cérémonies.",
      en: "The club’s yearly communication: board election, online talks, celebrations and ceremonies.",
    },
    cover: "07-club-ia-enspd/club-ia-enspd-01.webp",
    images: [
      { file: "07-club-ia-enspd/club-ia-enspd-01.webp", alt: { fr: "Club IA de l’ENSPD — visuel 1", en: "Club IA de l’ENSPD — visual 1" } },
      { file: "07-club-ia-enspd/club-ia-enspd-02.webp", alt: { fr: "Club IA de l’ENSPD — visuel 2", en: "Club IA de l’ENSPD — visual 2" } },
      { file: "07-club-ia-enspd/club-ia-enspd-03.webp", alt: { fr: "Club IA de l’ENSPD — visuel 3", en: "Club IA de l’ENSPD — visual 3" } },
      { file: "07-club-ia-enspd/club-ia-enspd-04.webp", alt: { fr: "Club IA de l’ENSPD — visuel 4", en: "Club IA de l’ENSPD — visual 4" } },
    ],
  },
  {
    slug: "sylva-diet",
    client: "Sylva Diet",
    authorized: true,
    categories: ["social"],
    sector: { fr: "Bien-être · Produits naturels", en: "Wellness · Natural products" },
    place: { fr: "Cameroun", en: "Cameroon" },
    description: {
      fr: "Fiches produits pour deux infusions : bienfaits, mode d’emploi et composition.",
      en: "Product sheets for two herbal teas: benefits, directions and ingredients.",
    },
    cover: "08-sylva-diet/sylva-diet-01.webp",
    images: [
      { file: "08-sylva-diet/sylva-diet-01.webp", alt: { fr: "Sylva Diet — visuel 1", en: "Sylva Diet — visual 1" } },
      { file: "08-sylva-diet/sylva-diet-02.webp", alt: { fr: "Sylva Diet — visuel 2", en: "Sylva Diet — visual 2" } },
    ],
  },
  {
    slug: "new-visible-energy",
    client: "New Visible Energy",
    authorized: true,
    categories: ["social"],
    sector: { fr: "Technologie · Géolocalisation GPS", en: "Technology · GPS tracking" },
    place: { fr: "Douala", en: "Douala" },
    description: {
      fr: "Offres promotionnelles pour les traceurs GPS, destinées aux particuliers et aux écoles.",
      en: "Promotional offers for GPS trackers, aimed at individuals and schools.",
    },
    cover: "09-new-visible-energy/new-visible-energy-01.webp",
    images: [
      { file: "09-new-visible-energy/new-visible-energy-01.webp", alt: { fr: "New Visible Energy — visuel 1", en: "New Visible Energy — visual 1" } },
      { file: "09-new-visible-energy/new-visible-energy-02.webp", alt: { fr: "New Visible Energy — visuel 2", en: "New Visible Energy — visual 2" } },
    ],
  },
  {
    slug: "cfpmie",
    client: "CFPMIE",
    authorized: true,
    categories: ["social"],
    sector: { fr: "Formation professionnelle", en: "Vocational training" },
    place: { fr: "Douala", en: "Douala" },
    description: {
      fr: "Affiche d’inscription à une formation en construction métallique.",
      en: "Enrolment poster for a metal construction course.",
    },
    cover: "10-cfpmie/cfpmie-01.webp",
    images: [
      { file: "10-cfpmie/cfpmie-01.webp", alt: { fr: "CFPMIE — visuel 1", en: "CFPMIE — visual 1" } },
    ],
  },
  {
    slug: "tp-partners",
    client: "T&P Partners",
    authorized: true,
    categories: ["social"],
    sector: { fr: "Industrie · Ingénierie", en: "Industry · Engineering" },
    place: { fr: "Cameroun", en: "Cameroon" },
    description: {
      fr: "Flyer de présentation des produits et services industriels.",
      en: "Flyer presenting industrial products and services.",
    },
    cover: "11-tp-partners/tp-partners-01.webp",
    images: [
      { file: "11-tp-partners/tp-partners-01.webp", alt: { fr: "T&P Partners — visuel 1", en: "T&P Partners — visual 1" } },
    ],
  },
];

const allLogos: ClientLogo[] = [
  { client: "Maey’la Food", file: "identites-visuelles/logo-maeyla-food.webp", authorized: true },
  { client: "Paradise Foods", file: "identites-visuelles/logo-paradise-foods.webp", authorized: true },
  { client: "RYDI Group", file: "identites-visuelles/logo-rydi-group.webp", authorized: true },
  { client: "Corine Food", file: "identites-visuelles/logo-corine-food.webp", authorized: true },
  { client: "Pavel Barber", file: "identites-visuelles/logo-pavel-barber.webp", authorized: true },
  { client: "Starlight Entertainment", file: "identites-visuelles/logo-starlight-entertainment.webp", authorized: true },
  { client: "Mimi Shopping", file: "identites-visuelles/logo-mimi-shopping.webp", authorized: true },
  { client: "EGA E-sports", file: "identites-visuelles/logo-ega-e-sports.webp", authorized: true },
  { client: "Montana City Squad", file: "identites-visuelles/logo-montana-city-squad.webp", authorized: true },
  { client: "Pilule Tattoo", file: "identites-visuelles/logo-pilule-tattoo.webp", authorized: true },
];

// ---------------------------------------------------------------------------

export const PREVIEW_ALL = import.meta.env.DEV || process.env.KAENYS_APERCU === '1';

export const projects = allProjects.filter((p) => p.authorized || PREVIEW_ALL);
export const logos = allLogos.filter((l) => l.authorized || PREVIEW_ALL);
export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.featured! - b.featured!);

const files = import.meta.glob<ImageMetadata>('../assets/realisations/**/*.{webp,jpg,jpeg,png}', { import: 'default' });

/** Charge une image de src/assets/realisations/ (seules les images affichées sont publiées). */
export async function loadImage(file: string): Promise<ImageMetadata> {
  const load = files[`../assets/realisations/${file}`];
  if (!load) throw new Error(`Image introuvable : src/assets/realisations/${file}`);
  return load();
}

export const projectPath = (p: Project, lang: Lang) =>
  lang === 'fr' ? `/fr/realisations/${p.slug}/` : `/en/work/${p.slug}/`;
