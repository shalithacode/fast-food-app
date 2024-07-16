import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button";
import React from "react";

function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo" />
        <h1>Fast Food Resturent</h1>
      </div>
      <nav>
        <Button textOnly>Cart (0)</Button>
      </nav>
    </header>
  );
}

export default Header;
