---
sidebar_position: 2
---

# Traitement des requêtes de mutations

Lorsqu'une requête de mutation est effectué (méthodes `POST`, `PATCH`, `PUT` ou `DELETE`) sur notre route, la fonction `action` est appelé. Cette fonction est exécutée côté serveur uniquement.

Nous allons maintenant permettre la modification des playlists en traitant ces requêtes de mutation.

:::info Exercice

Créer une fonction `action` qui, lorsqu'elle est exécutée, ajoute la track identifiée par son `track_id` à la playlist.
:::

## Guide

💿 **Définir une fonction `action`**

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export const action = () => {};
```

</details>

💿 **Récupérer des données soumises**

On va pouvoir récupérer l'id de la playlist dans les paramètres de l'URL et l'id de la track à ajouter dans le form data de la requête.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
// highlight-start
export const action = async ({ request, params: { id = "" } }: ActionArgs) => {
  // highlight-next-line
  const rawFormData = await request.formData();
  // highlight-end
};
```

</details>

💿 **Valider les données soumises**

Pour s'assurer que les données soumises sont valides nous allons utiliser la librairie `zod`. Cette librairie nous permet de définir la structure d'une objet et de valider au runtime cette structure.

Cela nous permet en plus de la validation d'avoir par la suite des données correctement typées.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
// highlight-start
const FormDataRequestSchema = z.object({
  track_id: z.string(),
});

export const action = async ({ request, params: { id = "" } }: ActionArgs) => {
  // highlight-next-line
  const rawFormData = await request.formData();
  const formData = FormDataRequestSchema.parse(rawFormData);

  // highlight-end
  return null;
};
```

</details>

💿 **Changer l'état du serveur**

`action` étant une fonction exécuté côté serveur uniquement, nous allons pouvoir ici appeler directement notre repository.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export const action = async ({ request, params: { id = "" } }: ActionArgs) => {
  const rawFormData = await request.formData();
  const formData = FormDataRequestSchema.parse(rawFormData);
  // highlight-next-line
  await playlists.addTrack(id, formData.track_id);
  // highlight-end
  return null;
};
```

</details>

:::info 👏 Nous pouvons maintenant modifier nos playlist en y ajoutant des tracks.

Ajoutons maintenant la possibilité de retirer des tracks de la playlist.
:::
