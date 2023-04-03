---
sidebar_position: 1
---

# Envoi d'une requête de mutation

Nous allons maintenant envoyer des requêtes au serveur pour lui demander de modifier des données.
Dans le web, l'utilisation de formulaire `<form />`, et la manière déclarative d'effectuer des mutations de données.

À la soumission de notre formulaire, un appel `POST` sera effectué sur la route associée à notre module.

:::info Exercice
Envoyer une requête `post` au serveur avec l'`id` de la track à ajouter à la playlist au click sur un bouton situé à côté d'une track.
Le bouton ne sera visible qu'en mode `edition`.
:::

## Guide

💿 **Ajouter un formulaire**

Nous allons donc ajouter un formulaire avec une méthode `post`.  
Le formulaire aura :

- Un `input` de type `hidden` permettant d'envoyer l'information `track_id` correspondant à l'id de la track à ajouter.
- Un bouton `submit`

:::tip
Nous utilisons ici le composant `<Form />` de Remix à la place de la balise `form` classique. Cela permet :

- De sérialiser les données de la même façon avec ou sans Javascript
- D'avoir une expérience améliorer lorsque le Javascript est chargé. Cela, en rappelant les loaders automatiquement à la soumission du formulaire pour garder un UI à jour sans rechargement de page

:::

:::tip En savoir plus
Voir la section [Form](https://remix.run/docs/en/1.14.3/components/form) dans la doc.
:::

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export default function Playlists() {
  //...
  return (
    //...
    <li>
      {/*...*/}
      //highlight-start
      <Form method="post" className="inline">
        <input name="track_id" type="hidden" value={track.id} />
        <button type="submit">Add</button>
      </Form>
      //highlight-end
    </li>
    //...
  );
}
```

</details>

:::info 👏 Notre page est maintenant capable d'envoyer des requêtes de mutation à notre serveur.

Si l'on essaie de soumettre notre formulaire, nous avons maintenant une erreurs car notre requête n'est pas traité par le serveur.

Voyons comment traiter cette requête côté.
:::
