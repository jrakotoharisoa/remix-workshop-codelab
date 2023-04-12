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

Dans le cas de la déconnexion, nous pouvons simplement créer une route ressource `app/routes/api.logout.ts` et créer une action qui va détruire la session et rediriger vers la page principale du site

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

💿 ** Ajouter un bouton de déconnexion **

Si l'utilisateur est connecté, nous allons ajouter un bouton dans notre interface pour la déconnexion. Pour cela il nous suffit d'ajouter un petit formulaire qui appellera notre route `/api/logout` en `POST`.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.tsx"
export default function Layout() {
  const { playlists, isLogged } = useLoaderData<typeof loader>();

  return (
    <div className="grid h-full grid-cols-4 xl:grid-cols-5">
      <aside>
        {/* highlight-next-line */}
        <div className="flex items-center justify-between px-8 py-6">
          <p className="title-1 flex items-center space-x-2">
            <MusicIcon className="h-6 w-6" />
            <span>Remix</span>
          </p>
          {/* highlight-start */}
          {isLogged && (
            <Form method="post" action="/api/logout" className="flex">
              <button type="submit">
                <span className="sr-only">Logout</span>
                <ExitIcon className="h-6 w-6" />
              </button>
            </Form>
          )}
          {/* highlight-end */}
        </div>
        ...
      </aside>
      ...
    </div>
  );
}
```

</details>

:::info 👏 Votre utilisateur peut maintenant se déconnecter

Tu as presque fini :)
:::
