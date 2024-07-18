import React, { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button";
import CartContext from "../store/CartContext";
import UserPrograssContext from "../store/UserPrograssContext";
function Header() {
  const cartCtx = useContext(CartContext);
  const userPrograssCtx = useContext(UserPrograssContext);

  function handleShowCart() {
    userPrograssCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo" />
        <h1>Fast Food Resturent</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({cartCtx.items.length})
        </Button>
      </nav>
    </header>
  );
}

export default Header;
