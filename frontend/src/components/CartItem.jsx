import React, { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
function CartItem({ name, qty, price, onIncrese, onDecrease }) {
  return (
    <li className="cart-item">
      <p>
        {name} - {qty} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{qty}</span>
        <button onClick={onIncrese}>+</button>
      </p>
    </li>
  );
}

export default CartItem;
