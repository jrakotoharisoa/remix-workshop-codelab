---
sidebar_position: 4
---

# Segment d'URL optionnel

Nous allons maintenant réutiliser notre page de détails afin de pouvoir la faire passer dans un mode `edition` lorsque l'URL se termine par `/edit`.

Pour cela, nous allons utiliser les segments d'URL optionnels.

:::info Exercice
1- Modifier le nom du fichier, pour que l'URL du fichier puisse matcher les routes `/playlists/{id}` et `/playlists/{id}/edit`.

2- Ajouter un lien sur la page `/playlists/{id}` permettant de passer en mode `edition` en naviguant vers `/playlists/{id}/edit`.

3- Ajouter un lien sur la page `/playlists/{id}/edit` permettant de revenir en mode `lecture` en naviguant vers `/playlists/{id}`.

:::

## Guide

💿 **Modifier de l'URL**

Pour créer un segment d'URL optionnel, il suffit de mettre en parenthèse dans le nom du fichier la partie optionnel.

:::tip En savoir plus
Voir la section [Optional segments](https://remix.run/docs/en/1.14.3/file-conventions/route-files-v2#optional-segments) dans la doc.
:::

Ainsi en renommant notre module route en `_layout.playlists.$id.(edit).tsx`, notre page sera associée à toutes les URLs correspondantes à `/playlists/{id}` et `/playlists/{id}/edit`. Nous verrons par la suite comment récupérer la valeur de `id`.

💿 **Identifier le mode `edition`**

Nous allons utiliser le hook `useLocation` pour avoir accès au pathname de la page. Avec ce `pathname` nous allons pouvoir vérifier si l'url se termine par `edit` pour savoir si nous sommes en mode édition.

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"

const isEditionUrl = (pathname: string) => pathname.endsWith("/edit");

export default function Playlists() {
  const location = useLocation();
  const isEditionMode = isEditionUrl(location.pathname);
  //...
  return (
    //...
  );
}
```

</details>

💿 **Ajouter les liens pour naviguer entre le mode `edition` et le mode `lecture`**

Nous allons ici utiliser le composant `<Link to={...} />` qui va rendre une balise `<a />`. Ce composant nous permet de définir des liens relatifs.

:::tip
`./` permet de définir l'url courante. Ainsi `./suffix` permet d'ajouter le segment `suffix` à l'url courante.
:::

<details>
  <summary>Voir une solution</summary>

```tsx title="app/routes/_layout.playlists.$id.(edit).tsx"
export default function Playlists() {
  const location = useLocation();
  const isEditionMode = isEditionUrl(location.pathname);
  //...
  return (
    <>
      {/*...*/}
      {isEditionMode ? (
        <Link to="./edit">Edit</Link>
      ) : (
        <Link to="./..">Done</Link>
      )}
      {/*...*/}
    </>
  );
}
```

</details>

:::info 👏 Vous avez maintenant une page de détails de playlist permettant d'avoir un mode édition.

Voyons comment afficher des données spécifiques à une playlist.
:::
