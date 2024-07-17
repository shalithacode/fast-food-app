import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});
export default CartContext;

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = { ...existingItem, qty: existingItem.qty + 1 };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, qty: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
    let updatedItems = [...state.items];

    const existingItem = state.items[existingCartItemIndex];

    if (existingItem.qty > 1) {
      const updatedItem = { ...existingItem, qty: existingItem.qty - 1 };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else if (existingItem.qty === 1) {
      updatedItems = updatedItems.filter((item) => item.id !== action.id);
    }

    return { ...state, items: updatedItems };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const initialState = { items: [] };
  const [cart, dispatchCartAction] = useReducer(cartReducer, initialState);

  function addToCartItem(item) {
    return dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeCartItem(id) {
    return dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  const cartContextValue = {
    items: cart.items,
    addItem: addToCartItem,
    removeItem: removeCartItem,
  };

  console.log(cartContextValue);

  return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>;
}
