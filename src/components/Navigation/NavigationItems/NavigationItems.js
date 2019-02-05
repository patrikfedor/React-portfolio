import React from "react";

import styles from "../../../css/navigationitems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders">My Orders</NavigationItem>
  </ul>
);

export default navigationItems;
