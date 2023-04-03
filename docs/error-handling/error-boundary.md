---
sidebar_position: 1
---

# Error boundary

L'`ErrorBoundary` est un composant React qui sera rendu lorsqu'une erreur sera levée sur notre route. L'erreur peut être levée par le code back-end (`loader` ou `action` par exemple), ou par le code front-end `Composant`.

Remix utilisera ce composant pour rendre la page à la place du composant exporté par défaut.

:::info Exercice  
1- Attraper toutes les erreurs dans notre layout racine  
2- Attraper des erreurs dans des routes imbriquées  
3- Gérer les codes HTTP  
4- Récupérer le code HTTP dans l'erreur  
5- Déléguer certaines erreurs
:::

## Guide

💿 **Attraper toutes les erreurs**

Dans notre layout racine, il suffit d'exporter une fonction `ErrorBoundary`

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.tsx"
export const ErrorBoundary = () => {
  const error = useRouteError();

  return <>{error instanceof Error ? error.message : "An unexpected error occured"}</>;
};
```

</details>

💿 **Lever une erreur**

Nous allons ajouter une erreur lorsqu'un mauvais id de playlist est passé dans l'URL.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export const loader = async ({ request, params: { id = "" } }: LoaderArgs) => {
  const playlist = await playlists.find(id);
  // highlight-start
  if (!playlist) {
    throw new Error("Playlist not found");
  }
  // highlight-end

  // ...
};
```

</details>

Nous pouvons visualiser l'erreur [http://localhost:3000/playlists/cet-id-n-existe-pas](http://localhost:3000/playlists/cet-id-n-existe-pas)

💿 ** Attraper des erreurs dans des routes imbriquées **

Afin de conserver une partie de notre interface, nous pouvons attraper les erreurs au plus proche de l'endroit où elles sont générées.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export const ErrorBoundary = () => {
  const error = useRouteError();

  return <>{error instanceof Error ? error.message : "An unexpected error occured"}</>;
};
```

</details>

Nous pouvons visualiser l'erreur http://localhost:3000/playlists/cet-id-n-existe-pas et voir qu'une partie de layout est toujours visible

💿 ** Gérer les codes HTTP **

Nous venons de lancer une erreur dans le cas ou l'identifiant de la playlist n'est pas correct et cela pose quelques soucis de sémantique, car le serveur renvoie une réponse HTTP en 500 alors qu'une 404 serait plus correct. Pour faire cela, il suffit de `throw` une `Response` plutôt qu'une `Error`

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export const loader = async ({ request, params: { id = "" } }: LoaderArgs) => {
  const playlist = await playlists.find(id);
  // highlight-start
  if (!playlist) {
    throw new Response("Playlist not found", {
      status: 404,
      statusText: "Not found",
    });
  }
  // highlight-end

  // ...
};
```

</details>

Nous pouvons voir qu'il n'y a pas de changement dans le rendu de l'erreur [http://localhost:3000/playlists/cet-id-n-existe-pas](http://localhost:3000/playlists/cet-id-n-existe-pas). En regardant les appels réseau, on a maintenant notre application qui renvoie le bon code HTTP.

💿 ** Récupérer le code HTTP dans l'erreur **

Dans notre composant `ErrorBoundary`, il est possible d'utiliser la fonction `isRouteErrorResponse`. En lui passant l'erreur, cette méthode nous renvoie un booléen si l'erreur était une `Response`.

Dans le cas d'un identifiant de playlist inconnu, nous allons afficher le status HTTP ainsi que le message associé.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export const ErrorBoundary = () => {
  const error = useRouteError();

  // highlight-start
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <p>HTTP status: {error.status}</p>
        <p>{error.data}</p>
      </>
    );
  }
  // highlight-end

  return <>{error instanceof Error ? error.message : "An unexpected error occured"}</>;
};
```

</details>

💿 ** Déléguer certaines erreurs **

Dans notre composant `ErrorBoundary` d'une route imbriquée, il peut arriver que nous ne voulions pas gérer un certain type d'erreur à ce niveau. Il est alors possible de relancer l'erreur pour qu'elle soit attrapée par un parent

Dans le cas d'un identifiant de playlist inconnu, nous affichons le status et le message. Modifier le code pour déléguer les erreurs imprévues au composant `ErrorBoundary` racine

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export const ErrorBoundary = () => {
  const error = useRouteError();

  // highlight-start
  if (!isRouteErrorResponse(error)) {
    throw error;
  }

  return (
    <>
      <p>HTTP status: {error.status}</p>
      <p>{error.data}</p>
    </>
  );
  // highlight-end
};
```

</details>

:::tip
En règle générale, on préfère `throw` des `Response` pour tous les cas d'erreurs anticipées, qui sorte du chemin principal, de notre application. Ce qui laisse les `Error` uniquement pour de l'imprévu.
:::

:::info 👏 Nous pouvons maintenant facilement gérer un rendu pour les erreurs qui sortent du chemin principal de notre application.

Nous allons maintenant gérer des erreurs liées au rendu de notre composant par défaut tel que des erreurs de champs de formulaire.
:::
