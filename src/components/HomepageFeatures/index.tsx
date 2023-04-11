import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

type FeatureItem = {
  title: string;
  pictureUrl: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Johan Rouve",
    pictureUrl: "https://iili.io/5LEXeV.jpg",
    description: (
      <>
        Développeur curieux, j'ai travaillé sur différentes plate-formes,
        principalement web et mobile, aussi bien coté front que back, dans
        différents languages. J’ai une forte appétence pour le design et
        l’ergonomie, et j’aime peaufiner les détails graphiques afin que les
        utilisateurs aient le meilleur ressenti possible. Et comme la vie ne se
        limite pas seulement à du code, je me passionne aussi pour le sport et
        la raclette.
      </>
    ),
  },
  {
    title: "Johann Rakotoharisoa",
    pictureUrl: "https://iili.io/HE011F1.jpg",
    description: (
      <>
        Développeur web chez Comet Meetings, la startup qui propose de
        révolutionner l'experience de la réunion et du séminaire. Je suis
        passionné par tout ce qui permet de proposer la meilleure UX aux
        utilisateurs finaux. Ainsi que par tous les outils, méthodologie et
        pratique permettant d’améliorer l’expérience développeur.
      </>
    ),
  },
];

function Feature({ title, pictureUrl, description }: FeatureItem) {
  return (
    <div className={clsx("col avatar avatar--vertical")}>
      <img src={pictureUrl} className="avatar__photo avatar__photo--xl" />
      <div
        className={clsx(
          "text--center margin-top--md padding-horiz--md avatar__intro",
          styles.avatar__intro
        )}
      >
        <h3 className="avatar__name">{title}</h3>
        <p className="avatar__subtitle">{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <>
      <section className={styles.features}>
        <div className="container">
          <h3 className="text--center">Animé par</h3>
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
      <section className={clsx("padding--xl", styles.comet)}>
        <div className="container text--center">
          <img
            src="https://uploads-ssl.webflow.com/62e3feb2216b0574bab9036b/62e3feca21fbc2039cf47ee4_logo_comet.svg"
            alt="comet logo"
            className={styles.logo}
          />
          <h1 className={clsx("margin-vert--lg", styles.h1)}>
            Des lieux dédiés à la réussite de vos évènements.
          </h1>
          <div className="row margin-vert--lg">
            <div className="col">
              <img
                src="https://res.cloudinary.com/ddyhxyc8l/image/upload/w_1600,h_1067,c_fill,g_auto/v1658133621/booking/coeur-defense/cover.jpg"
                alt="Comet La défense"
                className={styles.cometImage}
              />
            </div>
            <div className="col">
              <img
                src="https://res.cloudinary.com/ddyhxyc8l/image/upload/w_1600,h_1067,c_fill,g_auto/v1658133621/booking/comet-louise/1.jpg"
                alt="Comet Louise"
                className={styles.cometImage}
              />
            </div>
            <div className="col">
              <img
                src="https://res.cloudinary.com/ddyhxyc8l/image/upload/w_1600,h_1067,c_fill,g_auto/v1658133621/booking/comet-retiro/cover.jpg"
                alt="Comet Retiro"
                className={styles.cometImage}
              />
            </div>
          </div>
          <div className={styles.cometCraft}>
            <div>🎁 Tente de gagner une demi-journée chez Comet👇</div>
            <span
              className={clsx(
                "padding-horiz--md padding-vert--sm",
                styles.cometCraftCode
              )}
            >
              $ npx comet-craft
            </span>
          </div>
        </div>
      </section>
      <section className={clsx("text--center", styles.urlSection)}>
        <h1>
          👉 {siteConfig.organizationName}
          <small>.github.io/</small>
          {siteConfig.projectName}
        </h1>
      </section>
    </>
  );
}
