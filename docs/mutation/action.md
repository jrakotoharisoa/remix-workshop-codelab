---
sidebar_position: 1
---

# Ajout d'une track à la playlist (API)

Nous allons maintenant permettre la suppresion de `track` lorsque nous somme en mode edition.

Pour gérer les mutations de notre état serveur, nous allons pouvoir exporter une fonction `action` dans notre module route.

Cette fonction n'est exécuter que côté serveur. Elle est appelé à chaque apppel avec les méthodes `POST`, `PATCH`, `PUT` ou `DELETE` sur l'url associé à votre module route.

:::info Exercice

Créer une fonction `action`, qui lorsqu'elle est exécutée ajoute la track identifié par son `trackId` à la playlist.
:::

## Guide

TODO
