import { createContext, useState } from "react";

const UserPrograssContext = createContext({
  prograss: "", //cart,checkout
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});
export default UserPrograssContext;

export function UserPrograssProvider({ children }) {
  const [userPrograss, setUserPrograss] = useState("");

  function showCart() {
    setUserPrograss("cart");
  }
  function hideCart() {
    setUserPrograss("");
  }
  function showCheckout() {
    setUserPrograss("checkout");
  }
  function hideCheckout() {
    setUserPrograss("");
  }
  const prograssValue = {
    prograss: userPrograss,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };
  return <UserPrograssContext.Provider value={prograssValue}>{children}</UserPrograssContext.Provider>;
}
