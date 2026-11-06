# Site web Kaenys

Site vitrine de Kaenys, construit selon le cahier des charges v1.1 du 22 octobre 2026.
Astro (pages statiques très légères), hébergé sur Cloudflare Pages, en français et en anglais.

## Démarrer

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # génère le site dans dist/
npm run preview   # sert dist/ en local
```

## Où modifier quoi

| Contenu | Fichier |
| --- | --- |
| Coordonnées, WhatsApp, réseaux, jeton statistiques | `src/config.ts` |
| Textes de l'interface (FR et EN) | `src/i18n/ui.ts` |
| Les 6 services (textes, inclus, délais, FAQ) | `src/data/services.ts` |
| Réalisations (portfolio) | `src/data/projects.ts` + images dans `src/assets/realisations/` |
| Tarifs « à partir de » | `src/data/pricing.ts` |
| Témoignages | `src/data/testimonials.ts` |
| Pages légales | `src/data/legal.ts` |
| Couleurs, typographie, espacements | `src/styles/global.css` |
| Logo | `src/data/logo.ts` |

## À faire avant la mise en ligne (16 novembre 2026)

- [ ] **Logo** : remplacer le tracé provisoire (`src/data/logo.ts`, `public/favicon.svg`, `public/logo-kaenys.svg`) par les SVG officiels.
- [ ] **Police Unigeo** : vérifier la licence web, déposer `public/fonts/unigeo.woff2`, puis décommenter le bloc `@font-face` en haut de `src/styles/global.css`. En attendant, les titres sont en Poppins.
- [x] **Coordonnées** : WhatsApp +237 698 47 96 49, appels +237 697 53 52 63.
- [ ] **Réseaux sociaux** : vérifier les liens Instagram, Facebook et LinkedIn dans `src/config.ts`.
- [ ] **Tarifs** : renseigner les montants `from` dans `src/data/pricing.ts` (affiche « Sur devis » tant qu'ils sont vides).
- [x] **Réalisations (partie 1)** : 11 projets et 10 logos en ligne. Chaque projet a un champ `authorized` : le passer à `false` cache le projet si un client retire son accord. Ajout d'un projet : **[GUIDE-REALISATIONS.md](GUIDE-REALISATIONS.md)**.
- [ ] **Réalisations (partie 2)** : les vidéos, via YouTube (champ `youtube`).
- [ ] **Équipe** : photo de Bryan en place ; photo de Joress à ajouter (`public/team/joress.webp`, champ `photo` dans `src/views/AboutView.astro`).
- [ ] **Textes** : relire et valider tous les textes FR et EN proposés (services, délais, à propos).
- [ ] **Pages légales** : compléter les crochets `[...]` et faire relire par un professionnel.
- [ ] **Formulaire** : créer un compte Resend (gratuit), vérifier le domaine kaenys.com, puis ajouter dans Cloudflare Pages les variables `RESEND_API_KEY` (secret), `MAIL_FROM` (ex. `Kaenys <site@kaenys.com>`) et `MAIL_TO` (`contact@kaenys.com`).
- [ ] **Statistiques** : activer Cloudflare Web Analytics et coller le jeton dans `src/config.ts`.

## Mise en ligne sur Cloudflare Pages

1. Pousser ce dossier sur le dépôt GitHub de Kaenys.
2. Cloudflare > Workers & Pages > Créer > Pages > connecter le dépôt.
3. Préréglage **Astro**, commande `npm run build`, dossier de sortie `dist`.
4. Ajouter les variables d'environnement du formulaire (voir ci-dessus).
5. Domaine personnalisé : `kaenys.com`.

Le dossier `functions/` contient la fonction serveur du formulaire de devis (`/api/devis`) ; Cloudflare Pages la déploie automatiquement.

## Choix de conception

- **Style** : inspiré d'Apple — grande typographie, beaucoup d'espace, sections alternées blanc / bleu nuit, barre de navigation translucide, aucun emoji, aucun dégradé. Uniquement les 8 couleurs de la charte.
- **3D** : le symbole « K » en relief, en arrière-plan semi-transparent de l'en-tête de l'accueil ; il devient pleinement visible quand le texte s'efface au défilement. Il s'assemble d'abord en SVG (animation CSS), puis la version 3D (three.js, ~140 Ko compressés) ne se charge qu'au premier geste du visiteur et seulement si l'appareil a une carte graphique. Elle est désactivée en mode économie de données et pour les visiteurs qui ont demandé moins d'animations. Ajouter `?3d=1` à l'adresse force la 3D pour les tests.
- **Animations** : bandeau défilant des expertises, mur d'affiches des réalisations qui défile en continu, titres qui apparaissent mot à mot, chiffres qui défilent, cartes qui suivent le curseur, chevrons en parallaxe, barre de progression de lecture, section « Comment on travaille » qui suit le défilement. Toutes s'arrêtent si le visiteur a demandé à réduire les animations.
- **Accessibilité** : le bleu Kaenys (#2C7FA8) a un contraste de 4,46:1 sur blanc, juste sous le seuil de 4,5:1 de la charte. Il n'est donc utilisé que pour les textes grands et gras (19 px gras minimum) et les éléments graphiques. Les liens dans le texte sont en bleu nuit, soulignés en bleu Kaenys.
- **Formulaire** : erreurs et succès dans les bleus de la charte, avec icône et texte, jamais par la couleur seule.

## Résultats Lighthouse (mobile, en local)

Accueil, page service, réalisations, contact : Performance 100, Accessibilité 100, Bonnes pratiques 100, SEO 100. Environ 50 Ko transférés à l'ouverture de l'accueil (objectif du cahier : moins de 2 Mo).
