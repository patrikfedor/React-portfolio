import React from "react";
import styles from "../../../../css/buildcontrol.module.css";

const buildControl = props => (
  <div className={styles.BuildControl}>
    <div className={styles.Label}>{props.label}</div>
    <button
      className={styles.BuildControl.Less}
      onClick={props.removed}
      disabled={props.disabled}
    >
      Less
    </button>
    <button className={styles.BuildControl.More} onClick={props.added}>
      More
    </button>
  </div>
);

export default buildControl;
