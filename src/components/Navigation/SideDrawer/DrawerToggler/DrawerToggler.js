import React from "react";
import styles from "../../../../css/drawertoggler.module.css";

const drawerToggler = props => (
  <div onClick={props.clicked} className={styles.DrawerToggler}>
    <div />
    <div />
    <div />
  </div>
);
export default drawerToggler;
