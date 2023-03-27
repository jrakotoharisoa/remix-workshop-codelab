---
sidebar_position: 3
---

# Affichage des tracks disponibles

Nous allons maintenant préparer notre page d'édition, en affichant la liste des tracks non présentes dans la playlist.

:::info Exercice  
En mode `edition`, afficher sur la page de la playlist les tracks non présentes dans la playlist.

Pour cela vous pouvez vous aider de la méthode `findAvailableTracksNotIn` dans le repository `tracks`.
:::

## Guide

💿 **Identification du mode `edition`**

Pour savoir si nous sommes en mode `edition`, nous allons regarder sur le `pathname` de l'URL se termine par `/edit`.

Pour pouvoir manipuler l'URL nous allons créer une `URL` à partir de la propriétés `url` de la request:

```tsx
const url = new URL(request.url);
```

Nous allons ensuite créer un petite fonction nous permettant de savoir si nous sommes en mode `edition`:

```tsx
const isEditionUrl = (pathname: string) => pathname.endsWith("/edit");
```

💿 **Ajouter les tracks disponibles dans la réponse du `loader`**

Avec cela nous allons pouvoir récupérer les tracks disponibles avec la méthode `findAvailableTracksNotIn` lorsque nous sommes en mode `edition` pour le rétourner dans la réponse.

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

💿 **Adaption du composant à la nouvelle réponse du `loader`**

Vous avez maintenant une erreur dans votre composant car vous avez changer le type de réponse du `loader`.

Nous allons donc modifier le code permettant de récuperer les données avec le hook `useLoaderData`:

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
// ...
export default function Playlist() {
  // highlight-next-line
  const { playlist } = useLoaderData<typeof loader>();
  //...
}
```

💿 **Affichage des tracks disponibles**

Nous allons maintenant pouvoir afficher les tracks disponnibles en récupérants les données en sortie du `useLoaderData`

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
// ...
export default function Playlist() {
  // highlight-next-line
  const { playlist, availableTracks } = useLoaderData<typeof loader>();
  //...
}
```

Nous pouvons maintenant les afficher avec le code suivant:

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export default function Playlist() {
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

:::info 👏 Nous avons une page d'édition prête à effectuer des modifications.

Voyons comment éditer notre playlist.
:::