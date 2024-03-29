---
sidebar_position: 1
---

# La première page

Commençons par créer notre première page avec du contenu statique.

:::info Exercice
Créer une page accessible via l'URL `/ma-premiere-page` avec le contenu **"Ma première page"**
:::

## Guide

💿 **Créer la route**

Comme nous l'avons vu précédemment, Remix se base sur les fichiers dans le dossier `app/routes` pour générer les URLs de notre application.

Nous allons donc ajouter un fichier `ma-premiere-page.tsx` dans le répertoire `app/routes`.

:::caution
Si l'on accède à l'URL [http://localhost:3000/ma-premiere-page](http://localhost:3000/ma-premiere-page), on tombe sur une page 404, car aucune page n'est définie pour cette URL.
:::
💿 **Associer un contenu à la route**

Définissons maintenant le contenu de la page associé à l'URL correspondant à notre route en exportant un composant React par défaut.

Remix fonctionne par convention. L'export par défaut d'un `module route` permet de définir la vue associée à la route. Cet export par défaut doit correspondre à la définition d'un composant React.

:::note
Aujourd'hui Remix utilise React pour la partie UI. Mais l'équipe Remix travaille à permettre l'utilisation d'autres librairies UI.
:::

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/ma-premiere-page.tsx"
export default function () {
  return <p>Ma première page</p>;
}
```

</details>

:::info 👏 Vous venez de créer votre première page !

Voyons maintenant comment construire des pages un peu plus complexe.
:::
