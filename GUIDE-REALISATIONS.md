# Ajouter une réalisation au site

Ce guide explique comment ajouter un projet ou un logo dans la page « Réalisations », sans aide.
Comptez 15 minutes par projet.

> Rappel du pacte (Art. 11 et 13) : aucun client n'est montré sans son **accord écrit**.
> Sur le site en ligne, un projet n'apparaît que si son champ `authorized` vaut `true`.

---

## Étape 1 : préparer les images

Les images vont dans `src/assets/realisations/<nom-du-projet>/`, au format WebP, à 1600 px de large au maximum.
Le site fabrique ensuite tout seul des versions plus petites pour les téléphones.

### Méthode A : avec l'outil du projet (recommandé)

1. Déposez les images originales dans `images-a-optimiser/<nom-du-projet>/`, quelle que soit leur taille.
2. À la racine du projet, lancez :
   ```bash
   npm run images
   ```
3. Les versions légères apparaissent dans `src/assets/realisations/<nom-du-projet>/`. Le terminal affiche le chemin de chaque image (par exemple `12-le-baobab/affiche-1.webp`) : notez-les pour l'étape 2.

Les originaux restent sur votre ordinateur et ne sont jamais envoyés sur GitHub.

### Méthode B : sans rien installer

1. Ouvrez https://squoosh.app et glissez l'image.
2. Choisissez le format **WebP**, qualité **75 à 80**, et une largeur de **1600** dans « Resize ».
3. Renommez le fichier en minuscules, sans espaces ni accents (ex. `affiche-1.webp`).
4. Sur GitHub, ouvrez `src/assets/realisations/`, cliquez sur **Add file**, puis **Upload files**, et envoyez les images dans un dossier au nom du projet. Pour créer le dossier, tapez `12-le-baobab/` devant le nom du fichier.

### Les vidéos

Ne mettez **jamais** une vidéo directement dans le site. Publiez-la sur YouTube (en « Non répertoriée » si besoin) et notez son identifiant, c'est-à-dire la fin de l'adresse.
Pour `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, l'identifiant est `dQw4w9WgXcQ`. La vidéo ne se charge qu'au clic du visiteur.

---

## Étape 2 : décrire le projet

Ouvrez `src/data/projects.ts` (sur GitHub : cliquez sur le fichier, puis sur l'icône crayon).
Copiez le modèle ci-dessous et collez-le **juste après la ligne `const allProjects: Project[] = [`**.

```ts
  {
    slug: "le-baobab",
    client: "Restaurant Le Baobab",
    authorized: true,
    categories: ["social", "identity"],
    sector: { fr: "Restauration", en: "Restaurant" },
    place: { fr: "Douala", en: "Douala" },
    description: {
      fr: "Ce que nous avons réalisé, en une phrase.",
      en: "What we delivered, in one sentence.",
    },
    cover: "12-le-baobab/affiche-1.webp",
    images: [
      { file: "12-le-baobab/affiche-1.webp", alt: { fr: "Le Baobab — affiche du menu", en: "Le Baobab — menu poster" } },
      { file: "12-le-baobab/affiche-2.webp", alt: { fr: "Le Baobab — visuel 2", en: "Le Baobab — visual 2" } },
    ],
  },
```

### Ce que chaque champ veut dire

| Champ | À remplir |
| --- | --- |
| `slug` | La fin de l'adresse de la page, en minuscules, avec des tirets, sans accents. |
| `client` | Le nom du client, tel qu'il s'écrit. |
| `authorized` | `true` une fois l'accord écrit du client obtenu. Avec `false`, le projet est caché en ligne. |
| `featured` | Facultatif. Ajoutez `featured: 1,` (ou 2, 3…) pour placer le projet en tête du mur d'affiches de l'accueil. |
| `categories` | Une ou plusieurs parmi : `social` (Affiches & réseaux sociaux), `events` (Événementiel), `community` (Community management), `identity` (Identité visuelle), `video` (Vidéo). Elles servent aux filtres. |
| `sector`, `place` | Le secteur et le lieu, en français et en anglais. |
| `description` | Ce que vous avez réalisé. **Pas de résultat chiffré** (« +200 % d'abonnés ») : on décrit le travail. |
| `cover` | L'image affichée dans la grille (recadrée en format vertical 4:5, en partant du haut). |
| `images` | Toutes les images de la page du projet, avec un texte alternatif FR et EN (obligatoire, pour l'accessibilité et Google). |
| `youtube` | Facultatif : `youtube: "dQw4w9WgXcQ",` pour afficher une vidéo en tête de la galerie. |

### Ajouter un logo

Mettez le fichier dans `src/assets/realisations/identites-visuelles/`, puis ajoutez une ligne dans la liste `allLogos` :

```ts
  { client: "Le Baobab", file: "identites-visuelles/logo-le-baobab.webp", authorized: true },
```

### Pièges à éviter

- Gardez **chaque virgule, guillemet et accolade** du modèle. Un oubli empêche le site de se construire.
- Écrivez les textes entre guillemets doubles `"…"`. Les apostrophes à l'intérieur (`l'événement`) ne posent alors aucun problème.
- Le chemin des images ne commence **pas** par `/` ni par `src/` : il part du dossier `src/assets/realisations/`.

---

## Étape 3 : vérifier puis publier

- **Sur l'ordinateur** : `npm run dev`, puis ouvrez http://localhost:4321/fr/realisations/. En local, même les projets marqués `authorized: false` s'affichent, avec la mention « En attente d'accord ».
- **Publier** : sur GitHub, cliquez sur **Commit changes**. Depuis l'ordinateur : `git add -A`, puis `git commit -m "Ajout réalisation Le Baobab"`, puis `git push`.

Cloudflare reconstruit le site en 2 à 3 minutes. En cas d'erreur, ouvrez Cloudflare > Workers & Pages > kaenys > Déploiements : le message indique le fichier et la ligne en cause (souvent une virgule ou un guillemet manquant).

Pour faire relire en ligne des projets pas encore autorisés sans les publier, ajoutez dans Cloudflare la variable `KAENYS_APERCU` = `1` **uniquement pour l'environnement « Preview »**, puis envoyez les changements sur une autre branche que `main`.
