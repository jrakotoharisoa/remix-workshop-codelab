---
sidebar_position: 2
---

# Affichage des données dans le composant

Tandis que la fonction `loader` nous permet lire les données côté back-end. Le hook `useLoaderData()` nous permet d'accéder aux données dans le composant correspondant à la vue.

L'utilisation du hook va permettre d'avoir accès aux données directement pendant la phase de server side rendering mais également lors de navigation front-end, le composant sera capable d'effectuer des appels fetch vers le serveur pour récupérer les données sans avoir à recharger toute la page.

:::info Exercice  
Afficher sur la page de la playlist les informations suivantes :

- nom de la playlist
- Liste tracks (titre + auteur)

:::

## Guide

💿 **Récupérer les données du loader**

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export default function Playlists() {
  // highlight-next-line
  const playlist = useLoaderData<typeof loader>();
}
```

</details>

:::tip
Comme le code back et front sont colocalisés, vous pouvez typer simplement la donnée dans votre composant avec `typeof loader`.
:::

💿 **Afficher les informations**

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export default function Playlists() {
  const playlist = useLoaderData<typeof loader>();

  return (
    <div className="...">
      <h1>{playlist?.name}</h1>
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

</details>

:::note
Pour une page donnée, il peut arriver que vous ayez plusieurs `loader` qui soient appelées à cause de l'imbrication de vos layouts.

Dans ce cas, Remix va être capable de les appeler en parallèle et éviter les appels en cascade que l'on retrouve parfois dans nos applications front-end. Cela va permettre réduire le temps de chargement de notre page.
:::

:::info 👏 Nous avons maintenant des pages avec des données dynamiques.

Voyons comment mettre à jour ces données.
:::
