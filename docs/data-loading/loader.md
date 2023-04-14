---
sidebar_position: 1
---

# Chargement des données

Pour pouvoir afficher des données dynamiques sur nos pages, nous allons devoir charger ces données. C'est le rôle de la fonction `loader` exportée dans un module route.

À noter que cette fonction n'est utilisée que côté serveur. Elle ne se retrouvera jamais dans un navigateur.

:::info Exercice
Définir un `loader` dans le module route d'une playlist. Afin d'afficher les informations suivantes :

- Nom de la playlist
- Titre et auteur des chansons de la playlist.

:::

## Guide

💿 **Définir une fonction loader**

Exporter une fonction `loader`.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.tsx"
export const loader = () => {
  return null;
};
```

</details>

💿 **Récupérer l'id de la playlist à afficher**

Remix appelle notre fonction `loader` avec différentes données :

- une `request` objet [`Request`](https://developer.mozilla.org/fr/docs/Web/API/Request) de l'`API Fetch`
- les `params` correspondant aux segments dynamiques de l'URL
- un `context` remix

On pourra ainsi récupérer le segment dynamique de l'URL dans `params`.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.tsx"
// highlight-next-line
export const loader = ({ params }: LoaderArgs) => {
  // highlight-next-line
  const id = params.id;

  return null;
};
```

</details>

💿 **Récupérer les données de la playlist**

Maintenant que nous avons l'id, nous allons pouvoir récupérer les données dans notre base de données.

Pour faire simple, nous allons directement appeler notre repository dans le loader. Pas de risque, la fonction n'existe que côté serveur.

:::tip
Vous pouvez utiliser le repository `playlists` pour retrouver les données d'une playlist.
:::

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.tsx"
// highlight-next-line
export const loader = async ({ params }: LoaderArgs) => {
  const id = params.id;
  // highlight-next-line
  const playlist = await playlists.find(id || "");

  return null;
};
```

</details>

💿 **Retourner les données en réponse du loader**

La sortie du `loader` doit correspondre à une réponse de l'`API Fetch`. Pour nous aider, Remix met à disposition un helper `json` qui nous permet de retourner une réponse avec des données au format `json`.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.tsx"
export const loader = async ({ params }: LoaderArgs) => {
  const id = params.id;
  const playlist = await playlists.find(id || "");
  if (!playlist) {
    throw new Error("playlist not found");
  }

  // highlight-next-line
  return json(playlist);
};
```

</details>

:::tip Test
Pour tester votre API, vous pouvez accéder à la route suivante : [http://localhost:3000/playlists/f63a5aee-eff0-46e4-a896-98f9af15ad84?\_data](http://localhost:3000/playlists/f63a5aee-eff0-46e4-a896-98f9af15ad84?_data)

Le query params `_data` permet d'indiquer à Remix que l'on souhaite les données du `loader` et la page associé à la route.
:::

:::info 👏 Nous venons de définir notre première route d'API.

Voyons comment utiliser lire les données du `loader` dans notre composant.
:::
