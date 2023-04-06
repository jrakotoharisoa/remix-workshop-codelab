---
sidebar_position: 2
---

# Pré-chargement nos pages

Pour minimiser les temps de chargements Remix se chargent d'appeler les différents `loader` d'une page en parallèle. Mais pour tenter de supprimer les différents états de chargement, nous avons également la possibilité de précharger nos pages, avant même d'y accéder.

:::info Exercice
Précharger nos pages au survol des liens situés dans la barre de navigation.
:::

## Guide

💿 **Ajouter la propriété `prefetch` au composant `<NavLink />`**

Dans le module `_layout.tsx`, nous allons ajouter la propriété `prefetch` avec la valeur `intent` sur le composant `<Navlink >`. Cela va permettre d'appeler les `loader` associés à la page du lien au survol de celui-ci.

:::tip En savoir plus
Voir la section [Pre-fetch](https://remix.run/docs/en/1.14.3/components/link#prefetch) dans la doc.
:::

<details>
  <summary>Voir une solution</summary>

```tsx title="app/_layout.tsx"
export default function App() {
  return (
    // ...
    <NavLink
      // highlight-next-line
      prefetch="intent"
      to={`/playlists/${playlist.id}`}
      //...
    >
      <PlaylistIcon className="mr-2 h-4 w-4" />
      {playlist.name}
    </NavLink>
    //...
  );
}
```

</details>

💿 **Ajouter des headers de cache**

Maintenant que le `loader` est appelé avant l'affichage de la page, il faut maintenant ajouter des `headers` de cache. Lors de la navigation sur la page, cela va permettre que l'appel du loader se serve de la réponse mise en cache lors de pré-chargement.

Pour cela, nous allons ajouter le header de cache suivant à la réponse du loader:

- `private` pour cacher uniquement dans le navigateur
- `max-age=10` pour une cache valide de 10 secs

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export const loader = async ({ params }: LoaderArgs) => {
  //...
  return json(
    { playlist, availableTracks },
    // highlight-start
    {
      headers: {
        "Cache-Control": "private, max-age=10",
      },
    }
    // highlight-end
  );
};
```

</details>

:::info 👏 Vos pages s'affiche maintenant plus rapidement.

Voyons maintenant comment améliorer temps d'interaction lors de la mutation de vos données avec de l'`optimitic UI`.
:::
