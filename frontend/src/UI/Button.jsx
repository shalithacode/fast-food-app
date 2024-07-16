import React from "react";

function Button({ children, textOnly, classes, ...props }) {
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses = +" " + classes;
  return (
    <button {...props} className={cssClasses}>
      {children}
    </button>
  );
}

export default Button;
