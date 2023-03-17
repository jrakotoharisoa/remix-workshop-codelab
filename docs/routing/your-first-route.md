---
sidebar_position: 1
---

# Ma première page

Commençons par créer notre première page avec du contenu static.

:::info Exercice
Créer une page accessible via l'url `/ma-premiere-page` avec le contenu **"Ma première page"**
:::

## Guide

💿 **Création de la route**

Comme nous l'avons vu précédemment, Remix se base sur les fichiers dans le dossier `app/routes` pour générer les URLs de notre application.

Nous allons donc ajouter un fichier `ma-premiere-page.tsx` dans le répertoire `app/routes`.

:::caution
Si l'on accède à l'url [http://localhost:3001/ma-premiere-page](http://localhost:3000/ma-premiere-page), on tombe sur une page 404, car aucune page n'est définie pour cette url.
:::
💿 **Association d'un contenu à la route**

Définissons maintenant le contenu de la page associé à l'url correspondant à notre route.

Remix fonctionne par convention. L'export par défaut d'un `module route` permet de définir la vue associée à la route. Cet export par défaut doit correspondre à la définition d'un composant React.

:::note
Aujourd'hui Remix utilise React pour la partie UI. Mais l'equipe Remix travaille à permettre l'utilisation d'autres librairies UI.
:::

Nous allons donc avoir le module route suivant:

```tsx title="app/routes/ma-premiere-page.tsx"
export default function () {
  return <p>Ma première page</p>;
}
```

:::info 👏 Vous venez de créer votre première page !

Voyons maintenant comment construire des pages un peu plus complexe.
:::
