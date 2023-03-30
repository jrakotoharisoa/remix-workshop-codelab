---
sidebar_position: 2
---

# Optimistic UI

Lorsque l'on fait des mutations, actuellement l'UI met un peu de temps à se mettre à jour, car la page attend que les données aient été modifiées côté serveur pour rappeler les `loaders` pour se mettre à jour.

Nous allons ici utiliser la technique de l'optimistic UI pour rendre notre interface plus réactive. Cela consiste à simuler l'état optimal suite à une modification. Par exemple, pour l'ajout d'une track, cela consiste à directement faire apparaitre la track dans la playlist et à la retirer de la liste des tracks disponnibles avant même la fin de la mutation côté serveur.

:::info Exercice
Ajouter de l'optimitic UI sur l'ajout et la suppression d'une track.
:::

## Guide

💿 **Récupérer les données en cours de soumission dans le composant**

Remix expose un hook `useNavigation` qui nous retourne un objet `navigation` dans lequel nous allons pouvoir récupérer les données qui sont en cours de soumissions dans la propriétés `formData`.

:::tip En savoir plus
Voir la section [useNavigation](https://remix.run/docs/en/main/hooks/use-navigation) dans la doc.
:::

:::tip
Nous pouvons réutiliser le schema zod `FormDataRequestSchema` pour avoir une donnée bien typé.
:::

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export default function Playlist() {
  //..
  const navigation = useNavigation();
  const formData = navigation.formData
    ? FormDataRequestSchema.parse(Object.fromEntries(navigation.formData))
    : undefined;
  //...
}
```

</details>

💿 **Reconstruire les listes de tracks de la playlist et des tracks disponnibles**

Nous allons maintenant pouvoir reconstruire, en fonction de l'`action` et de la présence ou non de données en cours de soumissions, les 2 listes de tracks.

<details>
    <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export default function Playlist() {
  const { playlist: serverPlaylist, availableTracks: serverAvailableTracks } =
    useLoaderData<typeof loader>();
  //...
  const playlist = formData
    ? formData.action === "add"
      ? {
          ...serverPlaylist,
          tracks: [
            serverAvailableTracks.find(
              (track) => track.id === formData.track_id
            ),
            ...serverPlaylist.tracks,
          ].filter(isNonUndefined),
        }
      : {
          ...serverPlaylist,
          tracks: serverPlaylist.tracks.filter(
            (track) => track.id !== formData.track_id
          ),
        }
    : serverPlaylist;

  const availableTracks = formData
    ? formData.action === "add"
      ? serverAvailableTracks.filter((track) => track.id !== formData.track_id)
      : [
          serverPlaylist.tracks.find((track) => track.id === formData.track_id),
          ...serverAvailableTracks,
        ].filter(isNonUndefined)
    : serverAvailableTracks;

  //...
}
```

</details>

:::info 👏 Votre application est maintenant beaucoup plus réactive !

Voyons maintenant comment ajouter un peu de style spécifique à notre route.
:::
