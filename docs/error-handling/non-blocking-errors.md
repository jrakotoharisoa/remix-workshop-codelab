---
sidebar_position: 2
---

# Erreurs visibles

Les erreurs visibles sont les erreurs que l'on pourra materialiser dans notre interface tel que des champs de formulaire en erreur. Ici pas de magie,nous allons simplement renvoyer de la donnée representant un etat d'erreur depuis notre `action` ou `loader`.

:::info Exercice  
1- Créer une nouvelle page avec un formualire  
2- Renvoyer de la donnée en cas d'erreur  
3- Afficher un liseret rouge autour du champ en erreur
:::

## Guide

💿 ** Créer une nouvelle page avec un formualire **

Nous allons créer une page de login avec un champ `password`

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.login.tsx"
export default function Login() {
  return (
    <div>
      <Form method="post">
        <div>
          <p>Authentification</p>
        </div>
        <label>
          Mot de passe: <input type="password" name="password" className="border-2" />
        </label>

        <button type="submit">Se connecter</button>
      </Form>
    </div>
  );
}
```

</details>

💿 ** Renvoyer de la donnée en cas d'erreur **

Nous allons ajouter une `action` qui renvera de la donnée representant l'etat de la validation du `password`. Notre action doit renvoyer une erreur si le mot de passe est differents de `devoxx2023`

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.login.tsx"
const LoginRequestSchema = z.object({
  password: z.string().min(1),
});

type FormError = { errors: { username?: string[]; password?: string[] } };
export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const parsedResult = LoginRequestSchema.safeParse(Object.fromEntries(formData));
  if (!parsedResult.success) {
    return json<FormError>({ errors: parsedResult.error.formErrors.fieldErrors });
  }

  const { password } = parsedResult.data;
  if (password !== "devoxx2023") {
    return json<FormError>({ errors: { password: ["Invalid password"] } });
  }

  return json<FormError>({ errors: {} });
};
```

</details>

💿 ** Afficher un liseret rouge autour du champ en erreur **

Nous allons créer une page de login avec un champ `password` et afficher un message en cas de succès ou d'echec

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.login.tsx"
export default function Login() {
  // highlight-next-line
  const data = useActionData<typeof action>();

  return (
    <div>
      <Form method="post">
        <div>
          <p>Authentification</p>
        </div>
        <label>
          Mot de passe:
          {/* highlight-next-line */}
          <input type="password" name="password" className={twMerge("border-2", data?.errors.password && "border-rose-500")} />
        </label>

        <button type="submit">Se connecter</button>
      </Form>

      {/* highlight-next-line */}
      {data ? <div>Resultat : {Object.keys(data.errors).length === 0 ? "succès" : "echec"}</div> : null}
    </div>
  );
}
```

</details>

:::info 👏 Nous pouvons maintenant gerer simplement tous les types d'erreurs dans notre application Remix.

Nous allons maintenant decouvrir les resource routes
:::
