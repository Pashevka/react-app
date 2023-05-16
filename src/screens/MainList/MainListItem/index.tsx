import classnames from "classnames";
import React from "react";

import { IListElement } from "@/api/elements/types";

import styles from "./styles.module.css";

interface IMainListItemProps {
  element: IListElement;
}

export const MainListItem: React.FC<IMainListItemProps> = ({ element }) => {
  return (
    <div
      className={classnames(styles.wrapper, "col-xl-3 col-md-4 col-sm-6 p-2")}
    >
      <div className={classnames(styles.container)}>
        <div className={styles.imageContainer}>
          <img
            src={element.image}
            alt="List element"
            className={classnames(styles.image)}
          />
          <div className={styles.shadow}></div>
        </div>

        <div className={styles.info}>
          <span className={styles.name}>{element.name}</span>
          <span className={styles.origin}>{element.species} {element.gender} <br /> Location: {element.location.name}</span>
        </div>
      </div>
    </div>
  );
};
