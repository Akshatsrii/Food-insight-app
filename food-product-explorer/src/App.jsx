import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductProvider from "./context/ProductContext"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"

function Success() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-green-500 mb-4">
        Payment Successful 🎉
      </h1>
      <p className="text-gray-500">
        Thank you for your purchase!
      </p>
    </div>
  )
}

export default function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white">

          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <div className="px-6 py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:code" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </div>

        </div>
      </BrowserRouter>
    </ProductProvider>
  )
}
