import Checkout from "./Pages/Checkout"
import Products from "./Pages/Products"
import Cart from "./Pages/Cart"
import { Route, Routes } from "react-router"

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Products />} />
        <Route element={<Cart />} path="/cart" />
        <Route element={<Checkout />} path="/checkout" />
      </Routes>
    </>
  )
}

export default App
