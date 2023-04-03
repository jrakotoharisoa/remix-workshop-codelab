---
sidebar_position: 2
---

# Connexion

Maintenant que nous savons persister un état entre différents échanges avec le serveur grâce aux sessions, nous pouvons stocker des informations concernant l'authentification d'un utilisateur

:::info Exercice  
Créer une page `/login` qui s'affiche lorsque l'on essaie d'éditer une playlist lorsque l'utilisateur n'est pas connecté (pas de `username` dans la session).
:::

## Guide

💿 ** Protéger la route d'édition **

Commençons par protéger notre route d'édition de playlist. Pour cela, nous allons modifier le loader pour rediriger l'utilisateur vers `/login?from=/your-current-route` si la session ne contient pas d'information sur l'identité de l'utilisateur.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlist.$id.(edit).tsx"
export const loader = async ({ request, params: { id = "" } }: LoaderArgs) => {
  //Récupération de la séssion
  const session = await getSession(request.headers.get("Cookie"));

  if (isEditionUrl(url.pathname)) {
    // Verfication sur l'utilisateur est authentifié
    if (!session.has("username")) {
      // Redirection vers login si l'utilisateur n'est pas connecté
      return redirect(`/login?from=${url.pathname}`);
    }

    //...
  }
  //...
};
```

</details>

💿 ** Ajout d'un champ username dans la page de login **

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.login.tsx"
export default function Login() {
  const data = useActionData<typeof action>();

  return (
    <div>
      <Form method="post">
        <div>
          <p>Authentification</p>
        </div>
        {/* highlight-start */}
        <label>
          Utilisateur: <input name="username" className="border-2" />
        </label>
        {/* highlight-end */}
        <label>
          Mot de passe:{" "}
          <input
            type="password"
            name="password"
            className={twMerge(
              "border-2",
              data?.errors.password && "border-rose-500"
            )}
          />
        </label>

        <button type="submit">Se connecter</button>
      </Form>
    </div>
  );
}
```

</details>

💿 ** Persister le `username` dans la session à la soumission du formulaire **

Quand le mot de passe est correct (ici mot de passe = `devoxx2023`), utiliser la session pour persister le `username` et rediriger l'utilisateur vers la page d'origine (en utilisant le query param `from`) ou la page principale du site.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.login.tsx"
import { ActionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import { commitSession, getSession } from "~/utils/user-session.server";

const LoginRequestSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type FormError = { errors: { username?: string[]; password?: string[] } };
export const action = async ({ request }: ActionArgs) => {
  const formData = Object.fromEntries(await request.formData());
  const url = new URL(request.url);
  const userSession = await getSession(request.headers.get("Cookie"));
  const parsedResult = LoginRequestSchema.safeParse(formData);
  if (!parsedResult.success) {
    return json<FormError>({
      errors: parsedResult.error.formErrors.fieldErrors,
    });
  }

  const { username, password } = parsedResult.data;

  if (password !== "devoxx2023") {
    return json<FormError>({ errors: { password: ["Invalid password"] } });
  }

  // Ajout du username à la session pour indiquer que le user est connecté
  const userSession = await getSession(request.headers.get("Cookie"));
  userSession.set("username", username);

  // utilisation du searchParams "from" pour rediriger
  return redirect(url.searchParams.get("from") || "/", {
    headers: {
      // `commitSession` Permet de persistance la sessions dans les cookie et de retourner le header de cookie
      "Set-Cookie": await commitSession(userSession),
    },
  });
};
```

</details>

💿 ** Afficher le status de connexion dans la barre de navigation **

Modifier le loader de `_layout.tsx` pour récupérer l'état de connexion de l'utilisateur et utiliser l'information dans notre composant.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.tsx"
export const loader = async ({ request }: LoaderArgs) => {
  // highlight-start
  const session = await getSession(request.headers.get("Cookie"));
  const isLogged = session.has("username");
  // highlight-end
  const playlists = await db.playlist.findMany();
  // highlight-next-line
  return json({ playlists, isLogged });
};

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
          <p className="flex items-center space-x-2">
            status: {isLogged ? "connecté" : "deconnecté"}
          </p>
        </div>
        ...
      </aside>
      ...
    </div>
  );
}
```

</details>

:::info 👏 Vous pouvez maintenant connecter un utilisateur

Voyons comment déconnecter un utilisateur.
:::
