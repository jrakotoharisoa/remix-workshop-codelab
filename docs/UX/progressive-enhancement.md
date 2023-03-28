---
sidebar_position: 1
---

# Progressive enhancement

Jusqu'ici nous avons une application fonctionnel, qui marche sans execution de Javascript dans le navigateur. Mais le Javascript nous permet lorsqu'il est chargé de fournir une meilleure expérience aux utilisateurs. Notamment, en évitant le rechargement complet d'une page lors d'une navigation ou lors de la soumission d'une formulaire.

:::info Exercice
Inclure les scripts Javascript dans vos pages.
:::

# Guide

💿 ** Ajout du composant `<Scripts />` **

Pour inclure, les scripts Javascript dans vos pages, il suffit inclure le composant `<Scripts />` que Remix nous fournis dans le ficheir `root.tsx` de l'application.

Ce composant va permettre inclure le code client Javascript généré lors de la phase de compiliation.

:::tip En savoir plus
Voir la section [Scripts](https://remix.run/docs/en/1.14.3/components/scripts) dans la doc.
:::

<details>
  <summary>Voir une solution</summary>

```tsx title="app/root.tsx"
import { Scripts } from "@remix-run/react";

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        // highlight-next-line
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

</details>

:::info 👏 Votre application propose maintenant une expérience améliorée lorsque le Javascript est chargé.

Voyons maintenant comment améliorer les temps de chargement de nos pages.
:::
