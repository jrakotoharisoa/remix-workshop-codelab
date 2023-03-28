---
sidebar_position: 3
---

# Deconnexion

Votre utilisateur est connecté mais il faut aussi lui offrir la possibilité de se déconnecter.

:::info Exercice
Supprimer la session au clique sur le bouton déconnexion
:::

## Guide

💿 ** Supprimer la session **

Dans le cas de la deconnexion pas besoin de front, nous pouvons simplement créer une resource route `app/routes/api.logout.ts` et créer une action qui va detruire la session et rediriger vers la page principale du site

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/api.logout.ts"
export const action = async ({ request }: ActionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
```

</details>

:::info 👏 Vous etes un expert Remix

Ou presque !!! Mais une chose est sure, vous avez maintenant de bonnes bases et on a passé un super moment avec vous.
:::
