---
sidebar_position: 3
---

# Segment d'URL dynamique

Nous allons maintenant réutiliser notre page pour en faire une page de détails d'une playlist. Cette page sera la même pour toutes les playlists.
La playlist à afficher sera identifiée par l'id de la playlist présent dans l'url. pour cela nous allons voir les segments dynamiques.

:::info Exercice
Modifier le nom du fichier, pour que l'URL de la route corresponde à l'URL d'une playlist. Afin que le clique, nous amène sur notre page et cela peu importe la playlist sélectionné de la barre de gauche .
:::

## Guide

💿 **Modification de l'URL**

Les segments dynamiques nous permettent de faire correspondre des segments de l'URL et d'utiliser cette valeur dans notre code. Pour les créer, il nous faudra préfixer le segment par `$`.

:::tip En savoir plus
Voir la section [Dynamic segments](https://remix.run/docs/en/1.14.1/file-conventions/route-files-v2#md-dynamic-segments) dans la doc.
:::

Ainsi en renommant le notre module route en `playlists.$id.tsx`, notre page sera associée à toutes les urls correpondants à `/playlists/{id}`. Nous verrons par la suite comment récupérer la valeur de `id`.

:::info 👏 Vous avez maintement une page de détails de playlist.

Voyons comment afficher des données spécifique à une playlist.
:::
