---
sidebar_position: 3
---

# Déconnexion

Votre utilisateur est connecté, mais il faut aussi lui offrir la possibilité de se déconnecter.

:::info Exercice
Supprimer la session au clic sur le bouton déconnexion
:::

## Guide

💿 ** Supprimer la session **

Dans le cas de la déconnexion, pas besoin de front, nous pouvons simplement créer une route ressource `app/routes/api.logout.ts` et créer une action qui va détruire la session et rediriger vers la page principale du site

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

:::info 👏 Votre utilisateur peut maintenant se déconnecter

Tu as presque fini :)
:::
