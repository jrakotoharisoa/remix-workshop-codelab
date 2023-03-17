---
sidebar_position: 2
---

# Lecture des données dans le composant

Tandis que la fonction `loader` nous permet de definir le model de donnée pour notre vue, la récuperation de la donnée ce fait grace au hook `useLoaderData()`

## Guide

💿 ** Recuperer les données du loader **

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
