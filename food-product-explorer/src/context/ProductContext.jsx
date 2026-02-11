import { createContext, useState } from "react"

export const ProductContext = createContext()

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState("beverages")
  const [sortOption, setSortOption] = useState("")
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState([])

  const changeCategory = (newCategory) => {
    setCategory(newCategory)
    setPage(1)
    setProducts([])
    setSearchQuery("")
  }

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.code === product.code)

      if (exists) {
        return prev.map((item) =>
          item.code === product.code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        const price = Math.floor(Math.random() * 500) + 50
        return [...prev, { ...product, quantity: 1, price }]
      }
    })
  }

  const removeFromCart = (code) => {
    setCart((prev) => prev.filter((item) => item.code !== code))
  }

  const updateQuantity = (code, qty) => {
    if (qty <= 0) return
    setCart((prev) =>
      prev.map((item) =>
        item.code === code ? { ...item, quantity: qty } : item
      )
    )
  }

  const clearCart = () => setCart([])

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        category,
        setCategory,
        changeCategory,
        sortOption,
        setSortOption,
        page,
        setPage,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
