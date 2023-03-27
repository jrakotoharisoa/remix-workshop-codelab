---
sidebar_position: 1
---

# Error boundary

L'`ErrorBoundary` est un composant React qui sera rendu en cas d'erreur sur notre route. Remix affichera ce composant aussi bien pour les erreurs front que back donc toutes nos erreurs liées a une route serons gerées à un seul endroit.

:::info Exercice  
1- Attraper toutes les erreurs dans notre layout racine
2- Attraper des erreurs dans des routes imbriquées
:::

## Guide

💿 ** Attraper toutes les erreurs **

Dans notre layout racine, il suffit d'exporter une fonction `ErrorBoundary`

```tsx title="app/routes/_layout.tsx"
import { ErrorBoundaryComponent } from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
  // ...
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return <>{error.message}</>;
};

export default function Layout() {
  // ...
}
```

💿 ** Generer une erreur **

Nous allons ajouter une erreur lorsqu'un mauvais id de playlist est passé dans l'url

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
import { ErrorBoundaryComponent } from "@remix-run/node";

export const loader = async ({ request, params: { id = "" } }: LoaderArgs) => {
  const playlist = await playlists.find(id);
  if (!playlist) {
    throw new Error("PLaylist not found");
  }

  // ...
};
```

Nous pouvons visualiser l'erreur http://localhost:3000/playlists/cet-id-n-existe-pas

💿 ** Attraper des erreurs dans des routes imbriquées **

Afin de conserver une partie de notre interface nous pouvons attraper les erreurs aux plus proche de l'endroit ou elles sont generées.

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
import { ErrorBoundaryComponent } from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
  // ...
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return <>{error.message}</>;
};

export default function Playlist() {
  // ...
}
```

Nous pouvons visualiser l'erreur http://localhost:3000/playlists/cet-id-n-existe-pas et voir qu'une partie de layout est toujours visible

:::info 👏 Nous aurons maintenant un message d'erreur plutot qu'un crash de l'appli.

Voyons comment gerer des cas d'erreurs prévues.
:::
