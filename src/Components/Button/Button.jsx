import React from "react";
import styles from "./Button.module.css";

const Button = ({ title, handleButtonAction, value }) => {
  return (
    <button
      type="button"
      className={`${styles.btn} `}
      onClick={() => handleButtonAction(value)}
    >
      {title}
    </button>
  );
};

export default Button;
