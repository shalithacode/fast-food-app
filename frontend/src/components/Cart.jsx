import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../store/CartContext";
import Button from "../UI/Button";
import UserPrograssContext from "../store/UserPrograssContext";
import { currencyFormatter } from "../util/formatting";

function Cart() {
  const cartCtx = useContext(CartContext);
  const userPrograssCtx = useContext(UserPrograssContext);

  function handleHideCart() {
    userPrograssCtx.hideCart();
  }
  function handleCheckout() {
    userPrograssCtx.hideCart();
    // ...
  }
  const totalPrice = cartCtx.items.reduce((accPrice, item) => accPrice + item.price * item.qty, 0);
  return (
    <Modal className="cart" open={userPrograssCtx.prograss === "cart"}>
      <h2>Your cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            qty={item.qty}
            onIncrese={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleHideCart}>
          Close
        </Button>
        <Button onClick={handleCheckout}>Go to Checkout</Button>
      </p>
    </Modal>
  );
}

export default Cart;
