---
sidebar_position: 3
---

# Segment d'URL dynamique

Nous allons maintenant réutiliser notre page pour en faire une page de détails d'une playlist. Cette page sera la même pour toutes les playlists.
La playlist à afficher sera identifiée par l'id de la playlist présente dans l'url. pour cela, nous allons voir les segments dynamiques.

:::info Exercice
Modifier le nom du fichier, pour que l'URL de la route corresponde à l'URL d'une playlist, afin que le clic nous amène sur notre page, peu importe la playlist sélectionnée de la barre de gauche.
:::

## Guide

💿 **Modifier l'URL**

Les segments dynamiques nous permettent de faire correspondre des segments de l'URL et d'utiliser cette valeur dans notre code. Pour les créer, il nous faudra préfixer le segment par `$`.

:::tip En savoir plus
Voir la section [Dynamic segments](https://remix.run/docs/en/1.14.1/file-conventions/route-files-v2#md-dynamic-segments) dans la doc.
:::

Ainsi en renommant notre module route en `_layout.playlists.$id.tsx`, notre page sera associée à toutes les urls correspondantes à `/playlists/{id}`. Nous verrons par la suite comment récupérer la valeur de `id`.

:::info 👏 Vous avez maintenant une page permettant d'afficher le détails d'une playlist.

:::
