const express = require("express")
const cors = require("cors")
const Stripe = require("stripe")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session", async (req, res) => {
  const { cart } = req.body

  const line_items = cart.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.product_name
      },
      unit_amount: item.price * 100
    },
    quantity: item.quantity
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cart"
  })

  res.json({ id: session.id })
})

app.listen(5000, () =>
  console.log("Server running on port 5000")
)
