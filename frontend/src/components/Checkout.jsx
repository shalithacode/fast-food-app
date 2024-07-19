import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import UserPrograssContext from "../store/UserPrograssContext";

function Checkout() {
  const cartCtx = useContext(CartContext);
  const userPrograssCtx = useContext(UserPrograssContext);

  const totalPrice = cartCtx.items.reduce((accPrice, item) => accPrice + item.price * item.qty, 0);

  function handleHideCheckout() {
    userPrograssCtx.hideCheckout();
  }
  async function handleSubmitForm(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      body: JSON.stringify({ order: { items: cartCtx.items, customer: customerData } }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      event.target.reset();
      cartCtx.emptyCart();
      return userPrograssCtx.hideCheckout();
    }
  }
  return (
    <Modal open={userPrograssCtx.prograss === "checkout"} onClose={handleHideCheckout}>
      <form onSubmit={handleSubmitForm}>
        <h2>Checkout</h2>
        <p>Total amount:{currencyFormatter.format(totalPrice)} </p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="Email" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        <p className="modal-actions">
          <Button textOnly type="button" onClick={handleHideCheckout}>
            Close
          </Button>
          <Button>Submit</Button>
        </p>
      </form>
    </Modal>
  );
}

export default Checkout;
