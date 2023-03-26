---
sidebar_position: 2
---

# Lecture des données dans le composant

Tandis que la fonction `loader` nous permet lire les données côté back-end. Le hook `useLoaderData()` nous permet d'accéder aux données dans le composant correspondant à la vue.

L'utilisation du hook va permettre d'avoir accès aux données directement pendant la phase de server side rendering mais également lors de navigation front-end, le composant sera capable d'effectuer des appels fetch vers le serveur pour récupérer les données sans avoir à recharger toute la page.

:::info Exercice  
Afficher sur la page de la playlist les informations suivantes:

- nom de la playlist
- Liste tracks (titre + auteur)

:::

## Guide

💿 ** Récuperer les données du loader **

Ajouter le code suivant dans votre composant

```tsx title="app/routes/_layout.playlists.$id.tsx"
export default function Playlist() {
  // highlight-next-line
  const playlist = useLoaderData<typeof loader>();
}
```

:::tip
Comme le code est colocalisé, vous pouvez typer simplement la donnée dans votre composant avec `typeof loader`.
:::

💿 ** Afficher les informations **

Ajouter le code suivant dans votre composant

```tsx title="app/routes/_layout.playlists.$id.tsx"
export default function Playlist() {
  const playlist = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col space-y-2 p-6">
      <h1 className="title-1">{playlist?.name}</h1>
      <ul>
        {playlist?.tracks.map((track) => (
          <li key={track.id}>
            <span>
              {track.name} · {track.artist}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

:::info 👏 Nous avons maintenant des pages avec des données dynamiques.

Voyons comment mettre à jours ces données.
:::
