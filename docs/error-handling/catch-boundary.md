---
sidebar_position: 2
---

# Catch boundary

Contrairement à l'`ErrorBoundary` qui est un filet de sécurité pour les erreurs imprevues, Le `CatchBoundary` est un composant React qui sera rendu en cas d'erreur gérée dans nos fonctions `loader` ou `action`.

:::info Exercice  
1- Attraper les erreurs anticipés
:::

## Guide

💿 ** Attraper les erreurs anticipés **

Nous venons de lancer une erreur dans le cas ou l'identifiant de la playlist n'est pas correct et cela pose quelques soucis de semantique car le serveur renvoie une reponse HTTP en 500. Nous allons donc fixer ce probleme et utiliser un `CatchBoundary`

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
import { CatchBoundaryComponent } from "@remix-run/node";

export const loader = async ({ request, params: { id = "" } }: LoaderArgs) => {
  const playlist = await playlists.find(id);
  if (!playlist) {
    throw new Response("PLaylist not found", {
      status: 404,
      statusText: "Not found",
    });
  }
  // ...
};

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caught = useCatch();
  return (
    <>
      <p>HTTP status: {caught.status}</p>
      <p>{caught.data}</p>
    </>
  );
};

export default function Playlist() {
  // ...
}
```

Nous pouvons visualiser l'erreur http://localhost:3000/playlists/cet-id-n-existe-pas et avoir un code HTTP correct

:::info 👏 Nous pouvons maintenant facilement gerer un rendu pour les erreurs qui sortent du chemin principal de notre application.

Nous allons maintenant gerer des erreurs liées au rendu de notre composant par default tel que des erreurs de champs de formulaire.
:::
