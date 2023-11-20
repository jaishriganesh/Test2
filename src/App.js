import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import Product_details from "./Components/Product_details";
import Header from "./Components/Header";

function App() {
  const [viewproduct, setViewProduct] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  // Calculate the total quantity in the cart
  const totalCartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <BrowserRouter>
        <Header cartQuantity={totalCartQuantity} />
        <Routes>
          <Route
            path="/"
            element={
              <Login
                viewproduct={viewproduct}
                setViewProduct={setViewProduct}
                cart={cart}
                setCart={setCart}
                quantity={quantity}
              />
            }
          />
          <Route
            path="/productdetails"
            element={
              <Product_details
                viewproduct={viewproduct}
                product={product}
                setProduct={setProduct}
                quantity={quantity}
                setQuantity={setQuantity}
                cart={cart}
                setCart={setCart}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
