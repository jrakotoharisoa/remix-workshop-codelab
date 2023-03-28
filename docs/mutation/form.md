---
sidebar_position: 1
---

# Envoi d'une requête de mutation

Nous allons maintenant envoyer des requêtes au serveur pour lui demander de modifier des données.
Dans le web, l'utilisation de formulaire `<form />`, et la manière déclarative d'effectuer des mutations de données.

À la soumission de notre formulaire, un appel `POST` sera effectué sur la route associée à notre module.

:::info Exercice
Envoyer un requête `post` au serveur avec l'`id` de la track à ajouter à la playlist au click sur un bouton situé à coté d'une track.
Le bouton ne sera visible que en mode `edition`.
:::

## Guide

💿 **Identifier le mode `edition`**

Nous allons utiliser le hook `useLocation` pour avoir accès au pathname de la page afin de réutiliser notre fonction utilitaire `isEditionUrl` pour savoir si nous sommes en mode `edition`.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export default function Playlist() {
  const location = useLocation();
  const isEditionMode = isEditionUrl(location.pathname);
  //...
  return (
    //...
  );
}
```

</details>

💿 **Ajouter un formulaire**

Nous allons donc ajouter un formulaire avec un methode `post`.  
Le formulaire aura:

- un `input` de type `hidden` permettant d'envoyer l'information `track_id` correspondant à l'id de la track à ajouter.
- un bouton `submit`

:::tip
Nous utilisons ici le composant `<Form />` de Remix à la place de la balise `form` classique. Cela permet:

- De sérialiser les données de la même façon avec ou sans Javascript
- D'avoir une expérience améliorer lorsque le Javascript est chargé. Cela, en rappelant les loaders automatiquement à la soumission du formulaire pour garder un UI à jour sans rechargement de page

:::

:::tip En savoir plus
Voir la section [Form](https://remix.run/docs/en/1.14.3/components/form) dans la doc.
:::

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export default function Playlist() {
  //...
  return (
    //...
    <li>
      {/*...*/}

      {isEditionMode && (
        <Form method="post" className="inline">
          <input name="track_id" type="hidden" value={track.id} />
          <button type="submit">Add</button>
        </Form>
      )}
    </li>
    //...
  );
}
```

</details>

:::info 👏 Notre page est maintenant capable d'envoyer des requête de mutation à notre serveur.

Voyons traiter ces requêtes.
:::
