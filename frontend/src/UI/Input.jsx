import React from "react";

function Input({ label, id, ...props }) {
  return (
    <p className="controll">
      <label id={id} htmlFor={id}>
        {label}
      </label>
      <input name={id} id={id} required {...props} />
    </p>
  );
}

export default Input;
