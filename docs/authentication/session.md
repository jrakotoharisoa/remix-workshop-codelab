---
sidebar_position: 1
---

# Session

Dans un monde sans JS, il est souvent nécessaire de partager l'état entre plusieurs requêtes d'un même utilisateur. Une des possibilités, est d'utiliser les cookies. Et pour cela Remix met à dispotion un petit helper `createCookieSessionStorage`.

:::info Exercice
Créer un session pour stocker le `username` d'un utilisateur afin de pouvoir la lire dans un `loader` après la soumission d'un formulaire
:::

## Guide

💿 ** Créer une nouvelle page avec un formualire **

<details>
  <summary>Voir une solution</summary>

```tsx title="app/test-session.tsx"
import { Form } from "@remix-run/react";

export default function Layout() {
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

</details>

💿 ** Créer un manager de session **

<details>
  <summary>Voir une solution</summary>

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

</details>

💿 ** Stocker le `username` lors de la soumission du formulaire dans la session **

<details>
  <summary>Voir une solution</summary>

```tsx title="app/test-session.tsx"
import { ActionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name").toString() || "";
  const userSession = await getSession(request.headers.get("Cookie"));
  userSession.set("name", name);
  return redirect(".", {
    headers: {
      "Set-Cookie": await commitSession(userSession),
    },
  });
};
```

</details>

💿 ** Lecture de la session le `loader` pour afficher le `username` **

<details>
  <summary>Voir une solution</summary>

```tsx title="app/test-session.tsx"
import { LoaderArgs, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

// highlight-start
export const loader = async ({ request }: LoaderArgs) => {
  const userSession = await getSession(request.headers.get("Cookie"));
  const name = userSession.get("name");
  return json({ name });
};
// highlight-end

export default function Layout() {
  // highlight-next-line
  const { name } = useLoaderData<typeof loader>();

  return (
    <div>
      // highlight-next-line
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

</details>

:::info 👏 Vous avez maintenant un état persisté sans JS

Voyons comment utiliser cette mecanique pour gérer l'authentification.
:::

```

```
