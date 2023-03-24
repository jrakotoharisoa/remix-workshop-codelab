---
sidebar_position: 2
---

# Connexion

Maintenant que nous savons persister un etat entre differents echanges avec le serveur grace aux sessions, nous pouvons stocker des informations concernant l'authentification d'un utilisateur

:::info Exercice
1- Connecter un utilisateur
2- Afficher le status de connexion
3- Proteger une route
:::

## Guide

💿 ** Connecter un utilisateur **

Quand le mot de passe est correct, utiliser la session pour persister le `username` et rediriger l'utilisateur vers la page d'origine (query param `from`) ou la page principale du site.

```tsx title="app/routes/_layout.login.tsx"
import { ActionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import { commitSession, getSession } from "~/utils/user-session.server";

const LoginRequestSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const parsedResult = LoginRequestSchema.safeParse(Object.fromEntries(formData));
  if (!parsedResult.success) {
    return json({ error: "Invalid request" });
  }

  const { username, password } = parsedResult.data;

  if (password !== "devoxx2023") {
    return json({ error: "Invalid password" });
  }

  // TODO
})

export default function Login() {
  const data = useActionData<typeof action>();

  return (
    <div>
      {data?.error ? <div className="error">{data.error}</div> : null}
      <Form method="post">
        <div>
          <p>Authentification</p>
        </div>
        <label>
          Utilisateur: <input name="username" />
        </label>
        <label>
          Mot de passe: <input type="password" name="password" />
        </label>

        <button type="submit">Soumettre</button>
      </Form>
    </div>
  );
}
```

💿 ** Afficher le status de connexion **

Modifier votre loader pour recuperer l'etat de connexion de l'utilisateur

```tsx title="app/routes/_layout.tsx"
export default function Layout() {
  const { playlists, isLogged } = useLoaderData<typeof loader>();

  return (
    <div className="grid h-full grid-cols-4 xl:grid-cols-5">
      <aside>
        <div className="px-8 py-6">
          <p className="title-1 flex items-center space-x-2">
            <MusicIcon className="h-6 w-6" />
            <span>Remix</span>
          </p>
          // highlight-next-line
          <p className="flex items-center space-x-2">status: {isLogged ? "connecté" : "deconnecté"}</p>
        </div>
        ...
      </aside>
      ...
    </div>
  );
}
```

💿 ** Proteger une route **

Nous voulons proteger notre route d'edition de playlist. Modifier votre loader pour rediriger l'utilisateur vers `/login?from=/your-current-route` si la session ne contient pas d'information sur l'identité de l'utilisateur.

:::info 👏 Vous pouvez maintenant connecter un utilisateur

Voyons comment deconnecter un utilisateur.
:::
