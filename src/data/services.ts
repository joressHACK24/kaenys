import type { Lang } from '../i18n/ui';

// Textes proposés à partir du cahier des charges : à relire et valider par Joress (offre et qualité).
// Les délais sont indicatifs et doivent être confirmés avant la mise en ligne.

type L<T> = Record<Lang, T>;

export interface Service {
  id: 'design' | 'community' | 'video' | 'web' | 'ai' | 'training';
  icon: string;
  slug: L<string>;
  title: L<string>;
  short: L<string>;
  headline: L<string>;
  intro: L<string>;
  forWho: L<string[]>;
  included: L<string[]>;
  delay: L<string>;
  deliverables: L<string[]>;
  faq: L<{ q: string; a: string }[]>;
}

export const services: Service[] = [
  {
    id: 'design',
    icon: 'pen',
    slug: { fr: 'design-identite-visuelle', en: 'design-brand-identity' },
    title: { fr: 'Design et identité visuelle', en: 'Design and brand identity' },
    short: {
      fr: 'Logo, charte, supports imprimés et numériques. Une image cohérente partout.',
      en: 'Logo, brand guidelines, print and digital materials. One consistent image everywhere.',
    },
    headline: { fr: 'Une marque qu’on reconnaît au premier regard.', en: 'A brand people recognise at first glance.' },
    intro: {
      fr: 'Nous créons ou modernisons votre identité visuelle : logo, couleurs, typographies et règles d’usage. Vous obtenez une image professionnelle, cohérente sur votre vitrine, vos réseaux sociaux et vos documents.',
      en: 'We create or refresh your visual identity: logo, colours, typefaces and usage rules. You get a professional image that stays consistent across your storefront, social media and documents.',
    },
    forWho: {
      fr: ['Entreprises qui se lancent', 'PME qui veulent moderniser leur image', 'Entrepreneurs et indépendants'],
      en: ['Businesses getting started', 'SMEs that want to modernise their image', 'Entrepreneurs and freelancers'],
    },
    included: {
      fr: ['Atelier de découverte de votre marque', 'Deux pistes créatives au choix', 'Logo en versions couleur, noir et blanc', 'Charte graphique simple', 'Deux séries de retours'],
      en: ['Brand discovery workshop', 'Two creative directions to choose from', 'Logo in colour and black-and-white versions', 'Simple brand guidelines', 'Two rounds of feedback'],
    },
    delay: { fr: '2 à 3 semaines', en: '2 to 3 weeks' },
    deliverables: {
      fr: ['Logo (SVG, PNG, PDF)', 'Charte graphique en PDF', 'Cartes de visite', 'Modèles pour les réseaux sociaux', 'Flyers et affiches'],
      en: ['Logo (SVG, PNG, PDF)', 'Brand guidelines PDF', 'Business cards', 'Social media templates', 'Flyers and posters'],
    },
    faq: {
      fr: [
        { q: 'Je suis propriétaire de mon logo ?', a: 'Oui. À la fin du projet et après paiement, vous recevez tous les fichiers sources et les droits d’utilisation.' },
        { q: 'Pouvez-vous seulement moderniser mon logo actuel ?', a: 'Oui. Nous pouvons partir de votre logo existant et le rendre plus lisible et plus actuel, sans perdre ce qui fait votre reconnaissance.' },
        { q: 'Combien de propositions vais-je recevoir ?', a: 'Deux pistes créatives au départ, puis deux séries de retours sur la piste choisie.' },
      ],
      en: [
        { q: 'Do I own my logo?', a: 'Yes. At the end of the project and after payment, you receive all source files and usage rights.' },
        { q: 'Can you just refresh my current logo?', a: 'Yes. We can start from your existing logo and make it clearer and more current, without losing what makes it recognisable.' },
        { q: 'How many proposals will I get?', a: 'Two creative directions to start with, then two rounds of feedback on the chosen one.' },
      ],
    },
  },
  {
    id: 'community',
    icon: 'chat',
    slug: { fr: 'community-management', en: 'community-management' },
    title: { fr: 'Community management', en: 'Community management' },
    short: {
      fr: 'Stratégie, contenus et animation de vos réseaux sociaux, chaque semaine.',
      en: 'Strategy, content and day-to-day management of your social media.',
    },
    headline: { fr: 'Des réseaux sociaux qui travaillent pour vous.', en: 'Social media that works for you.' },
    intro: {
      fr: 'Nous prenons en main vos pages Facebook, Instagram, TikTok et LinkedIn : calendrier éditorial, création des publications, réponses aux messages et bilan mensuel. Vous restez concentré sur votre activité.',
      en: 'We take care of your Facebook, Instagram, TikTok and LinkedIn pages: content calendar, post creation, replies to messages and a monthly report. You stay focused on your business.',
    },
    forWho: {
      fr: ['Commerces et restaurants', 'PME qui veulent plus de clients en ligne', 'Marques personnelles'],
      en: ['Shops and restaurants', 'SMEs looking for more customers online', 'Personal brands'],
    },
    included: {
      fr: ['Audit de vos comptes actuels', 'Calendrier éditorial mensuel', 'Création des visuels et des textes', 'Publication et modération', 'Bilan chiffré chaque mois'],
      en: ['Audit of your current accounts', 'Monthly content calendar', 'Visuals and copywriting', 'Publishing and moderation', 'Monthly performance report'],
    },
    delay: { fr: 'Démarrage sous 1 semaine, puis suivi mensuel', en: 'Start within 1 week, then monthly' },
    deliverables: {
      fr: ['Publications et carrousels', 'Stories et réels', 'Calendrier éditorial', 'Rapport mensuel'],
      en: ['Posts and carousels', 'Stories and reels', 'Content calendar', 'Monthly report'],
    },
    faq: {
      fr: [
        { q: 'Combien de publications par mois ?', a: 'Cela dépend de la formule choisie. Nous vous conseillons un rythme réaliste lors du brief.' },
        { q: 'Est-ce que je valide avant publication ?', a: 'Oui. Vous recevez le calendrier et les visuels à l’avance pour validation.' },
        { q: 'Gérez-vous aussi la publicité payante ?', a: 'Oui, sur demande. Le budget publicitaire est payé directement par vous aux plateformes.' },
      ],
      en: [
        { q: 'How many posts per month?', a: 'It depends on the package. We recommend a realistic pace during the brief.' },
        { q: 'Do I approve before posting?', a: 'Yes. You receive the calendar and visuals in advance for approval.' },
        { q: 'Do you handle paid ads too?', a: 'Yes, on request. The ad budget is paid directly by you to the platforms.' },
      ],
    },
  },
  {
    id: 'video',
    icon: 'play',
    slug: { fr: 'montage-video', en: 'video-editing' },
    title: { fr: 'Montage vidéo', en: 'Video editing' },
    short: {
      fr: 'Vidéos promotionnelles, réels, interviews et événements, tournés au Cameroun.',
      en: 'Promotional videos, reels, interviews and events, shot in Cameroon.',
    },
    headline: { fr: 'Des vidéos qu’on regarde jusqu’au bout.', en: 'Videos people watch to the end.' },
    intro: {
      fr: 'Tournage sur place à Douala et Yaoundé, montage, sous-titres, habillage et musique. Des formats adaptés à chaque réseau : vertical pour TikTok et Instagram, horizontal pour YouTube et vos présentations.',
      en: 'On-site shooting in Douala and Yaoundé, editing, subtitles, motion graphics and music. Formats tailored to each platform: vertical for TikTok and Instagram, horizontal for YouTube and presentations.',
    },
    forWho: {
      fr: ['Entreprises qui lancent un produit', 'Événements et conférences', 'Créateurs de contenu'],
      en: ['Businesses launching a product', 'Events and conferences', 'Content creators'],
    },
    included: {
      fr: ['Préparation et script', 'Tournage sur place', 'Montage et étalonnage', 'Sous-titres FR ou EN', 'Deux séries de retours'],
      en: ['Planning and script', 'On-site shooting', 'Editing and colour grading', 'French or English subtitles', 'Two rounds of feedback'],
    },
    delay: { fr: '5 à 10 jours après le tournage', en: '5 to 10 days after the shoot' },
    deliverables: {
      fr: ['Vidéo promotionnelle', 'Réels et formats courts', 'Interview ou témoignage', 'Aftermovie d’événement'],
      en: ['Promotional video', 'Reels and short formats', 'Interview or testimonial', 'Event aftermovie'],
    },
    faq: {
      fr: [
        { q: 'Je peux vous envoyer mes propres images ?', a: 'Oui. Nous montons aussi les vidéos que vous avez déjà tournées.' },
        { q: 'Vous vous déplacez hors de Douala ?', a: 'Oui, à Yaoundé et ailleurs au Cameroun. Les frais de déplacement sont indiqués dans le devis.' },
        { q: 'La musique est-elle libre de droits ?', a: 'Oui. Nous utilisons des musiques sous licence, utilisables sur les réseaux sociaux.' },
      ],
      en: [
        { q: 'Can I send you my own footage?', a: 'Yes. We also edit videos you have already filmed.' },
        { q: 'Do you travel outside Douala?', a: 'Yes, to Yaoundé and elsewhere in Cameroon. Travel costs are shown in the quote.' },
        { q: 'Is the music royalty-free?', a: 'Yes. We use licensed music that can be used on social media.' },
      ],
    },
  },
  {
    id: 'web',
    icon: 'code',
    slug: { fr: 'developpement-web-applications', en: 'web-app-development' },
    title: { fr: 'Développement web et applications', en: 'Web and app development' },
    short: {
      fr: 'Sites vitrines, boutiques en ligne et applications, rapides même en 3G.',
      en: 'Showcase sites, online stores and apps, fast even on 3G.',
    },
    headline: { fr: 'Un site rapide, clair, qui vous apporte des clients.', en: 'A fast, clear site that brings you customers.' },
    intro: {
      fr: 'Nous concevons des sites et des applications pensés pour le mobile d’abord, rapides même avec une connexion lente, et bien référencés sur Google. Vous pouvez les mettre à jour vous-même.',
      en: 'We build sites and apps designed mobile-first, fast even on slow connections, and well ranked on Google. You can update them yourself.',
    },
    forWho: {
      fr: ['Entreprises sans site ou avec un site daté', 'Commerces qui veulent vendre en ligne', 'Projets d’application'],
      en: ['Businesses with no site or an outdated one', 'Shops that want to sell online', 'App projects'],
    },
    included: {
      fr: ['Maquettes mobile et ordinateur', 'Développement sur mesure', 'Référencement de base', 'Formulaire de contact et WhatsApp', 'Formation à la mise à jour'],
      en: ['Mobile and desktop mock-ups', 'Custom development', 'Basic SEO', 'Contact form and WhatsApp', 'Training to update your site'],
    },
    delay: { fr: '3 à 6 semaines pour un site vitrine', en: '3 to 6 weeks for a showcase site' },
    deliverables: {
      fr: ['Site vitrine', 'Boutique en ligne', 'Application web', 'Page de lancement'],
      en: ['Showcase website', 'Online store', 'Web application', 'Landing page'],
    },
    faq: {
      fr: [
        { q: 'Le nom de domaine et l’hébergement sont-ils inclus ?', a: 'Nous vous aidons à les choisir. Ils sont enregistrés à votre nom, pour que vous en gardiez le contrôle.' },
        { q: 'Pourrai-je modifier mon site moi-même ?', a: 'Oui. Nous vous formons à la mise à jour des textes, images et actualités.' },
        { q: 'Mon site sera-t-il visible sur Google ?', a: 'Oui. Chaque site est livré avec un référencement de base : titres, descriptions, plan du site et vitesse optimisée.' },
      ],
      en: [
        { q: 'Are the domain and hosting included?', a: 'We help you choose them. They are registered in your name, so you stay in control.' },
        { q: 'Can I edit my site myself?', a: 'Yes. We train you to update text, images and news.' },
        { q: 'Will my site show up on Google?', a: 'Yes. Every site ships with basic SEO: titles, descriptions, sitemap and optimised speed.' },
      ],
    },
  },
  {
    id: 'ai',
    icon: 'spark',
    slug: { fr: 'intelligence-artificielle', en: 'artificial-intelligence' },
    title: { fr: 'Solutions d’intelligence artificielle', en: 'AI solutions' },
    short: {
      fr: 'Assistants, automatisations et outils d’IA adaptés à votre activité.',
      en: 'Assistants, automations and AI tools tailored to your business.',
    },
    headline: { fr: 'L’IA, au service de votre quotidien.', en: 'AI, working for your day-to-day.' },
    intro: {
      fr: 'Nous identifions les tâches répétitives de votre activité et mettons en place des outils d’IA concrets : assistant qui répond à vos clients, génération de contenus, traitement de documents, automatisations.',
      en: 'We identify the repetitive tasks in your business and set up practical AI tools: an assistant that answers your customers, content generation, document processing, automations.',
    },
    forWho: {
      fr: ['PME qui veulent gagner du temps', 'Services clients très sollicités', 'Équipes qui produisent beaucoup de contenu'],
      en: ['SMEs that want to save time', 'Busy customer service teams', 'Teams producing lots of content'],
    },
    included: {
      fr: ['Diagnostic de vos besoins', 'Choix des outils adaptés', 'Mise en place et tests', 'Formation de votre équipe', 'Suivi le premier mois'],
      en: ['Needs assessment', 'Choice of the right tools', 'Set-up and testing', 'Team training', 'Follow-up during the first month'],
    },
    delay: { fr: '1 à 4 semaines selon le projet', en: '1 to 4 weeks depending on the project' },
    deliverables: {
      fr: ['Assistant WhatsApp ou site web', 'Automatisation de tâches', 'Modèles de contenus', 'Guide d’utilisation'],
      en: ['WhatsApp or website assistant', 'Task automation', 'Content templates', 'User guide'],
    },
    faq: {
      fr: [
        { q: 'Faut-il des compétences techniques ?', a: 'Non. Nous mettons tout en place et formons votre équipe à l’utilisation.' },
        { q: 'Mes données restent-elles confidentielles ?', a: 'Oui. Nous choisissons des outils qui respectent la confidentialité et nous vous expliquons où vont vos données.' },
        { q: 'Combien coûtent les outils d’IA ?', a: 'Certains sont gratuits, d’autres payants à l’usage. Nous vous présentons le coût réel avant de commencer.' },
      ],
      en: [
        { q: 'Do I need technical skills?', a: 'No. We set everything up and train your team to use it.' },
        { q: 'Does my data stay confidential?', a: 'Yes. We choose tools that respect confidentiality and explain where your data goes.' },
        { q: 'How much do AI tools cost?', a: 'Some are free, others are pay-as-you-go. We show you the real cost before we start.' },
      ],
    },
  },
  {
    id: 'training',
    icon: 'book',
    slug: { fr: 'formation', en: 'training' },
    title: { fr: 'Formation', en: 'Training' },
    short: {
      fr: 'Formations à l’IA et aux outils numériques, pour les équipes et les particuliers.',
      en: 'Training in AI and digital tools, for teams and individuals.',
    },
    headline: { fr: 'Apprenez les outils qui comptent aujourd’hui.', en: 'Learn the tools that matter today.' },
    intro: {
      fr: 'Des formations pratiques, en petits groupes ou en entreprise : intelligence artificielle, réseaux sociaux, design avec Canva, bureautique. Inscription par le formulaire ou WhatsApp, paiement par mobile money.',
      en: 'Hands-on training, in small groups or on-site: artificial intelligence, social media, design with Canva, office tools. Sign up via the form or WhatsApp, pay by mobile money.',
    },
    forWho: {
      fr: ['Étudiants et jeunes diplômés', 'Particuliers en reconversion', 'Équipes en entreprise'],
      en: ['Students and recent graduates', 'People changing careers', 'Company teams'],
    },
    included: {
      fr: ['Sessions pratiques sur vos propres cas', 'Supports de cours', 'Exercices entre les sessions', 'Attestation de participation'],
      en: ['Hands-on sessions on your own cases', 'Course materials', 'Exercises between sessions', 'Certificate of attendance'],
    },
    delay: { fr: 'Sessions de 1 jour à 4 semaines', en: 'Sessions from 1 day to 4 weeks' },
    deliverables: {
      fr: ['Formation IA pour débutants', 'Atelier réseaux sociaux', 'Formation Canva', 'Formation sur mesure en entreprise'],
      en: ['AI for beginners', 'Social media workshop', 'Canva training', 'Custom in-company training'],
    },
    faq: {
      fr: [
        { q: 'Comment s’inscrire ?', a: 'Par le formulaire de contact ou sur WhatsApp. Nous confirmons votre place à réception du paiement.' },
        { q: 'Comment payer ?', a: 'Par mobile money (Orange Money ou MTN MoMo). Le paiement est confirmé manuellement par notre équipe.' },
        { q: 'Faut-il un ordinateur ?', a: 'C’est recommandé. Certaines formations peuvent se suivre sur smartphone ; nous vous le précisons à l’inscription.' },
      ],
      en: [
        { q: 'How do I sign up?', a: 'Through the contact form or on WhatsApp. We confirm your seat once payment is received.' },
        { q: 'How do I pay?', a: 'By mobile money (Orange Money or MTN MoMo). Payment is confirmed manually by our team.' },
        { q: 'Do I need a computer?', a: 'It is recommended. Some courses can be followed on a smartphone; we let you know when you sign up.' },
      ],
    },
  },
];

export const serviceById = (id: Service['id']) => services.find((s) => s.id === id)!;

export const servicePath = (s: Service, lang: Lang) => `/${lang}/services/${s.slug[lang]}/`;
