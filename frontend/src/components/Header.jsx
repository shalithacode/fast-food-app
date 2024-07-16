import logoImg from "../assets/logo.jpg";

import React from "react";

function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo" />
        <h1>Fast Food Resturent</h1>
      </div>
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  );
}

export default Header;
