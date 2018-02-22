import React from "react";

const Button = (props) =>
  <button {...props} style={{ float: "right", marginBottom: 10 }} className={props.class}>
    {props.children}
  </button>;

export default Button;