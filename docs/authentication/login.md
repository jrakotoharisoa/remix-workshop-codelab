---
sidebar_position: 2
---

# Connexion

Maintenant que nous savons persister un état entre différents échanges avec le serveur grâce aux sessions, nous pouvons stocker des informations concernant l'authentification d'un utilisateur

:::info Exercice  
Créer une page `/login` qui s'affiche lorsque l'on essaie d'éditer une playlist lorsque le user n'est pas connecté (pas de `username` dans la session).
:::

## Guide

💿 ** Protéger la route d'edition **

Commençons par protéger notre route d'édition de playlist. Pour cela, nous allons modifier le loader pour rediriger l'utilisateur vers `/login?from=/your-current-route` si la session ne contient pas d'information sur l'identité de l'utilisateur.

```tsx title="app/routes/_layout.playlist.$id.(edit).tsx"
export const loader = async ({ request, params: { id = "" } }: LoaderArgs) => {
  //Récupération de la ssions
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

💿 ** Créer une route de login avec un formulaire login/password **

```tsx title="app/routes/_layout.login.tsx"
export default function Login() {
  return (
    <div>
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

        <button type="submit">Se connecter</button>
      </Form>
    </div>
  );
}
```

💿 ** Ajouter une action pour connecter l'utilisateur à la soumission du formulaire en persistant le `username` **

Quand le mot de passe est correct (ici mot de passe = `devoxx2023`), utiliser la session pour persister le `username` et rediriger l'utilisateur vers la page d'origine ( en utilisant le query param `from`) ou la page principale du site.

userSession.set("username", username);

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
  const parsedResult = LoginRequestSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!parsedResult.success) {
    return json({ error: "Invalid request" });
  }

  const { username, password } = parsedResult.data;

  if (password !== "devoxx2023") {
    return json({ error: "Invalid password" });
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

💿 ** Afficher le status de connexion de la barre de navigation **

Modifier le loader de `_layout.tsx` pour récupérer l'état de connexion de l'utilisateur et utiliser l'information dans notre composant.

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

:::info 👏 Vous pouvez maintenant connecter un utilisateur

Voyons comment deconnecter un utilisateur.
:::
