---
sidebar_position: 9
---

# Resource route

Remix permet de colocaliser le code front et back mais parfois on a besoin de créer un endpoint back uniquement. C'est ce qu'on appelle une resource route et avec tout ce que nous avons deja vu, vous savez deja le faire.

:::info Exercice  
Permettre le téléchargement des données d'une playlist au format JSON.
:::

## Guide

💿 ** Création de le resource route **

Dans le dossier des routes, nous avons juste à créer un module qui exportera un `loader` pour la route `/api/playlists/:id.json` qui retournera un contenue `json`

:::tip
Afin de marquer notre contenu comme telechargeable, il faut ajouter le header `"Content-Disposition": 'attachment; filename="${playlist.name}.json"'`
:::

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/api.playlists.$id[.]json.ts"
import { json, LoaderArgs } from "@remix-run/node";
import { playlists } from "~/repositories/playlist-repository.server";

export const loader = async ({ params: { id = "" } }: LoaderArgs) => {
  const playlist = await playlists.find(id);

  if (!playlist) {
    return json({ error: "playlist not found" }, { status: 404 });
  }

  return json(
    { playlist },
    {
      headers: {
        "Content-Disposition": `attachment; filename="${playlist.name}.json"`,
      },
    }
  );
};
```

</details>

💿 ** Ajout d'un lien dans l'interface **

Dans la page d'affichage d'une playlist, nous allons ajouter un lien pour télécharger les données

:::caution
Il est imperatif d'utiliser `reloadDocument` sur tous les liens pointants vers une resource route !
Sinon Remix traitera le lien comme une UI route et tentera de charger les données avec un `fetch` et de rendre le composant.
:::

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
import { Link } from "@remix-run/react";

export default function Playlist() {
  // ...
  <Link to={`/api/playlists/${playlist.id}.json`} reloadDocument download>
    Download as JSON
  </Link>;
  // ...
}
```

</details>

:::info 👏 Nous savons maintenant comment ajouter des endpoints purement back à notre appli Remix.

Voyons comment gerer l'authentification.
:::
