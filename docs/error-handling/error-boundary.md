---
sidebar_position: 1
---

# Error boundary

L'`ErrorBoundary` est un composant React qui sera rendu en lorsqu'une erreur sera levée sur notre route. L'erreur peut être levée par le code back-end (`loader` ou `action` par exemple), ou par le code front-end `Composant`.

Remix utilisera ce composant pour rendre la page à la place du composant exporté par défaut.

:::info Exercice  
1- Attraper toutes les erreurs dans notre layout racine  
2- Attraper des erreurs dans des routes imbriquées
:::

## Guide

💿 **Attraper toutes les erreurs**

Dans notre layout racine, il suffit d'exporter une fonction `ErrorBoundary`

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.tsx"
import { ErrorBoundaryComponent } from "@remix-run/node";

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return <>{error.message}</>;
};
```

</details>

💿 **Lever une erreur**

Nous allons ajouter une erreur lorsqu'un mauvais id de playlist est passé dans l'url.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
import { ErrorBoundaryComponent } from "@remix-run/node";

export const loader = async ({ request, params: { id = "" } }: LoaderArgs) => {
  const playlist = await playlists.find(id);
  // highlight-start
  if (!playlist) {
    throw new Error("PLaylist not found");
  }
  // highlight-end

  // ...
};
```

</details>

Nous pouvons visualiser l'erreur [http://localhost:3000/playlists/cet-id-n-existe-pas](http://localhost:3000/playlists/cet-id-n-existe-pas)

💿 ** Attraper des erreurs dans des routes imbriquées **

Afin de conserver une partie de notre interface nous pouvons attraper les erreurs aux plus proche de l'endroit où elles sont generées.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
import { ErrorBoundaryComponent } from "@remix-run/node";

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return <>{error.message}</>;
};
```

</details>

Nous pouvons visualiser l'erreur http://localhost:3000/playlists/cet-id-n-existe-pas et voir qu'une partie de layout est toujours visible

:::info 👏 Nous aurons maintenant un message d'erreur plutot qu'un crash de l'appli.

Voyons comment gerer des cas d'erreurs prévues.
:::
