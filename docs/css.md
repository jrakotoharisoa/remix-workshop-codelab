---
sidebar_position: 7
---

# Chargement de style spécifique à une page

Dans nos applications, nous avons parfois du style utilisé spécifiquement sur une page. Dans le but de limité les chargements inutiles, Remix va nous permettre d'exporter depuis un module route une fonction `links`. Cette fonction va nous permettre d'injecter des liens lorsque l'utilisateur va visiter la page associée.

:::info EXERCICE
Changer la couleur de fond de votre application lorsque l'utilisateur visite la page des playlists.
:::

## Guide

💿 **Définir une fonction links dans le module route**

:::tip En savoir plus
Voir la section [links](https://remix.run/docs/en/1.14.3/route/links) dans la doc.
:::

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export const links = () => {
  return [];
};
```

</details>

💿 **Créer un feuille de style dans le dossier `styles` et ajouter votre code CSS**

<details>
  <summary>Voir une solution</summary>

```css title="app/styles/edit-style.css"
body {
  background-color: orange;
}
```

</details>

💿 **Ajouter un html link descriptor permettant d'ajouter une feuille de style**

Cette fonction retourner un tableau de `HTMLlinkDescriptor` ([Voir docs MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)) ou des `PageLinkDescriptor`.

Ici nous allons utiliser un `HTMLLinkDescriptor` pour qu'une base `<link />` soit ajouter dans notre page pour charger notre feuille de style.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
// highlight-next-line
import editStylesheet from "~/styles/edit-style.css";

export const links = () => {
  return [
    // highlight-next-line
    { rel: "stylesheet", href: editStylesheet },
  ];
};
```

</details>

:::info 👏 Nous savons maintenant comment ajouter de style pour une route spécifique.

Ajoutons maintenant la possibilité de retirer des tracks de la playlist.
:::
