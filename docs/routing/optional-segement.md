---
sidebar_position: 4
---

# Segment d'URL optionnel

Nous allons maintenant réutiliser notre page de détails afin de pouvoir la faire passer dans un mode `edition` lorsque l'url se termine par `/edit`.

Pour cela nous allons utiliser les segements d'URL optionnel.

:::info Exercice
1- Modifier le nom du fichier, pour que l'URL du fichier puisse matcher les routes `/playlists/{id}` et `/playlists/{id}/edit`.

2- Ajouter un boutton sur la page `/playlists/{id}` permettant de passer en mode `edition` en naviguant vers `/playlists/{id}/edit`.

3- Ajouter un boutton sur la page `/playlists/{id}/edit` permettant de revenir en mode `lecture` en naviguant vers `/playlists/{id}`.

:::

## Guide

💿 **Modifier de l'URL**

Pour créer un segement d'URL optionnel, il suffit de mettre en paranthèse dans le nom du fichier la partie optionnel.

:::tip En savoir plus
Voir la section [Optional segments](https://remix.run/docs/en/1.14.3/file-conventions/route-files-v2#optional-segments) dans la doc.
:::

Ainsi en renommant notre module route en `playlists.$id.(edit).tsx`, notre page sera associée à toutes les urls correspondantes à `/playlists/{id}` et `/playlists/{id}/edit`. Nous verrons par la suite comment récupérer la valeur de `id`.

:::info 👏 Vous avez maintenant une page de détails de playlist permettant d'avoir un mode editiion.

Voyons comment afficher des données spécifiques à une playlist.
:::
