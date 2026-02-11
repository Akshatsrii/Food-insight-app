import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"
import { Link } from "react-router-dom"

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice
  } = useContext(ProductContext)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">Shopping Cart</h1>
          <p className="text-orange-100">
            {cart.length === 0 
              ? "Your cart is waiting to be filled" 
              : `${cart.length} ${cart.length === 1 ? 'item' : 'items'} in your cart`
            }
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Empty Cart State */}
        {cart.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-orange-200">
            <div className="text-orange-500 text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Looks like you haven't added any products yet
            </p>
            <Link
              to="/"
              className="inline-block bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {/* Cart Items */}
        {cart.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.code}
                  className="bg-white rounded-2xl shadow-lg border-2 border-orange-100 hover:border-orange-300 transition-all duration-200 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image_url || item.image_front_url}
                          alt={item.product_name}
                          className="w-32 h-32 object-contain rounded-xl bg-orange-50 border-2 border-orange-100"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                          {item.product_name}
                        </h2>
                        <p className="text-3xl font-bold text-orange-600 mb-4">
                          ₹{item.price}
                        </p>

                        {/* Quantity and Remove */}
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-gray-700">
                              Quantity:
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(item.code, Number(e.target.value))
                              }
                              className="w-20 bg-orange-50 border-2 border-orange-200 focus:border-orange-500 focus:outline-none p-2 rounded-lg text-center font-semibold text-gray-800"
                            />
                          </div>

                          <button
                            onClick={() => removeFromCart(item.code)}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                          >
                            🗑️ Remove
                          </button>
                        </div>

                        {/* Item Subtotal */}
                        <div className="mt-4 pt-4 border-t border-orange-100">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-semibold">Subtotal:</span>
                            <span className="text-2xl font-bold text-orange-600">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border-2 border-orange-100 overflow-hidden sticky top-8">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Order Summary</h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-semibold">₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span className="font-semibold text-orange-600">FREE</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Tax</span>
                      <span className="font-semibold">₹0.00</span>
                    </div>
                  </div>

                  <div className="border-t-2 border-orange-200 pt-4">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl font-bold text-gray-800">Total</span>
                      <span className="text-4xl font-bold text-orange-600">₹{totalPrice}</span>
                    </div>

                    <button
                      className="w-full bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                      onClick={() => window.location.href = "/checkout"}
                    >
                      Proceed to Payment
                    </button>

                    <Link
                      to="/"
                      className="block w-full text-center mt-4 bg-orange-50 border-2 border-orange-300 text-orange-700 hover:bg-orange-100 font-bold py-3 px-8 rounded-xl transition-all duration-200"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-4 pt-4 border-t border-orange-100">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}