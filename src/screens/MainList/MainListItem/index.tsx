import classnames from "classnames";
import React from "react";

import { IListElement } from "@/api/elements/types";

import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";

interface IMainListItemProps {
  element: IListElement;
}

export const MainListItem: React.FC<IMainListItemProps> = ({ element }) => {
  return (
    <NavLink
      to={`/list/${element.id}`}
      className={classnames(styles.wrapper, "col-xl-3 col-md-4 col-sm-6 p-2")}
      data-testid="main-list-item-link"
    >
      <div className={classnames(styles.container)} data-testid="main-list-item-container">
        <div className={styles.imageContainer}>
          <img
            src={element.image}
            alt="List element"
            className={classnames(styles.image)}
            data-testid="main-list-item-image"
          />
          <div className={styles.shadow}/>
        </div>

        <div className={styles.info}>
          <span className={styles.name} data-testid="main-list-item-name">{element.name}</span>
          <span className={styles.origin} data-testid="main-list-item-other">{element.species} {element.gender} <br /> Location: {element.location.name}</span>
        </div>
      </div>
    </NavLink>
  );
};