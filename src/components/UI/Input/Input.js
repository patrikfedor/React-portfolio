import React from "react";

import styles from "../../../css/input.module.css";

const input = props => {
  let inputElement = null;
  const inputStyles = [styles.Input];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputStyles.push(styles.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          // for className we use .join() to concatenate all styles defined in inputStyles array divided with space
          className={inputStyles.join(" ")}
          {...props.elementConfig}
          value={props.elementValue}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputStyles.join(" ")}
          {...props.elementConfig}
          value={props.elementValue}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputStyles.join(" ")}
          value={props.elementValue}
          onChange={props.changed}
        >
          {/* dynamically create <option></option> element */}
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={inputStyles.join(" ")}
          {...props.elementConfig}
          value={props.elementValue}
          onChange={props.changed}
        />
      );
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = (
      <p className={styles.ValidationError}>{props.errorMessage}</p>
    );
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
