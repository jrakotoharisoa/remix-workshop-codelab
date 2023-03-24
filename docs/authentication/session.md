---
sidebar_position: 1
---

# Session

Dans un monde sans JS, il est souvent necessaire de garder un etat entre plusieurs requetes de la meme personne. Remix utilise les cookies pour partager cet etat entre le client et le serveur.

:::info Exercice
1- Faire transiter de la donnée entre plusieurs requetes grace à une session
:::

## Guide

💿 ** Création d'un manager de session **

```tsx title="app/utils/user-session.server.ts"
import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "__devoxx-remix",
    httpOnly: true,
    maxAge: 60,
    path: "/",
    sameSite: "lax",
    secrets: ["jx!bnVNNqJ%4q2&8W6FoMOh!YeBGf&t#swtf&p#ORC"],
    secure: true,
  },
});

export { getSession, commitSession, destroySession };
```

💿 ** Création d'une session **

Utiliser le manager de session pour stocker le `username` lors de la soumission du formulaire et lire la valeur dans le loader.

```tsx title="app/utils/user-session.server.ts"
import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderArgs) => {
  // TODO
};

export const action = async ({ request }: ActionArgs) => {
  // TODO
};

export default function Layout() {
  const { name } = useLoaderData<typeof loader>();

  return (
    <div>
      <div>Je suis {name}</div>
      <Form method="post">
        <label>
          Qui etes vous ?
          <input autoComplete="off" name="name" />
        </label>

        <button type="submit">Valider</button>
      </Form>
    </div>
  );
}
```

:::info 👏 Vous avez maintenant un état persisté sans JS

Voyons comment utiliser cette mecanique pour gérer l'authentification.
:::
