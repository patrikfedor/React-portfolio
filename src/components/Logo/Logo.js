import React from "react";

import burgerLogo from "../../assets/images/burger-logo.png";
import styles from "../../css/logo.module.css";

const logo = props => (
  <div className={styles.Logo}>
    <img src={burgerLogo} alt="EatME" />
  </div>
);

export default logo;
