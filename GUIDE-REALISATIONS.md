# Ajouter une réalisation au site

Ce guide explique comment ajouter un projet dans la page « Réalisations », sans aide.
Comptez 15 minutes par projet.

> Rappel du pacte (Art. 11 et 13) : aucun client n'est montré sans son **accord écrit**.

---

## Étape 1 : alléger les images

Une photo de téléphone pèse souvent 3 à 8 Mo. Sur le site, une image doit peser **moins de 300 Ko**, sinon les pages deviennent lentes sur mobile.

### Méthode A : avec l'outil du projet (recommandé, plusieurs images d'un coup)

Il faut Node.js installé sur l'ordinateur et le projet téléchargé (voir le README).

1. Créez un dossier au nom du projet dans `images-a-optimiser/`, par exemple `images-a-optimiser/restaurant-le-baobab/`.
2. Copiez-y toutes les images originales du projet, quelle que soit leur taille.
3. Dans un terminal, à la racine du projet, lancez :
   ```bash
   npm run images
   ```
4. Les versions légères apparaissent dans `public/work/restaurant-le-baobab/`, au format WebP et à 1600 px de large maximum. Le terminal affiche le chemin de chaque image : notez-les pour l'étape 3.

Les originaux restent dans `images-a-optimiser/` et ne sont jamais envoyés sur GitHub.

### Méthode B : sans rien installer (une image à la fois)

1. Ouvrez https://squoosh.app et glissez votre image.
2. À droite, choisissez le format **WebP**, qualité **75 à 80**.
3. Dans « Resize », mettez une largeur de **1600**.
4. Téléchargez le fichier et renommez-le en minuscules, sans espaces ni accents (ex. `menu-carte.webp`).
5. Sur GitHub, ouvrez le dossier `public/work/`, cliquez sur **Add file**, puis **Upload files**, et envoyez vos images dans un dossier au nom du projet.

### Les vidéos

Ne mettez **jamais** une vidéo directement dans le site. Publiez-la sur YouTube (en « Non répertoriée » si vous ne voulez pas qu'elle apparaisse sur la chaîne), puis notez son identifiant : c'est la fin de l'adresse.
Exemple : pour `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, l'identifiant est `dQw4w9WgXcQ`.

---

## Étape 2 : choisir la couverture

La couverture est l'image affichée dans la grille des réalisations. Elle est recadrée au format **4:3**, donc choisissez une image dont le sujet est bien centré.

---

## Étape 3 : décrire le projet

Ouvrez `src/data/projects.ts` (sur GitHub : cliquez sur le fichier, puis sur l'icône crayon pour le modifier).

Copiez le modèle ci-dessous et collez-le **juste après la ligne `export const projects: Project[] = [`**, pour que le projet apparaisse en premier.

```ts
  {
    slug: { fr: 'identite-restaurant-le-baobab', en: 'le-baobab-restaurant-identity' },
    service: 'design',
    motif: 0,
    cover: '/work/restaurant-le-baobab/couverture.webp',
    gallery: [
      '/work/restaurant-le-baobab/menu.webp',
      '/work/restaurant-le-baobab/enseigne.webp',
    ],
    youtube: '',
    title: { fr: 'Identité visuelle du restaurant Le Baobab', en: 'Brand identity for Le Baobab restaurant' },
    client: { fr: 'Restaurant Le Baobab, Douala', en: 'Le Baobab restaurant, Douala' },
    result: { fr: 'Une image unifiée, du menu à l’enseigne', en: 'One unified image, from menu to signage' },
    context: {
      fr: 'Pourquoi le client est venu nous voir, en 1 ou 2 phrases.',
      en: 'Why the client came to us, in 1 or 2 sentences.',
    },
    done: {
      fr: ['Première étape réalisée', 'Deuxième étape', 'Troisième étape'],
      en: ['First thing we did', 'Second thing', 'Third thing'],
    },
    outcome: {
      fr: 'Le résultat concret, en une phrase.',
      en: 'The concrete result, in one sentence.',
    },
  },
```

### Ce que chaque ligne veut dire

| Champ | À remplir |
| --- | --- |
| `slug` | La fin de l'adresse de la page, en minuscules, avec des tirets, sans accents. Une version FR et une EN. |
| `service` | Un seul choix parmi : `design`, `community`, `video`, `web`, `ai`, `training`. Il sert au filtre. |
| `motif` | Laissez `0`. Il ne sert que si vous n'avez pas encore de couverture. |
| `cover` | Le chemin de l'image de couverture, tel qu'affiché par `npm run images` (il commence par `/work/`). |
| `gallery` | Les autres images à montrer sur la page du projet. Supprimez ce bloc s'il n'y en a pas. |
| `youtube` | L'identifiant de la vidéo YouTube, ou laissez `''`. |
| `title`, `client`, `result` | Visibles dans la grille. `result` : une phrase courte et concrète. |
| `context`, `done`, `outcome` | Le texte de la page du projet : le contexte, ce que vous avez fait (liste), le résultat. |

### Pièges à éviter

- Gardez **chaque virgule et chaque accolade** du modèle. Un oubli empêche le site de se construire.
- Une apostrophe dans un texte doit être une apostrophe typographique `’` (et non `'`), comme dans le modèle. Sinon, le texte se coupe.

---

## Étape 4 : retirer les exemples

Quand vous avez au moins 3 vrais projets, supprimez les projets qui contiennent `example: true` dans `src/data/projects.ts` (du `{` jusqu'au `},` correspondant).

---

## Étape 5 : publier

- **Sur GitHub (site web)** : en bas de la page de modification, cliquez sur **Commit changes**.
- **Sur l'ordinateur** : `git add -A`, puis `git commit -m "Ajout réalisation Le Baobab"`, puis `git push`.

Cloudflare reconstruit le site en 1 à 2 minutes. Si la mise à jour n'apparaît pas, ouvrez Cloudflare > Workers & Pages > kaenys > Déploiements : en cas d'erreur, le message indique le fichier et la ligne en cause (souvent une virgule manquante).
