import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import { CartContextProvider } from "./store/CartContext";
import { UserPrograssProvider } from "./store/UserPrograssContext";
function App() {
  return (
    <UserPrograssProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
      </CartContextProvider>
    </UserPrograssProvider>
  );
}

export default App;
