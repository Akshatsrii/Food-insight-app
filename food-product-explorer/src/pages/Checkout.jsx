import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY")

export default function Checkout() {
  const { cart } = useContext(ProductContext)

  const handleCheckout = async () => {
    const stripe = await stripePromise

    const response = await fetch(
      "http://localhost:5000/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart })
      }
    )

    const session = await response.json()

    await stripe.redirectToCheckout({
      sessionId: session.id
    })
  }

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0).toFixed(2)
  }

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0).toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">Checkout</h1>
          <p className="text-orange-100">Review your order and complete your purchase</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-orange-100 overflow-hidden">
              <div className="bg-orange-500 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">Your Cart</h2>
              </div>

              <div className="p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-orange-500 text-6xl mb-4">🛒</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
                    <p className="text-gray-600">Add some products to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 border-2 border-orange-100 rounded-xl hover:border-orange-300 transition-colors"
                      >
                        <img
                          src={item.image_url || item.image_front_url}
                          alt={item.product_name}
                          className="w-20 h-20 object-contain rounded-lg bg-orange-50"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.product_name}</h3>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity || 1}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-600">
                            ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">${(item.price || 0).toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-orange-100 overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${calculateSubtotal()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold text-orange-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span className="font-semibold">$0.00</span>
                </div>

                <div className="border-t-2 border-orange-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Total</span>
                    <span className="text-3xl font-bold text-orange-600">${calculateTotal()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {cart.length === 0 ? 'Add items to checkout' : 'Pay with Stripe'}
                </button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-4">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure checkout powered by Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}