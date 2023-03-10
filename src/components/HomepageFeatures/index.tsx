import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

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
      <div className="text--center padding-horiz--md avatar__intro">
        <h3 className="avatar__name">{title}</h3>
        <p className="avatar__subtitle">{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
