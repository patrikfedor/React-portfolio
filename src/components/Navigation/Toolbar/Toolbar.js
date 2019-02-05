import React from "react";
import styles from "../../../css/toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggler from "../SideDrawer/DrawerToggler/DrawerToggler";

const toolbar = props => (
  <header className={styles.Toolbar}>
    <DrawerToggler clicked={props.drawerToggleClicked} />
    <div className={styles.Logo}>
      <Logo />
    </div>
    <nav className={styles.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
