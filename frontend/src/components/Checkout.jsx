import React, { useContext } from "react";
import useHttp from "../hooks/useHttp";
import Modal from "../UI/Modal";
import Error from "./Error";

import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import UserPrograssContext from "../store/UserPrograssContext";
const config = { method: "POST", headers: { "Content-Type": "application/json" } };

function Checkout() {
  const cartCtx = useContext(CartContext);
  const userPrograssCtx = useContext(UserPrograssContext);

  const { data, isLoading, error, sendRequest, clearFetchedData } = useHttp("http://localhost:3000/orders", config);

  const totalPrice = cartCtx.items.reduce((accPrice, item) => accPrice + item.price * item.qty, 0);

  function handleHideCheckout() {
    userPrograssCtx.hideCheckout();
    if (data && !error) {
      cartCtx.emptyCart();
      clearFetchedData();
    }
  }
  async function handleSubmitForm(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(JSON.stringify({ order: { items: cartCtx.items, customer: customerData } }));
    // if (data && !error) {
    //   event.target.reset();
    //   cartCtx.emptyCart();
    // }
  }
  let actions = (
    <>
      <Button textOnly type="button" onClick={handleHideCheckout}>
        Close
      </Button>
      <Button>Submit</Button>
    </>
  );
  if (isLoading) {
    actions = <span>Sending...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={userPrograssCtx.prograss === "checkout"} onClose={handleHideCheckout}>
        <h2>Sucess!</h2>
        <p>Your order was submited sucessfuly!</p>
        <p className="modal-actions">
          <Button onClick={handleHideCheckout}>Close</Button>
        </p>
      </Modal>
    );
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
        {error && <Error title="Failed to send request." message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

export default Checkout;
