---
sidebar_position: 2
---

# URL et layout imbriqués

Dans nos applications, nous avons généralement des composants imbriqués à de multiples niveaux de profondeur. Et il est commun d'avoir des segments d'URL qui correspondant à une certaine structure de composants imbriqués.

Ici, nous voulons créer une URL à plusieurs segments et faire en sorte que toutes ces URL partage le même composant de layout.

:::info Exercice
1- Modifier l'URL de notre première page afin qu'elle devienne `/playlists/ma-premiere-playlist`  
2- Utiliser le layout de notre application pour notre page.
:::

## Guide

💿 **Modification de l'URL**

Pour générer des URLs avec plusieurs segments, Remix aura pour convention de remplacer les `.` dans les noms de fichiers par des `/`.

:::tip En savoir plus
Voir la section [dot delimiters](https://remix.run/docs/en/1.14.1/file-conventions/route-files-v2#md-dot-delimiters) dans la doc.
:::

Ainsi en renommant notre module route en `playlists.ma-premiere-playlist.tsx`, notre page sera associée à la route `/playlists/ma-premiere-playlist`

:::note
Si l'on accède à l'URL [http://localhost:3000/playlists/ma-premiere-playlist](http://localhost:3000/playlists/ma-premiere-playlist), on retrouve notre page.
:::

💿 **Utilisation du layout**

L'application existante possède un `layout` définie dans `app/routes/_layout/route.tsx`.

:::note
Remix se base sur les noms des fichiers et dossiers au premier niveau dans le dossier `app/routes` pour définir les URLs.

Ainsi, ici seulement le nom du dossier `_layout` est pris en compte pour la définition de l'URL. Le `_` au début du fichier permet de ne pas créer de segment dans l'URL. Le module sera donc associé au segment `/` de l'URL.

Enfin, un dossier correspondant à une route ne peut contenir qu'un seul fichier module route. Pour l'identifier, nous devons le nommer `route.tsx`.

Pour info, `app/routes/_layout/route.tsx` serait équivalent à avoir un fichier `app/routes/_layout.tsx`, mais l'utilisation d'un dossier permettrait de colocaliser dans des fichiers séparés les composants pour les `header` et `footer` par exemple.
:::

Pour inclure notre page dans ce layout, notre page doit être enfant de ce layout.

Nous allons donc renommer le fichier de la manière suivante : `_layout.playlists.ma-premiere-playlist.tsx`.

:::tip En savoir plus
Voir la section [Nested layouts without nested URLs](https://remix.run/docs/en/1.14.1/file-conventions/route-files-v2#md-nested-layouts-without-nested-URLs) dans la doc.
:::

:::info 👏 Vous avez maintenant une page qui bénéficie du layout de notre application

Voyons comment rendre un segment de l'URL dynamique.
:::
