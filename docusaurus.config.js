// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Remix Workshop",
  tagline:
    "Découvrons Remix au travers du développement d'un petit outil de gestion de playlist",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://jrakotoharisoa.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/remix-workshop-codelab",
  noIndex: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "jrakotoharisoa", // Usually your GitHub org/user name.
  projectName: "remix-workshop-codelab", // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "fr",
    locales: ["fr"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/jrakotoharisoa/remix-workshop-codelab/edit/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: false,

      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Workshop",
        logo: {
          alt: "Remix Logo",
          src: "img/logo.svg",
          srcDark: "img/logo-dark.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "codelab",
          },
          {
            href: "https://github.com/jrakotoharisoa/remix-workshop-codelab",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
