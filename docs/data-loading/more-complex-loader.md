---
sidebar_position: 3
---

# Affichage des tracks disponibles

Nous allons maintenant préparer notre page d'édition, en affichant la liste des tracks non présente dans la playlist.

:::info Exercice  
En mode `edition`, afficher sur la page de la playlist les tracks non présentes dans la playlist.

Pour cela vous pouvez vous aider de la méthode `findAvailableTracksNotIn` dans le repository `tracks`.
:::

## Guide

💿 **Identifier le mode `edition`**

Pour pouvoir récuperer le `pathname` nous allons créer une `URL` à partir de la propriété `url` de la `request` que l'on récupére dans les paramètres de la fonction `loader` :

```tsx
const url = new URL(request.url);
```

Nous allons ensuite pouvoir réutiliser notre fonction `isEditionUrl`.

💿 **Ajouter les tracks disponibles dans la réponse du `loader`**

Avec cela, nous allons pouvoir récupérer les tracks disponibles avec la méthode `findAvailableTracksNotIn` du repository `tracks` lorsque nous sommes en mode `edition` pour le retourner dans la réponse.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
// highlight-next-line
const isEditionUrl = (pathname: string) => pathname.endsWith("/edit");

export const loader = async ({ params }: LoaderArgs) => {
  const id = params.id;
  const playlist = await playlists.find(id || "");
  if (!playlist) {
    throw new Error("playlist not found");
  }

  // highlight-start
  let availableTracks: Track[] = [];
  const url = new URL(request.url);

  if (isEditionUrl(url.pathname)) {
    availableTracks = await tracks.findAvailableTracksNotIn(playlist.tracks);
  }

  return json({ playlist, availableTracks });
  // highlight-end
};
```

</details>

💿 **Adapter le composant à la nouvelle réponse du `loader`**

Vous avez maintenant une erreur dans votre composant car vous avez changé le type de réponse du `loader`.

Nous allons donc modifier le code permettant de récupérer les données avec le hook `useLoaderData`

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
// ...
export default function Playlists() {
  // highlight-next-line
  const { playlist } = useLoaderData<typeof loader>();
  //...
}
```

</details>

💿 **Afficher les tracks disponibles**

Nous allons maintenant pouvoir afficher les tracks disponibles en récupérant les données en sortie du `useLoaderData`

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
// ...
export default function Playlists() {
  // highlight-next-line
  const { playlist, availableTracks } = useLoaderData<typeof loader>();
  //...
}
```

</details>

Nous pouvons maintenant les afficher.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export default function Playlists() {
  // highlight-next-line
  const { playlist, availableTracks } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen flex-col px-6 py-3">
      <h1 className="title-1">{/* Nom de la playlist */}</h1>
      <div>
        <ul>{/* Liste des track de la playlist */}</ul>
        // highlight-start
        <ul className="flex-1 overflow-auto">
          {availableTracks.map((track) => (
            <li key={track.id} className="flex justify-between space-x-4">
              <span>
                {track.name} · {track.artist}
              </span>
            </li>
          ))}
        </ul>
        // highlight-end
      </div>
    </div>
  );
}
```

</details>

:::info 👏 Nous avons une page d'édition prête à effectuer des modifications.

Voyons comment éditer notre playlist.
:::
