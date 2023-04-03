---
sidebar_position: 3
---

# Formulaire multiple

Nous allons maintenant permettre à notre route de gérer plusieurs actions : `ajout` et `suppression`.

:::info Exercice
Modifier le module route pour permettre de retirer une track d'une playlist.
:::

## Guide

💿 **Ajouter un formulaire**

Nous allons donc ajouter un formulaire avec une méthode `post` sur chaque ligne correspond à la track d'une playlist.

Le formulaire aura :

- Un `input` de type `hidden` permettant d'envoyer l'information `track_id` correspondant à l'id de la track à ajouter.
- Un bouton `submit` avec le name `action` et la valeur `delete`

:::tip
L'ajout d'un nom et d'une valeur au bouton submit va nous permettre d'identifier dans l'action quel bouton submit a été cliqué pour savoir quelle modification effectuer.

:::

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export default function Playlist() {
  //...
  return (
    //...
    <li>
      {/*...*/}

      {isEditionMode && (
        <Form method="post" className="inline">
          <input name="track_id" type="hidden" value={track.id} />
          <button type="submit" name="action" value="delete">
            Remove
          </button>
        </Form>
      )}
    </li>
    //...
  );
}
```

</details>

💿 **Mettre à jour le schéma `Zod`**

Nous allons mettons mettre à jour notre schéma Zod pour s'assurer de la validité de notre requête.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
const FormDataRequestSchema = z.object({
  track_id: z.string(),
  // highlight-next-line
  action: z.enum(["add", "delete"]),
});
```

</details>

:::info Attention !
Suite à la modification ci-dessus, la requête doit forcément contenir une action. Nous allons ajouter au bouton `Add` le name `action` et la value `add`.
:::

💿 **Mettre à jour l'`action`**

Nous allons maintenant pouvoir modifier l'`action` pour retirer la track correspondant au `track_id` lorsque l'action vaut `delete`.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export const action = async ({ request, params: { id = "" } }: ActionArgs) => {
  const rawFormData = await request.formData();
  const formData = FormDataRequestSchema.parse(rawFormData);
  // highlight-next-line
  if (formData.action === "delete") {
    await playlists.removeTrack(id, formData.track_id);
  } else {
    await playlists.addTrack(id, formData.track_id);
  }
  // highlight-end
  return null;
};
```

</details>

:::info 👏 Nous pouvons maintenant modifier nos playlists en y ajoutant et supprimant des tracks.

Entre nous, l'expérience utilisateur n'est pas forcément très fluide. Voyons maintenant comment l'améliorer
:::
