import { Link } from "react-router-dom"
import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"

export default function ProductCard({ product }) {
  const { addToCart } = useContext(ProductContext)

  const gradeColors = {
    a: "bg-green-500",
    b: "bg-lime-500",
    c: "bg-yellow-500",
    d: "bg-orange-500",
    e: "bg-red-500"
  }

  const grade = product?.nutrition_grades?.toLowerCase()
  const image =
    product?.image_front_url ||
    product?.image_url ||
    "https://via.placeholder.com/150"

  const name = product?.product_name || "No Name Available"
  const category = product?.categories || "No Category"

  return (
    <div className="group bg-white rounded-2xl border-2 border-orange-100 hover:border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      
      <Link to={`/product/${product?.code || ""}`} className="block">
        
        <div className="relative bg-orange-50 h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
          />

          {grade && gradeColors[grade] && (
            <span
              className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg ${gradeColors[grade]}`}
            >
              {grade.toUpperCase()}
            </span>
          )}
        </div>

        <div className="p-4">
          <h2 className="font-bold text-lg text-gray-800 truncate mb-1 group-hover:text-orange-600 transition-colors">
            {name}
          </h2>

          <p className="text-sm text-gray-500 truncate mb-3">
            {category}
          </p>

          {product?.price && (
            <p className="text-2xl font-bold text-orange-600 mb-3">
              ₹{product.price}
            </p>
          )}
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={(e) => {
            e.stopPropagation()
            addToCart(product)
          }}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  )
}
